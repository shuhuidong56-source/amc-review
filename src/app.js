const data = window.AMC_DATA;

const state = {
  lessonId: "all",
  topic: "all",
  status: "all",
  query: "",
  selectedId: null,
  pdfIndex: null,
  language: localStorage.getItem("amc-language") || "en"
};

const i18n = {
  en: {
    documentTitle: "AMC Review Studio",
    switchTo: "中文",
    brandSubtitle: "No-calculator solution studio",
    search: "Search",
    searchPlaceholder: "lesson, topic, method...",
    curriculumMap: "Curriculum map",
    verified: "verified",
    lessons: "lessons",
    indexedExamples: "indexed examples",
    all: "All",
    allLessons: "All lessons",
    completeCurriculum: "Complete curriculum",
    allTopics: "All topics",
    needsReview: "needs review",
    noCuratedTitle: "No curated problem yet",
    noCuratedText: "This filter has indexed material but no verified problem card. Use the extractor script, then curate statement, topic, and solution paths.",
    selectProblem: "Select a problem",
    emptyText: "Use this panel to compare no-calculator approaches and audit the reasoning.",
    focusTitle: "Every example must earn its place.",
    focusText: "A problem is not complete until it has a lesson tag, a precise knowledge point, at least one mental path, and a checked alternative solution.",
    answer: "Answer",
    lesson: "Lesson",
    pending: "Pending",
    chooseLessonTitle: "Choose a lesson first",
    chooseLessonText: "Open a lesson from the left. The center panel will then show that lesson's knowledge-point directory and example buttons.",
    lessonDirectory: "Lesson directory",
    examples: "examples",
    curatedExamples: "curated",
    indexedOnly: "indexed only",
    openExample: "Open",
    indexedExampleTitle: "Example awaiting curation",
    indexedExampleText: "This example is indexed from the textbook, but its statement and no-calculator solutions have not been audited yet.",
    directoryHint: "Select an example from the lesson directory to view the problem and solutions.",
    selectedExample: "Selected example"
  },
  zh: {
    documentTitle: "AMC 复习题库",
    switchTo: "English",
    brandSubtitle: "无计算器解法训练",
    search: "搜索",
    searchPlaceholder: "课程、知识点、方法...",
    curriculumMap: "课程地图",
    verified: "已审核",
    lessons: "课程",
    indexedExamples: "已索引例题",
    all: "全部",
    allLessons: "全部课程",
    completeCurriculum: "完整课程体系",
    allTopics: "全部知识点",
    needsReview: "待审核",
    noCuratedTitle: "这里还没有审核题卡",
    noCuratedText: "这个筛选条件下有已索引材料，但还没有正式审核题卡。先用抽取脚本定位题目，再审核题面、知识点和解法。",
    selectProblem: "选择一道题",
    emptyText: "在这里对比无计算器解法，并检查推理是否可靠。",
    focusTitle: "每一道例题都必须经得起审查。",
    focusText: "一道题必须有课程标签、精确知识点、至少一种心算或无计算器路径，以及另一种可核验思路，才算真正完成。",
    answer: "答案",
    lesson: "课程",
    pending: "待补充",
    chooseLessonTitle: "先选择一个 Lesson",
    chooseLessonText: "从左侧点进某一课。中间区域会显示本课知识点目录和例题按钮。",
    lessonDirectory: "本课目录",
    examples: "例题",
    curatedExamples: "已整理",
    indexedOnly: "仅索引",
    openExample: "查看",
    indexedExampleTitle: "例题待整理",
    indexedExampleText: "这道例题已经从教材索引到，但题面和无计算器解法还没有审核。",
    directoryHint: "从本课目录中选择一道例题，右侧会显示题目和解法。",
    selectedExample: "当前例题"
  }
};

