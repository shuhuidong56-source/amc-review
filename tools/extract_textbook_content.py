#!/usr/bin/env python3
"""Extract lesson knowledge points, examples, and homework from the AMC PDF.

The output is intentionally source-oriented. It preserves extracted textbook
text with page references instead of pretending the OCR/PDF text is clean.
"""

from __future__ import annotations

import argparse
import json
import re
from dataclasses import dataclass, field
from pathlib import Path

from pypdf import PdfReader


LESSON_RE = re.compile(r"AMC\s*1\s*2\s*Lesson\s*(\d+)\.\s*(.*)", re.IGNORECASE)
EXAMPLE_RE = re.compile(r"^(\*)?\s*Example\s+(\d+)[\.:]?\s*(.*)$", re.IGNORECASE)
PROBLEM_RE = re.compile(r"^Problem\s+(\d+)[\.:]?\s*(.*)$", re.IGNORECASE)
NUMBERED_TOPIC_RE = re.compile(r"^(\d{1,2})\s+([A-Za-z][A-Za-z0-9 ,/&()\\-]+)$")


@dataclass
class PageText:
    page: int
    lines: list[str]


@dataclass
class LessonStart:
    lesson: int
    title: str
    page: int


@dataclass
class KnowledgePoint:
    title: str
    page: int
    number: int | None = None
    lines: list[str] = field(default_factory=list)


@dataclass
class TextbookItem:
    kind: str
    number: int
    page: int
    topic: str | None
    starred: bool = False
    lines: list[str] = field(default_factory=list)


def clean_line(line: str) -> str:
    line = line.replace("\x00", "")
    line = re.sub(r"\s+", " ", line).strip()
    return line


def page_lines(page, page_number: int) -> list[str]:
    text = page.extract_text() or ""
    lines = [clean_line(line) for line in text.splitlines()]
    lines = [line for line in lines if line]
    if lines and re.fullmatch(r"[\d\s]+", lines[-1]) and len(lines[-1]) <= 6:
        lines.pop()
    return lines


def extract_pages(reader: PdfReader) -> list[PageText]:
    return [PageText(index, page_lines(page, index)) for index, page in enumerate(reader.pages, start=1)]


def find_lesson_starts(pages: list[PageText]) -> list[LessonStart]:
    starts: list[LessonStart] = []
    for page in pages:
        for index, line in enumerate(page.lines):
            match = LESSON_RE.search(line)
            if not match:
                continue
            lesson = int(match.group(1))
            title = match.group(2).strip()
            if not title and index + 1 < len(page.lines):
                title = page.lines[index + 1].strip()
            title = re.sub(r"\s+", " ", title).strip()
            starts.append(LessonStart(lesson, title, page.page))
            break
    return starts


def looks_like_heading(line: str) -> bool:
    if len(line) > 72 or len(line) < 3:
        return False
    if any(token in line for token in ["=", "", "", "", "", "", "", ""]):
        return False
    if re.search(r"\d", line) and not NUMBERED_TOPIC_RE.match(line):
        return False
    lowered = line.lower()
    blocked_starts = (
        "example", "problem", "homework", "theorem", "inference", "for example",
        "if ", "let ", "find ", "how ", "what ", "which ", "where ", "when ",
        "suppose ", "positive ", "a ", "an ", "the ", "so ",
    )
    if lowered.startswith(blocked_starts):
        return False
    words = line.split()
    if len(words) > 8:
        return False
    letter_count = sum(ch.isalpha() for ch in line)
    return letter_count >= 3


def normalize_block(lines: list[str]) -> str:
    text = "\n".join(line for line in lines if line).strip()
    text = re.sub(r"\n{3,}", "\n\n", text)
    return text


def append_item(items: list[TextbookItem], current: TextbookItem | None) -> None:
    if current and normalize_block(current.lines):
        items.append(current)


def topic_slug(lesson: int, index: int) -> str:
    return f"L{lesson}-K{index}"


