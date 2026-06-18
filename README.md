# CMHR Blog

基于 Hexo 和 NexT 的个人博客，源码保存在 `blog` 分支，并通过 GitHub Actions 自动发布到 [cmhr.cc](https://cmhr.cc)。

## 写笔记

博客文章不要直接写在本 README 中，而是以 Markdown 文件保存到 `source/_posts/`。

### 1. 同步 blog 分支

每次开始写作前，先确保位于 `blog` 分支并同步远端：

```bash
git switch blog
git pull
```

### 2. 新建文章

```bash
npx hexo new post "文章标题"
```

命令会在 `source/_posts/` 中生成一个 Markdown 文件。也可以直接在该目录手动创建 `.md` 文件。

### 3. 编写文章

文章开头使用以下格式：

```yaml
---
title: 文章标题
date: 2026-06-18 20:00:00
categories:
  - 学习笔记
tags:
  - Hexo
  - JavaScript
---
```

第二个 `---` 之后使用 Markdown 编写正文，例如：

````markdown
## 小标题

这里是正文。

- 列表项目一
- 列表项目二

```javascript
console.log('Hello, world!');
```
````

一篇文章建议只设置一个分类，可以设置多个标签。

### 4. 添加图片

将图片放到 `source/images/`，然后在文章中使用网站根路径引用：

```markdown
![图片说明](/images/example.jpg)
```

请使用不同的、容易识别的图片文件名，避免覆盖已有图片。

### 5. 本地预览

```bash
npm ci
npm run server
```

浏览器打开 `http://localhost:4000`。写作过程中保存 Markdown 文件，页面会自动更新。

发布前可以执行一次完整构建检查：

```bash
npm run clean
npm run build
```

### 6. 发布文章

确认预览正常后，将修改提交并推送到 `blog` 分支：

```bash
git add .
git commit -m "发布文章：文章标题"
git push
```

推送成功后，GitHub Actions 会自动构建并发布到 [cmhr.cc](https://cmhr.cc)。无需修改或合并到 `main` 分支。

## 使用草稿

暂时不想发布的内容可以创建为草稿：

```bash
npx hexo new draft "草稿标题"
npx hexo server --draft
```

草稿保存在 `source/_drafts/`，普通构建不会发布。完成后转为正式文章：

```bash
npx hexo publish draft "草稿标题"
```

## 常用目录

| 路径 | 用途 |
| --- | --- |
| `source/_posts/` | 已发布或准备发布的文章 |
| `source/_drafts/` | 尚未发布的草稿 |
| `source/images/` | 文章图片和站点图片 |
| `_config.yml` | Hexo 站点配置 |
| `_config.next.yml` | NexT 主题配置 |
| `public/` | 自动生成的网页，不要手动修改或提交 |