const lessonZh = {
  1: "质因数分解", 2: "最小公倍数、最大公因数与同余", 3: "同余与整除", 4: "数位与进制",
  5: "等差数列与等比数列", 6: "递推数列", 7: "因式分解、分式与根式", 8: "多项式与绝对值",
  9: "变换、圆与圆锥曲线", 10: "取整函数与二次函数", 11: "丢番图方程与应用题", 12: "不等式",
  13: "三角函数", 14: "对数", 15: "复数与方程", 16: "复数极坐标形式与单位根",
  17: "期中测试", 18: "直角三角形、正多边形与面积法", 19: "正弦定理、余弦定理、中线与重心",
  20: "平行线与相似三角形", 21: "角平分线与内切圆", 22: "圆", 23: "立体几何",
  24: "加法原理与乘法原理", 25: "排列组合", 26: "正整数解与递推法", 27: "古典概率",
  28: "期望与几何概率", 29: "统计、命题与逻辑", 30: "期末测试"
};

const topicZh = {
  "integers": "整数", "prime numbers": "质数", "prime factorization": "质因数分解", "divisors": "因数",
  "lcm": "最小公倍数", "gcd": "最大公因数", "modular arithmetic": "模运算", "remainders": "余数",
  "divisibility": "整除", "modular cases": "同余分类", "digits": "数位", "place value": "位值",
  "bases": "进制", "arithmetic sequence": "等差数列", "geometric sequence": "等比数列", "series": "数列求和",
  "recursion": "递推", "iteration": "迭代", "patterns": "规律", "algebraic factoring": "代数因式分解",
  "fractions": "分式", "radicals": "根式", "polynomials": "多项式", "absolute value": "绝对值",
  "functions": "函数", "coordinate geometry": "坐标几何", "circles": "圆", "conics": "圆锥曲线",
  "floor function": "取整函数", "quadratics": "二次函数", "casework": "分类讨论", "integer equations": "整数方程",
  "word problems": "应用题", "cauchy": "柯西不等式", "am-gm": "均值不等式", "bounds": "界限",
  "trig": "三角函数", "compound angles": "和差角", "log rules": "对数法则", "exponents": "指数",
  "complex numbers": "复数", "equations": "方程", "polar form": "极坐标形式", "roots of unity": "单位根",
  "mixed review": "综合复习", "right triangles": "直角三角形", "area": "面积", "regular polygons": "正多边形",
  "law of sines": "正弦定理", "law of cosines": "余弦定理", "centroid": "重心", "similarity": "相似",
  "parallel lines": "平行线", "angle bisectors": "角平分线", "incircle": "内切圆", "circle geometry": "圆几何",
  "power of a point": "点的幂", "volume": "体积", "surface area": "表面积", "3d geometry": "立体几何",
  "counting": "计数", "sum rule": "加法原理", "product rule": "乘法原理", "permutations": "排列",
  "combinations": "组合", "stars and bars": "隔板法", "probability": "概率", "counting outcomes": "样本计数",
  "expected value": "期望", "geometric probability": "几何概率", "statistics": "统计", "logic": "逻辑",
  "powers of 10": "10 的幂", "mental arithmetic": "心算", "parity": "奇偶性", "mod 3": "模 3",
  "prime lists": "质数表", "count once": "不重不漏", "optimization": "最优化", "factorization": "因式分解",
  "extreme principle": "极端原则", "congruence": "同余"
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
  },
  "L2-template": {
    source: "来自课程索引",
    title: "GCD/LCM 例题待整理",
    prompt: "本课已索引 22 道例题。每道题必须先核对题面、答案，并写出至少两种无计算器解法后，才能加入正式题库。",
    answer: "待补充",
    audit: "不要在这里批量生成答案。先抽取精确数学对象，再用独立方法验证。",
    solutions: [
      { name: "整理检查清单", steps: ["记录来源页码和例题编号。", "指定一个主知识点，并添加可选副标签。", "先写一条简洁的心算路径，再写代数较重的解法。", "用不同方法检查最终答案。"] }
    ]
  }
};

const lessonNav = document.querySelector("#lessonNav");
const problemList = document.querySelector("#problemList");
const topicTabs = document.querySelector("#topicTabs");
const lessonTitle = document.querySelector("#lessonTitle");
const searchInput = document.querySelector("#searchInput");
const problemDetail = document.querySelector("#problemDetail");
const inspectorEmpty = document.querySelector("#inspectorEmpty");
const languageToggle = document.querySelector("#languageToggle");

