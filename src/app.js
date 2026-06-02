const data = window.AMC_DATA;
const EXAM_LESSON_IDS = new Set([17, 30]);

const state = {
  language: localStorage.getItem("amc-language") || "en",
  query: "",
  textbookContent: null,
  pdfIndex: null
};

const i18n = {
  en: {
    documentTitle: "AMC Review Studio",
    switchTo: "中文",
    brandSubtitle: "No-calculator solution studio",
    search: "Search",
    searchPlaceholder: "lesson, topic, method...",
    home: "Home",
    lessons: "Lessons",
    lesson: "Lesson",
    knowledgePoints: "Knowledge points",
    textbookExamples: "Examples",
    homework: "Homework",
    verifiedSolutions: "Verified solutions",
    sourcePage: "Source page",
    sourceText: "Extracted source text",
    answer: "Answer",
    solution: "Solution",
    solutions: "Solutions",
    openLesson: "Open lesson",
    open: "Open",
    examples: "examples",
    problems: "problems",
    noSeparateContent: "This textbook heading has no separately extracted body text; its subtopics and examples appear in the lesson directory.",
    extractedWarning: "This text is extracted from the textbook PDF and may contain formula/OCR artifacts. Treat it as source material to review, not a finished solution.",
    noTextbookText: "No textbook items were extracted for this section.",
    noSolutionYet: "No verified solution has been curated for this source item yet.",
    notFound: "Page not found",
    backToLesson: "Back to lesson",
    backToHome: "Back to home",
    studyPrompt: "Try the problem before opening the solution.",
    allLessons: "AMC 12 lesson library",
    homeIntro: "Choose a lesson, then drill down into its textbook knowledge points, examples, and homework.",
    totalCatalog: "catalog items",
    verified: "verified"
  },
  zh: {
    documentTitle: "AMC 复习题库",
    switchTo: "English",
    brandSubtitle: "无计算器解法训练",
    search: "搜索",
    searchPlaceholder: "课程、知识点、方法...",
    home: "主页",
    lessons: "课程",
    lesson: "Lesson",
    knowledgePoints: "知识点",
    textbookExamples: "例题",
    homework: "作业",
    verifiedSolutions: "已审核解法",
    sourcePage: "来源页",
    sourceText: "教材抽取原文",
    answer: "答案",
    solution: "解法",
    solutions: "解法",
    openLesson: "进入课程",
    open: "打开",
    examples: "例题",
    problems: "题目",
    noSeparateContent: "这个教材标题没有单独抽取到正文；它的子知识点和例题会出现在本课目录里。",
    extractedWarning: "这段文字来自教材 PDF 自动抽取，公式和排版可能有乱码。它是待校对的教材来源，不是最终解答。",
    noTextbookText: "这个部分没有抽取到教材条目。",
    noSolutionYet: "这条教材来源还没有整理出已审核解法。",
    notFound: "页面不存在",
    backToLesson: "返回课程",
    backToHome: "返回主页",
    studyPrompt: "先自己尝试，再展开解法。",
    allLessons: "AMC 12 课程库",
    homeIntro: "先选 Lesson，再逐层进入教材知识点、例题和作业。",
    totalCatalog: "目录内容",
    verified: "已审核"
  }
};

const lessonZh = {
  1: "质因数分解", 2: "最小公倍数、最大公因数与同余", 3: "同余与整除", 4: "数位与进制",
  5: "等差数列与等比数列", 6: "递推数列", 7: "因式分解、分式与根式", 8: "多项式与绝对值",
  9: "变换、圆与圆锥曲线", 10: "取整函数与二次函数", 11: "丢番图方程与应用题", 12: "不等式",
  13: "三角函数", 14: "对数", 15: "复数与方程", 16: "复数极坐标形式与单位根",
  18: "直角三角形、正多边形与面积法", 19: "正弦定理、余弦定理、中线与重心",
  20: "平行线与相似三角形", 21: "角平分线与内切圆", 22: "圆", 23: "立体几何",
  24: "加法原理与乘法原理", 25: "排列组合", 26: "正整数解与递推法", 27: "古典概率",
  28: "期望与几何概率", 29: "统计、命题与逻辑"
};