def parse_lesson(
    lesson_start: LessonStart,
    start_page: int,
    end_page: int,
    pages: list[PageText],
) -> dict:
    lesson_pages = [page for page in pages if start_page <= page.page <= end_page]
    knowledge_points: list[KnowledgePoint] = []
    examples: list[TextbookItem] = []
    homework: list[TextbookItem] = []

    current_kp: KnowledgePoint | None = None
    current_item: TextbookItem | None = None
    mode = "lesson"

    def ensure_kp(title: str, page: int, number: int | None = None) -> KnowledgePoint:
        nonlocal current_kp
        current_kp = KnowledgePoint(title=title, page=page, number=number)
        knowledge_points.append(current_kp)
        return current_kp

    for page in lesson_pages:
        for raw_line in page.lines:
            lesson_match = LESSON_RE.search(raw_line)
            if lesson_match:
                continue

            if raw_line.lower() == "homework":
                append_item(examples if current_item and current_item.kind == "example" else homework, current_item)
                current_item = None
                mode = "homework"
                continue

            example_match = EXAMPLE_RE.match(raw_line)
            if example_match and mode != "homework":
                append_item(examples if current_item and current_item.kind == "example" else homework, current_item)
                current_item = TextbookItem(
                    kind="example",
                    number=int(example_match.group(2)),
                    page=page.page,
                    topic=current_kp.title if current_kp else None,
                    starred=bool(example_match.group(1)),
                    lines=[example_match.group(3).strip()] if example_match.group(3).strip() else [],
                )
                mode = "example"
                continue

            problem_match = PROBLEM_RE.match(raw_line)
            if problem_match:
                append_item(examples if current_item and current_item.kind == "example" else homework, current_item)
                current_item = TextbookItem(
                    kind="homework",
                    number=int(problem_match.group(1)),
                    page=page.page,
                    topic=None,
                    lines=[problem_match.group(2).strip()] if problem_match.group(2).strip() else [],
                )
                mode = "homework"
                continue

            numbered_topic = NUMBERED_TOPIC_RE.match(raw_line)
            if mode != "homework" and numbered_topic and int(numbered_topic.group(1)) <= 12:
                append_item(examples if current_item and current_item.kind == "example" else homework, current_item)
                current_item = None
                ensure_kp(numbered_topic.group(2).strip(), page.page, int(numbered_topic.group(1)))
                mode = "knowledge"
                continue

            if mode != "homework" and current_item is None and looks_like_heading(raw_line):
                ensure_kp(raw_line, page.page)
                mode = "knowledge"
                continue

            if current_item is not None:
                current_item.lines.append(raw_line)
            elif current_kp is not None and mode != "homework":
                current_kp.lines.append(raw_line)

    append_item(examples if current_item and current_item.kind == "example" else homework, current_item)

    kp_payload = []
    for index, kp in enumerate(knowledge_points, start=1):
        content = normalize_block(kp.lines)
        kp_payload.append({
            "id": topic_slug(lesson_start.lesson, index),
            "number": kp.number,
            "title": kp.title,
            "page": kp.page,
            "content": content,
        })

    def item_payload(item: TextbookItem) -> dict:
        return {
            "number": item.number,
            "page": item.page,
            "topic": item.topic,
            "starred": item.starred,
            "text": normalize_block(item.lines),
        }

    return {
        "lesson": lesson_start.lesson,
        "title": lesson_start.title,
        "startPage": start_page,
        "endPage": end_page,
        "knowledgePoints": kp_payload,
        "examples": [item_payload(item) for item in examples],
        "homework": [item_payload(item) for item in homework],
    }


def extract_textbook(pdf_path: Path) -> dict:
    reader = PdfReader(str(pdf_path))
    pages = extract_pages(reader)
    starts = find_lesson_starts(pages)
    lessons = []
    for index, start in enumerate(starts):
        if start.lesson in {17, 30}:
            continue
        end_page = starts[index + 1].page - 1 if index + 1 < len(starts) else len(pages)
        lessons.append(parse_lesson(start, start.page, end_page, pages))

    return {
        "source": pdf_path.name,
        "pageCount": len(reader.pages),
        "lessonCount": len(lessons),
        "exampleCount": sum(len(lesson["examples"]) for lesson in lessons),
        "homeworkCount": sum(len(lesson["homework"]) for lesson in lessons),
        "knowledgePointCount": sum(len(lesson["knowledgePoints"]) for lesson in lessons),
        "lessons": lessons,
    }


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("pdf", type=Path)
    parser.add_argument("-o", "--output", type=Path, default=Path("data/textbook-content.json"))
    args = parser.parse_args()

    content = extract_textbook(args.pdf)
    args.output.parent.mkdir(parents=True, exist_ok=True)
    args.output.write_text(json.dumps(content, indent=2, ensure_ascii=False), encoding="utf-8")
    print(
        f"Wrote {args.output} with {content['lessonCount']} lessons, "
        f"{content['knowledgePointCount']} knowledge points, "
        f"{content['exampleCount']} examples, and {content['homeworkCount']} homework problems."
    )


if __name__ == "__main__":
    main()