document.querySelector("#lessonCount").textContent = data.lessons.length;
document.querySelector("#exampleCount").textContent = data.lessons.reduce((sum, lesson) => sum + lesson.indexedExamples, 0);
document.querySelector("#verifiedCount").textContent = data.problems.filter((problem) => problem.status === "verified").length;

function t(key) {
  return i18n[state.language][key];
}

function lessonTitleText(lesson) {
  return state.language === "zh" ? lessonZh[lesson.id] || lesson.title : lesson.title;
}

function topicText(topic) {
  return state.language === "zh" ? topicZh[topic] || topic : topic;
}

function statusText(status) {
  if (status === "verified") return t("verified");
  if (status === "needs-review") return t("needsReview");
  return status;
}

function localizedProblem(problem) {
  const zh = state.language === "zh" ? problemZh[problem.id] : null;
  return {
    ...problem,
    ...zh,
    answer: zh?.answer || (state.language === "zh" && problem.answer === "Pending" ? t("pending") : problem.answer),
    solutions: zh?.solutions || problem.solutions
  };
}

function searchableProblem(problem) {
  const lesson = lessonById(problem.lessonId);
  const zh = problemZh[problem.id] || {};
  return [
    problem.title,
    problem.prompt,
    problem.topic,
    problem.answer,
    problem.status,
    lesson?.title,
    lesson ? lessonZh[lesson.id] : "",
    zh.title,
    zh.prompt,
    zh.answer,
    zh.audit,
    ...(problem.tags || []),
    ...(problem.tags || []).map(topicText)
  ].join(" ").toLowerCase();
}

function lessonById(id) {
  return data.lessons.find((lesson) => lesson.id === Number(id));
}

function getVisibleProblems() {
  const query = state.query.trim().toLowerCase();
  return data.problems.filter((problem) => {
    const haystack = searchableProblem(problem);

    const lessonMatch = state.lessonId === "all" || problem.lessonId === Number(state.lessonId);
    const statusMatch = state.status === "all" || problem.status === state.status;
    const topicMatch = state.topic === "all" || problem.topic === state.topic || problem.tags.includes(state.topic);
    const queryMatch = !query || haystack.includes(query);
    return lessonMatch && statusMatch && topicMatch && queryMatch;
  });
}

function renderLessons() {
  const allButton = document.createElement("button");
  allButton.className = `lesson-button ${state.lessonId === "all" ? "active" : ""}`;
  allButton.innerHTML = `
    <span class="lesson-number">${t("all")}</span>
    <span class="lesson-name">${t("completeCurriculum")}</span>
    <span class="lesson-total">${data.lessons.reduce((sum, lesson) => sum + lesson.indexedExamples, 0)}</span>
  `;
  allButton.addEventListener("click", () => {
    state.lessonId = "all";
    state.topic = "all";
    state.selectedId = null;
    render();
  });

  lessonNav.replaceChildren(allButton);
  data.lessons.forEach((lesson) => {
    const button = document.createElement("button");
    button.className = `lesson-button ${state.lessonId === String(lesson.id) ? "active" : ""}`;
    button.innerHTML = `
      <span class="lesson-number">${lesson.id}</span>
      <span class="lesson-name">${lessonTitleText(lesson)}</span>
      <span class="lesson-total">${lesson.indexedExamples}</span>
    `;
    button.addEventListener("click", () => {
      state.lessonId = String(lesson.id);
      state.topic = "all";
      state.selectedId = null;
      render();
    });
    lessonNav.append(button);
  });
}

function renderTopics() {
  if (state.lessonId === "all") {
    topicTabs.replaceChildren();
    return;
  }
  const topics = lessonDirectoryTopics(state.lessonId);
  const buttons = [
    makeTopicButton("all", t("allTopics")),
    ...topics.map((topic) => makeTopicButton(topic, topicText(topic)))
  ];
  topicTabs.replaceChildren(...buttons);
}

