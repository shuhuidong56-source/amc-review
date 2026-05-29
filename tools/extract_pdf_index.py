#!/usr/bin/env python3
"""Extract a lightweight AMC textbook index for manual curation.

This script intentionally does not build a finished answer key. It extracts
lesson starts, lesson titles, and visible example markers so each item can be
checked before it becomes a public study card.
"""

from __future__ import annotations

import argparse
import json
import re
from pathlib import Path

from pypdf import PdfReader


LESSON_RE = re.compile(r"AMC\s*12\s*Lesson\s*(\d+)\.\s*([^\n]+)", re.IGNORECASE)
EXAMPLE_RE = re.compile(r"\bExample\s*(\d+)[\.:]?", re.IGNORECASE)


def extract_index(pdf_path: Path) -> dict:
    reader = PdfReader(str(pdf_path))
    lessons: list[dict] = []
    current: dict | None = None

    for page_index, page in enumerate(reader.pages, start=1):
      text = page.extract_text() or ""
      lesson_match = LESSON_RE.search(text)
      if lesson_match:
          current = {
              "lesson": int(lesson_match.group(1)),
              "title": " ".join(lesson_match.group(2).split()),
              "startPage": page_index,
              "examples": [],
          }
          lessons.append(current)

      if current is None:
          continue

      for match in EXAMPLE_RE.finditer(text):
          current["examples"].append({
              "example": int(match.group(1)),
              "page": page_index,
              "status": "needs-review",
          })

    for index, lesson in enumerate(lessons[:-1]):
        lesson["endPage"] = lessons[index + 1]["startPage"] - 1
    if lessons:
        lessons[-1]["endPage"] = len(reader.pages)

    return {
        "source": str(pdf_path),
        "pageCount": len(reader.pages),
        "lessonCount": len(lessons),
        "exampleCount": sum(len(lesson["examples"]) for lesson in lessons),
        "lessons": lessons,
    }


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("pdf", type=Path)
    parser.add_argument("-o", "--output", type=Path, default=Path("data/pdf-index.json"))
    args = parser.parse_args()

    index = extract_index(args.pdf)
    args.output.parent.mkdir(parents=True, exist_ok=True)
    args.output.write_text(json.dumps(index, indent=2, ensure_ascii=False), encoding="utf-8")
    print(f"Wrote {args.output} with {index['lessonCount']} lessons and {index['exampleCount']} examples.")


if __name__ == "__main__":
    main()