const problemZh = {
  "L1-E2": {
    source: "PDF 第 5 页，改写",
    title: "大幂的位数",
    prompt: "20^18 有多少位数字？",
    audit: "不需要对数。关键是把 20^18 拆成一个较小的开头整数乘以 10 的幂。",
    solutions: [
      { name: "位值拆分", steps: ["把 20^18 改写为 (2 x 10)^18 = 2^18 x 10^18。", "心算 2^18：2^10 x 2^8 = 1024 x 256 = 262144。", "所以 20^18 等于 262144 后面接 18 个 0。", "开头的 262144 有 6 位，总位数是 6 + 18 = 24。"] },
      { name: "不用完整乘法的估界", steps: ["因为 2^10 = 1024，略大于 10^3，所以 2^18 = 2^8 x 2^10 = 256 x 1024。", "这个乘积在 256000 和 512000 之间，因此正好是 6 位数。", "乘以 10^18 会在后面添 18 个 0。", "所以总位数是 6 + 18 = 24。"] }
    ]
  },
  "L1-E3": {
    source: "PDF 第 6 页，改写",
    title: "四个质数表达式",
    prompt: "正整数 A 和 B 使得 A、B、A-B、A+B 全都是质数。求这四个质数的和。",
    audit: "陷阱是默认 A 和 B 都是奇质数；那样 A+B 会是大于 2 的偶数，不可能是质数。",
    solutions: [
      { name: "先看奇偶性", steps: ["A 和 B 本身是质数，所以每个数要么是 2，要么是奇数。", "如果两者都是奇数，A+B 是大于 2 的偶数，不可能是质数。", "A 不能是 2，因为 A-B 必须是正质数，此时 B 会小于 2。", "因此 B=2。现在 A-2、A、A+2 都必须是质数。", "三个相隔 2 的奇数里必有一个被 3 整除。唯一可行是 A-2=3，所以 A=5。", "四个质数是 5、2、3、7，和为 17。"] },
      { name: "小质数强制", steps: ["A+B 不能是大于 2 的偶数。", "所以 A、B 中恰好一个是 2。", "因为 A-B 为正，所以 A>B，于是 B=2。", "试 A=3：A-B=1 不是质数。试 A=5：3、5、7 都是质数。", "若 A>5，则 A-2、A、A+2 三个数中有一个是大于 3 的 3 的倍数。", "所以 A=5 被强制，所求和是 17。"] }
    ]
  },
  "L1-E5": {
    source: "PDF 第 6 页，改写",
    title: "三个不同质数",
    prompt: "37 可以表示为三个不同质数之和的方式有多少种？",
    audit: "顺序不算不同。稳妥做法是固定最小质数，避免重复计数。",
    solutions: [
      { name: "按最小质数分类", steps: ["37 是奇数。若包含 2，再加两个奇质数会得到偶数，所以 2 不能出现。", "只考虑奇质数，并固定被选中的最小质数。", "最小为 3：剩余两数和为 34，有 (5,29) 和 (11,23)。", "最小为 5：剩余两数和为 32，有 (13,19)。", "最小为 7：剩余两数和为 30，有 (11,19) 和 (13,17)。", "从 11 开始不会产生新组合，只会重复前面已经数过的三元组。", "总共有 5 种。"] },
      { name: "配对和表", steps: ["先用奇偶性排除 2，只用奇质数。", "对每个可能的第一个质数 p，找和为 37-p 的不同质数对。", "p=3：34 = 5+29 = 11+23。", "p=5：32 = 13+19。", "p=7：30 = 11+19 = 13+17。", "p 大于 7 后，最小元素会重复前面情形，不再产生新三元组。", "共有 2+1+2 = 5 种。"] }
    ]
  },
  "L1-E6": {
    source: "PDF 第 7 页，改写",
    title: "固定乘积下最大化和",
    prompt: "互不相同的正整数 A、M、C 满足 A x M x C = 2016。A+M+C 的最大可能值是多少？",
    audit: "固定乘积下，要让和尽量大，应让两个因数尽量小，再把剩余乘积给第三个因数。",
    solutions: [
      { name: "极端因数法", steps: ["要在固定乘积下最大化三个正因数的和，就让其中两个尽可能小。", "最小的两个不同正因数是 1 和 2。", "第三个因数必须是 2016/(1 x 2) = 1008。", "和为 1 + 2 + 1008 = 1011。"] },
      { name: "为什么不能更大", steps: ["设三个不同正因数按 x<y<z 排列。", "则 x>=1 且 y>=2，所以 xy>=2。", "因为 xyz=2016，所以 z=2016/(xy)<=1008。", "z 最大时 xy=2，只能是 x=1、y=2。", "因此最大和是 1+2+1008=1011。"] }
    ]
  }
};