function makeTopicButton(topic, label) {
  const button = document.createElement("button");
  button.className = `topic-tab ${state.topic === topic ? "active" : ""}`;
  button.textContent = label;
  button.addEventListener("click", () => {
    state.topic = topic;
    state.selectedId = null;
    render();
  });
  return button;
}

function indexId(lessonId, example) {
  return `index-${lessonId}-${example}`;
}

function isIndexId(id) {
  return typeof id === "string" && id.startsWith("index-");
}

function parseIndexId(id) {
  const [, lessonId, example] = id.split("-");
  return { lessonId: Number(lessonId), example: Number(example) };
}

function lessonIndexEntry(lessonId) {
  return state.pdfIndex?.lessons?.find((lesson) => lesson.lesson === Number(lessonId));
}

function indexedExamplesForLesson(lessonId) {
  const lesson = lessonById(lessonId);
  const indexEntry = lessonIndexEntry(lessonId);
  if (indexEntry?.examples?.length) {
    const seen = new Set();
    return indexEntry.examples
      .filter((item) => {
        const key = item.example;
        if (seen.has(key)) return false;
        seen.add(key);
        return true;
      })
      .sort((a, b) => a.example - b.example);
  }
  return Array.from({ length: lesson.indexedExamples }, (_, index) => ({
    example: index + 1,
    page: null,
    status: "needs-review"
  }));
}

function problemForExample(lessonId, example) {
  return data.problems.find((problem) => problem.lessonId === Number(lessonId) && problem.example === Number(example));
}

function indexedExampleMatchesQuery(exampleItem, lesson) {
  const query = state.query.trim().toLowerCase();
  if (!query) return true;
  const haystack = [
    `${t("lesson")} ${lesson.id}`,
    lesson.title,
    lessonZh[lesson.id],
    `${t("examples")} ${exampleItem.example}`,
    `example ${exampleItem.example}`,
    exampleItem.page ? `page ${exampleItem.page}` : ""
  ].join(" ").toLowerCase();
  return haystack.includes(query);
}

function indexItemAllowedByStatus() {
  return state.status === "all" || state.status === "needs-review";
}

function lessonDirectoryTopics(lessonId) {
  const lesson = lessonById(lessonId);
  const curatedTopics = data.problems
    .filter((problem) => problem.lessonId === Number(lessonId))
    .flatMap((problem) => [problem.topic, ...(problem.tags || [])]);
  return [...new Set([...(lesson?.topics || []), ...curatedTopics])];
}

function renderLessonChoices() {
  problemList.replaceChildren(...data.lessons.map((lesson) => {
    const card = document.createElement("article");
    card.className = "problem-card lesson-choice";
    card.tabIndex = 0;
    card.innerHTML = `
      <div class="problem-head">
        <span class="problem-title">${t("lesson")} ${lesson.id} · ${lessonTitleText(lesson)}</span>
        <span class="lesson-total">${lesson.indexedExamples}</span>
      </div>
      <p class="problem-text">${lesson.topics.map(topicText).join(" · ")}</p>
    `;
    card.addEventListener("click", () => {
      state.lessonId = String(lesson.id);
      state.topic = "all";
      state.selectedId = null;
      render();
    });
    card.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        state.lessonId = String(lesson.id);
        state.topic = "all";
        state.selectedId = null;
        render();
      }
    });
    return card;
  }));
}

