# AMC Review Studio

本项目是一个本地 AMC 12 复习题库网站，目标是把教材例题整理成可审核的 lesson / 知识点 / 无计算器解法卡片。

## 当前状态

- 已建立 30 个 lesson 的知识点地图。
- 已从桌面 PDF 生成轻量索引：`data/pdf-index.json`，共 458 页、639 个例题标记。
- 已人工验证并录入 Lesson 1 的 4 道示范题，每题包含答案、知识点、审核提醒和至少两种无计算器解法。
- 未验证例题不会自动进入正式题库，避免把 OCR 错题面或错误解法包装成“答案”。

## 运行网站

```bash
python3 -m http.server 4174
```

然后打开：

```text
http://127.0.0.1:4174
```

## 更新 PDF 索引

```bash
/Users/liangjuan/.cache/codex-runtimes/codex-primary-runtime/dependencies/python/bin/python3 tools/extract_pdf_index.py /Users/liangjuan/Desktop/AMC12新版教材.pdf -o data/pdf-index.json
```

## 录入标准

每一道题进入 `src/data.js` 前必须满足：

1. 题面清楚，来源页码和例题编号已记录。
2. 至少一个主知识点明确，例如 prime factorization、gcd、similarity、expected value。
3. 解法不用计算器；如果有大量计算，必须说明如何心算、拆分或估界。
4. 至少两条独立思路，或者一条主解法加一条严谨校验。
5. 明确指出易错假设，例如重复计数、奇偶性、边界取等、图形比例误用。

## 严格提醒

不要追求“看起来题很多”。一个错误答案会污染整套复习系统。先把 lesson 和知识点覆盖完整，再按审核状态逐步增加题量。