const app = document.querySelector("#app");
const searchInput = document.querySelector("#searchInput");
const languageToggle = document.querySelector("#languageToggle");

function t(key) {
  return i18n[state.language][key];
}

function activeLessons() {
  return data.lessons.filter((lesson) => !EXAM_LESSON_IDS.has(lesson.id));
}

function lessonById(id) {
  return data.lessons.find((lesson) => lesson.id === Number(id) && !EXAM_LESSON_IDS.has(lesson.id));
}

function textbookLessonEntry(lessonId) {
  return state.textbookContent?.lessons?.find((lesson) => lesson.lesson === Number(lessonId));
}

function lessonTitleText(lesson) {
  return state.language === "zh" ? lessonZh[lesson.id] || lesson.title : lesson.title;
}

function localizedProblem(problem) {
  const zh = state.language === "zh" ? problemZh[problem.id] : null;
  return {
    ...problem,
    ...zh,
    answer: zh?.answer || problem.answer,
    solutions: zh?.solutions || problem.solutions
  };
}

function escapeHtml(value = "") {
  return String(value).replace(/[&<>"']/g, (char) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    "\"": "&quot;",
    "'": "&#39;"
  })[char]);
}

function textBlock(value = "") {
  return escapeHtml(value || t("noSeparateContent")).replace(/\n/g, "<br>");
}