function renderProblems() {
  if (state.lessonId === "all") {
    renderLessonChoices();
    return;
  }

  const lesson = lessonById(state.lessonId);
  const curated = getVisibleProblems().filter((problem) => problem.lessonId === lesson.id);
  const indexed = indexedExamplesForLesson(lesson.id)
    .filter((item) => !problemForExample(lesson.id, item.example))
    .filter((item) => indexedExampleMatchesQuery(item, lesson))
    .filter(() => indexItemAllowedByStatus());

  const directoryTopics = state.topic === "all" ? lessonDirectoryTopics(lesson.id) : [state.topic];
  const usedProblemIds = new Set();
  const sections = directoryTopics
    .filter((topic) => state.topic === "all" || state.topic === topic)
    .map((topic) => {
      const items = curated.filter((problem) => {
        const topicMatch = state.topic === "all" ? problem.topic === topic : problem.topic === topic || problem.tags.includes(topic);
        if (!topicMatch || usedProblemIds.has(problem.id)) return false;
        usedProblemIds.add(problem.id);
        return true;
      });
      return { topic, type: "curated", items };
    })
    .filter((section) => section.items.length);

  if ((state.topic === "all" || state.topic === "indexed-only") && indexed.length) {
    sections.push({ topic: "indexed-only", type: "indexed", items: indexed });
  }

  if (!sections.length) {
    problemList.innerHTML = `
      <article class="problem-card">
        <div class="problem-head">
          <span class="problem-title">${t("noCuratedTitle")}</span>
          <span class="status needs-review">${t("needsReview")}</span>
        </div>
        <p class="problem-text">${t("noCuratedText")}</p>
      </article>
    `;
    return;
  }

  const directory = document.createElement("div");
  directory.className = "lesson-directory";
  directory.innerHTML = `
    <div class="directory-head">
      <div>
        <p class="eyebrow">${t("lessonDirectory")}</p>
        <h3>${t("lesson")} ${lesson.id}: ${lessonTitleText(lesson)}</h3>
      </div>
      <div class="directory-counts">
        <span>${curated.length} ${t("curatedExamples")}</span>
        <span>${indexed.length} ${t("indexedOnly")}</span>
      </div>
    </div>
  `;

  sections.forEach((section) => {
    const sectionEl = document.createElement("section");
    sectionEl.className = "directory-section";
    sectionEl.innerHTML = `
      <div class="section-title">
        <h4>${section.type === "indexed" ? t("indexedOnly") : topicText(section.topic)}</h4>
        <span>${section.items.length} ${t("examples")}</span>
      </div>
      <div class="example-buttons"></div>
    `;
    const buttons = sectionEl.querySelector(".example-buttons");
    section.items.forEach((item) => {
      const isIndexed = section.type === "indexed";
      const problem = isIndexed ? null : item;
      const displayProblem = problem ? localizedProblem(problem) : null;
      const itemId = problem ? problem.id : indexId(lesson.id, item.example);
      const button = document.createElement("button");
      button.className = `example-button ${state.selectedId === itemId ? "active" : ""}`;
      button.type = "button";
      button.dataset.exampleId = itemId;
      button.innerHTML = `
        <span>${problem ? problem.id : `E${item.example}`}</span>
        <strong>${problem ? displayProblem.title : t("indexedExampleTitle")}</strong>
        <small>${problem ? statusText(problem.status) : `${t("needsReview")}${item.page ? ` · p.${item.page}` : ""}`}</small>
      `;
      button.addEventListener("click", () => selectProblem(itemId));
      buttons.append(button);
    });
    directory.append(sectionEl);
  });

  problemList.replaceChildren(directory);
}

function selectProblem(problemId) {
  state.selectedId = problemId;
  renderProblems();
  renderDetail();
}