function routeParts() {
  const hash = window.location.hash.replace(/^#\/?/, "");
  return hash ? hash.split("/").filter(Boolean) : [];
}

function pageLink(parts) {
  return `#/${parts.join("/")}`;
}

function sourceTitle(kind, item, index) {
  if (kind === "knowledge") return item.title || `${t("knowledgePoints")} ${index + 1}`;
  if (kind === "homework") return `${t("homework")} ${item.number}`;
  return `${item.starred ? "*" : ""}${t("textbookExamples")} ${item.number}`;
}

function sourcePreview(kind, item) {
  const value = kind === "knowledge" ? item.content : item.text;
  return (value || t("noSeparateContent")).split("\n").find(Boolean) || t("noSeparateContent");
}

function verifiedProblemForExample(lessonId, exampleNumber) {
  return data.problems.find((problem) => problem.lessonId === Number(lessonId) && problem.example === Number(exampleNumber));
}

function searchableLessonText(lesson) {
  const source = textbookLessonEntry(lesson.id);
  return [
    lesson.id,
    lesson.title,
    lessonZh[lesson.id],
    ...(lesson.topics || []),
    ...(source?.knowledgePoints || []).map((item) => `${item.title} ${item.content}`),
    ...(source?.examples || []).map((item) => item.text),
    ...(source?.homework || []).map((item) => item.text)
  ].join(" ").toLowerCase();
}

function filteredLessons() {
  const query = state.query.trim().toLowerCase();
  return activeLessons().filter((lesson) => !query || searchableLessonText(lesson).includes(query));
}

function renderChrome() {
  document.documentElement.lang = state.language === "zh" ? "zh-CN" : "en";
  document.title = t("documentTitle");
  document.querySelector("#brandSubtitle").textContent = t("brandSubtitle");
  document.querySelector("#searchLabel").textContent = t("search");
  searchInput.placeholder = t("searchPlaceholder");
  searchInput.value = state.query;
  languageToggle.textContent = t("switchTo");
}

function layout(kicker, title, body, actions = "") {
  app.innerHTML = `
    <section class="page">
      <div class="page-head">
        <div>
          <p class="eyebrow">${kicker}</p>
          <h1>${title}</h1>
        </div>
        <div class="page-actions">${actions}</div>
      </div>
      ${body}
    </section>
  `;
}

function statsCards() {
  const lessonCount = activeLessons().length;
  const catalog = state.textbookContent ? state.textbookContent.exampleCount + state.textbookContent.homeworkCount : 0;
  const verified = data.problems.filter((problem) => problem.status === "verified").length;
  return `
    <div class="stats">
      <div><strong>${lessonCount}</strong><span>${t("lessons")}</span></div>
      <div><strong>${catalog}</strong><span>${t("totalCatalog")}</span></div>
      <div><strong>${verified}</strong><span>${t("verified")}</span></div>
    </div>
  `;
}

function renderHome() {
  const cards = filteredLessons().map((lesson) => {
    const source = textbookLessonEntry(lesson.id);
    const counts = source
      ? `${source.knowledgePoints.length} ${t("knowledgePoints")} · ${source.examples.length} ${t("examples")} · ${source.homework.length} ${t("homework")}`
      : `${lesson.indexedExamples} ${t("examples")}`;
    return `
      <a class="lesson-card" href="${pageLink(["lesson", lesson.id])}">
        <span class="lesson-index">${lesson.id}</span>
        <div>
          <h2>${escapeHtml(lessonTitleText(lesson))}</h2>
          <p>${escapeHtml(counts)}</p>
        </div>
        <span class="card-action">${t("openLesson")}</span>
      </a>
    `;
  }).join("");
  layout(
    t("home"),
    t("allLessons"),
    `
      <p class="lead">${t("homeIntro")}</p>
      ${statsCards()}
      <div class="lesson-grid">${cards}</div>
    `
  );
}

function renderLesson(lessonId) {
  const lesson = lessonById(lessonId);
  const source = textbookLessonEntry(lessonId);
  if (!lesson) return renderNotFound();

  const knowledgeCards = (source?.knowledgePoints || []).map((item, index) => cardLink(
    pageLink(["lesson", lesson.id, "knowledge", index]),
    item.number ? `K${item.number}` : `K${index + 1}`,
    item.title,
    `${t("sourcePage")} ${item.page}`
  )).join("");

  const exampleCards = (source?.examples || []).map((item, index) => {
    const verified = verifiedProblemForExample(lesson.id, item.number);
    return cardLink(
      pageLink(["lesson", lesson.id, "example", index]),
      `${item.starred ? "*" : ""}E${item.number}`,
      sourcePreview("example", item),
      `${t("sourcePage")} ${item.page}${verified ? ` · ${t("verifiedSolutions")}` : ""}`
    );
  }).join("");

  const homeworkCards = (source?.homework || []).map((item, index) => cardLink(
    pageLink(["lesson", lesson.id, "homework", index]),
    `H${item.number}`,
    sourcePreview("homework", item),
    `${t("sourcePage")} ${item.page}`
  )).join("");

  layout(
    `${t("lesson")} ${lesson.id}`,
    escapeHtml(lessonTitleText(lesson)),
    `
      <nav class="breadcrumbs"><a href="#/">${t("home")}</a><span>${t("lesson")} ${lesson.id}</span></nav>
      <div class="section-list">
        ${directorySection(t("knowledgePoints"), knowledgeCards)}
        ${directorySection(t("textbookExamples"), exampleCards)}
        ${directorySection(t("homework"), homeworkCards)}
      </div>
    `,
    `<a class="ghost-button" href="#/">${t("backToHome")}</a>`
  );
}

function directorySection(title, content) {
  return `
    <section class="directory-section">
      <div class="section-title">
        <h2>${title}</h2>
      </div>
      <div class="card-grid">${content || `<p class="muted">${t("noTextbookText") || ""}</p>`}</div>
    </section>
  `;
}

function cardLink(href, label, title, meta) {
  return `
    <a class="item-card" href="${href}">
      <span>${escapeHtml(label)}</span>
      <strong>${escapeHtml(title)}</strong>
      <small>${escapeHtml(meta)}</small>
    </a>
  `;
}

function renderSourceDetail(lessonId, kind, index) {
  const lesson = lessonById(lessonId);
  const source = textbookLessonEntry(lessonId);
  const collections = {
    knowledge: source?.knowledgePoints || [],
    example: source?.examples || [],
    homework: source?.homework || []
  };
  const item = collections[kind]?.[Number(index)];
  if (!lesson || !item) return renderNotFound();

  const verified = kind === "example" ? verifiedProblemForExample(lesson.id, item.number) : null;
  const verifiedBlock = verified ? renderVerifiedProblem(verified, true) : `
    <section class="callout">${t("noSolutionYet")}</section>
  `;

  const content = kind === "knowledge" ? item.content : item.text;
  layout(
    `${t("lesson")} ${lesson.id} · ${kindLabel(kind)}`,
    escapeHtml(sourceTitle(kind, item, Number(index))),
    `
      <nav class="breadcrumbs">
        <a href="#/">${t("home")}</a>
        <a href="${pageLink(["lesson", lesson.id])}">${t("lesson")} ${lesson.id}</a>
        <span>${kindLabel(kind)}</span>
      </nav>
      <article class="detail-card">
        <p class="meta">${t("sourcePage")}: <strong>${item.page}</strong>${item.topic ? ` · ${escapeHtml(item.topic)}` : ""}</p>
        <div class="source-text">${textBlock(content)}</div>
      </article>
      <section class="callout">${t("extractedWarning")}</section>
      ${kind === "knowledge" ? relatedExamples(lesson.id, item.title) : verifiedBlock}
    `,
    `<a class="ghost-button" href="${pageLink(["lesson", lesson.id])}">${t("backToLesson")}</a>`
  );
}

function kindLabel(kind) {
  if (kind === "knowledge") return t("knowledgePoints");
  if (kind === "homework") return t("homework");
  return t("textbookExamples");
}

function relatedExamples(lessonId, topic) {
  const source = textbookLessonEntry(lessonId);
  const examples = (source?.examples || [])
    .map((item, index) => ({ item, index }))
    .filter(({ item }) => item.topic === topic);
  if (!examples.length) return "";
  return `
    <section class="directory-section">
      <div class="section-title"><h2>${t("textbookExamples")}</h2></div>
      <div class="card-grid">
        ${examples.map(({ item, index }) => cardLink(
          pageLink(["lesson", lessonId, "example", index]),
          `E${item.number}`,
          sourcePreview("example", item),
          `${t("sourcePage")} ${item.page}`
        )).join("")}
      </div>
    </section>
  `;
}

function renderVerifiedProblem(problem, embedded = false) {
  const display = localizedProblem(problem);
  const solutions = display.solutions.map((solution) => `
    <details class="solution-panel">
      <summary>${escapeHtml(solution.name || t("solution"))}</summary>
      <ol>${solution.steps.map((step) => `<li>${escapeHtml(step)}</li>`).join("")}</ol>
    </details>
  `).join("");
  return `
    <article class="${embedded ? "detail-card" : "verified-page"}">
      <p class="meta">${t("answer")}: <strong>${escapeHtml(display.answer)}</strong> · ${escapeHtml(display.source || "")}</p>
      <div class="problem-statement">${escapeHtml(display.prompt)}</div>
      <section class="callout">${escapeHtml(display.audit || t("studyPrompt"))}</section>
      <h2>${t("solutions")}</h2>
      ${solutions}
    </article>
  `;
}

function renderNotFound() {
  layout(t("notFound"), t("notFound"), `<p class="lead">${t("backToHome")}</p>`, `<a class="ghost-button" href="#/">${t("backToHome")}</a>`);
}

function renderRoute() {
  renderChrome();
  const parts = routeParts();
  if (!parts.length) return renderHome();
  if (parts[0] === "lesson" && parts.length === 2) return renderLesson(parts[1]);
  if (parts[0] === "lesson" && parts.length === 4) return renderSourceDetail(parts[1], parts[2], parts[3]);
  renderNotFound();
}

searchInput.addEventListener("input", (event) => {
  state.query = event.target.value;
  if (routeParts().length) window.location.hash = "#/";
  renderRoute();
});

languageToggle.addEventListener("click", () => {
  state.language = state.language === "en" ? "zh" : "en";
  localStorage.setItem("amc-language", state.language);
  renderRoute();
});

window.addEventListener("hashchange", renderRoute);

renderRoute();

Promise.all([
  fetch("./data/pdf-index.json").then((response) => response.ok ? response.json() : null).catch(() => null),
  fetch("./data/textbook-content.json").then((response) => response.ok ? response.json() : null).catch(() => null)
]).then(([pdfIndex, textbookContent]) => {
  state.pdfIndex = pdfIndex;
  state.textbookContent = textbookContent;
  renderRoute();
});