function renderDetail() {
  if (!state.selectedId) {
    document.querySelector("#emptyTitle").textContent = state.lessonId === "all" ? t("chooseLessonTitle") : t("selectProblem");
    document.querySelector("#emptyText").textContent = state.lessonId === "all" ? t("chooseLessonText") : t("directoryHint");
    problemDetail.classList.add("hidden");
    inspectorEmpty.classList.remove("hidden");
    return;
  }

  if (isIndexId(state.selectedId)) {
    const { lessonId, example } = parseIndexId(state.selectedId);
    if (state.lessonId !== String(lessonId) || !indexItemAllowedByStatus()) {
      state.selectedId = null;
      renderDetail();
      return;
    }
    const lesson = lessonById(lessonId);
    inspectorEmpty.classList.add("hidden");
    problemDetail.classList.remove("hidden");
    problemDetail.innerHTML = `
      <p class="detail-kicker">${t("lesson")} ${lesson.id} · ${t("selectedExample")} ${example}</p>
      <h2>${t("indexedExampleTitle")}</h2>
      <div class="detail-problem">${t("indexedExampleText")}</div>
      <p class="meta">${t("answer")}: <strong>${t("pending")}</strong></p>
      <div class="audit">${t("noCuratedText")}</div>
    `;
    return;
  }

  const problem = getVisibleProblems().find((item) => item.id === state.selectedId);
  if (!problem) {
    state.selectedId = null;
    problemDetail.classList.add("hidden");
    inspectorEmpty.classList.remove("hidden");
    return;
  }
  state.selectedId = problem.id;
  const lesson = lessonById(problem.lessonId);
  const displayProblem = localizedProblem(problem);
  inspectorEmpty.classList.add("hidden");
  problemDetail.classList.remove("hidden");
  problemDetail.innerHTML = `
    <p class="detail-kicker">${t("lesson")} ${lesson.id} · ${topicText(problem.topic)}</p>
    <h2>${displayProblem.title}</h2>
    <div class="detail-problem">${displayProblem.prompt}</div>
    <p class="meta">${t("answer")}: <strong>${displayProblem.answer}</strong> · ${displayProblem.source}</p>
    <div class="audit">${displayProblem.audit}</div>
    ${displayProblem.solutions.map((solution) => `
      <section class="solution">
        <h3>${solution.name}</h3>
        <ol>${solution.steps.map((step) => `<li>${step}</li>`).join("")}</ol>
      </section>
    `).join("")}
  `;
}

function renderTitle() {
  if (state.lessonId === "all") {
    lessonTitle.textContent = t("allLessons");
    return;
  }
  const lesson = lessonById(state.lessonId);
  lessonTitle.textContent = `${t("lesson")} ${lesson.id}: ${lessonTitleText(lesson)}`;
}

function renderStaticText() {
  document.documentElement.lang = state.language === "zh" ? "zh-CN" : "en";
  document.title = t("documentTitle");
  languageToggle.textContent = t("switchTo");
  document.querySelector("#brandSubtitle").textContent = t("brandSubtitle");
  document.querySelector("#searchLabel").textContent = t("search");
  searchInput.placeholder = t("searchPlaceholder");
  document.querySelector("#eyebrow").textContent = t("curriculumMap");
  document.querySelector("#verifiedStat").textContent = t("verified");
  document.querySelector("#lessonStat").textContent = t("lessons");
  document.querySelector("#exampleStat").textContent = t("indexedExamples");
  document.querySelector("#focusTitle").textContent = t("focusTitle");
  document.querySelector("#focusText").textContent = t("focusText");
  document.querySelector("#emptyTitle").textContent = t("selectProblem");
  document.querySelector("#emptyText").textContent = t("emptyText");
  document.querySelectorAll(".chip").forEach((button) => {
    if (button.dataset.status === "all") button.textContent = t("all");
    if (button.dataset.status === "verified") button.textContent = t("verified");
    if (button.dataset.status === "needs-review") button.textContent = t("needsReview");
  });
}

function render() {
  renderStaticText();
  renderTitle();
  renderLessons();
  renderTopics();
  renderProblems();
  renderDetail();
}

document.querySelectorAll(".chip").forEach((button) => {
  button.addEventListener("click", () => {
    document.querySelectorAll(".chip").forEach((chip) => chip.classList.remove("active"));
    button.classList.add("active");
    state.status = button.dataset.status;
    state.selectedId = null;
    render();
  });
});

searchInput.addEventListener("input", (event) => {
  state.query = event.target.value;
  state.selectedId = null;
  render();
});

languageToggle.addEventListener("click", () => {
  state.language = state.language === "en" ? "zh" : "en";
  localStorage.setItem("amc-language", state.language);
  render();
});

render();

fetch("./data/pdf-index.json")
  .then((response) => response.ok ? response.json() : null)
  .then((pdfIndex) => {
    state.pdfIndex = pdfIndex;
    render();
  })
  .catch(() => {
    state.pdfIndex = null;
  });
