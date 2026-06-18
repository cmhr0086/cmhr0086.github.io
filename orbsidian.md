# Obsidian 对接 Hexo 博客教程

本教程适用于当前博客仓库：

```text
D:\Project\cmhr0086.github.io
```

博客源码位于 `blog` 分支，文章推送到 GitHub 后会由 GitHub Actions 自动发布到 [cmhr.cc](https://cmhr.cc)。

> 文件名按当前约定保存为 `orbsidian.md`，软件的正确名称是 **Obsidian**。

## 一、目录如何对应

建议直接把整个 Git 仓库作为一个 Obsidian 仓库（Vault），不要只打开 `source/_posts`。

| 位置 | 用途 | 是否发布到博客 |
| --- | --- | --- |
| `source/_posts/` | 正式文章 | 是 |
| `source/_drafts/` | Hexo 草稿 | 否，但提交到公开 GitHub 后仍可被看到 |
| `source/images/` | 文章图片和站点图片 | 图片会被发布 |
| `templates/` | Obsidian 写作模板 | 否 |
| `.obsidian/` | Obsidian 本机设置 | 否，建议加入 `.gitignore` |
| `public/` | Hexo 自动生成的网页 | 否，不要手动修改 |

正式笔记应写在 `source/_posts/`，而不是写在 README 或仓库根目录。

## 二、在 Obsidian 中打开仓库

1. 打开 Obsidian。
2. 选择“打开本地仓库”或“Open folder as vault”。
3. 选择下面这个文件夹：

   ```text
   D:\Project\cmhr0086.github.io
   ```

4. 如果 Obsidian询问是否信任此仓库，只在确认这是自己的仓库后继续。
5. 在开始写作前确认 Git 当前位于 `blog` 分支：

   ```bash
   git switch blog
   git pull
   ```

不要把 `main` 设置为写作分支。当前博客只从 `blog` 分支自动构建。

## 三、推荐的 Obsidian 设置

进入“设置 → 文件与链接（Files and links）”，使用以下配置：

### 新笔记位置

- 新建笔记的默认位置：指定文件夹。
- 文件夹：`source/_posts`。

这样点击“新建笔记”时，文件会直接出现在 Hexo 的文章目录。

### 附件位置

- 新附件的默认位置：指定文件夹。
- 文件夹：`source/images`。

Obsidian 插入图片后，需要确认文章中的地址是网站根路径：

```markdown
![图片说明](/images/图片文件名.png)
```

如果 Obsidian 自动生成了 `source/images/...`、`../images/...` 或 `![[图片.png]]`，请手动改成上面的 `/images/...` 格式，否则 Hexo 页面中可能无法正确显示。

### 链接格式

- 关闭“使用 Wiki 链接（Use [[Wikilinks]]）”。
- 使用标准 Markdown 链接。

推荐写法：

```markdown
[链接文字](https://example.com)
```

不要依赖下面这种 Obsidian 专用语法：

```text
[[另一篇笔记]]
![[图片.png]]
```

Hexo 默认不会像 Obsidian 一样解析这些 Wiki 链接。

### 排除无关目录

在 Obsidian 的“排除文件（Excluded files）”中加入：

```text
.git
.github
node_modules
public
scaffolds
```

这样搜索和快速切换只会关注文章、模板和必要配置，不会索引依赖及生成文件。

## 四、创建 Hexo 文章模板

### 1. 启用模板功能

1. 打开“设置 → 核心插件（Core plugins）”。
2. 启用“模板（Templates）”。
3. 打开“设置 → 模板”。
4. 将模板文件夹设置为：

   ```text
   templates
   ```

### 2. 创建模板文件

在仓库根目录创建：

```text
templates/Hexo文章.md
```

内容如下：

```yaml
---
title: "{{title}}"
date: {{date:YYYY-MM-DD}} {{time:HH:mm:ss}}
categories:
  - 笔记
tags: []
---

## 摘要

在这里写文章摘要。

## 正文

在这里开始写正文。
```

字段说明：

- `title`：文章标题，默认使用当前笔记文件名。
- `date`：创建文章时自动填写日期和时间。
- `categories`：文章分类，通常只保留一个。
- `tags`：文章标签，可以填写多个。

例如：

```yaml
categories:
  - Linux
tags:
  - Docker
  - 运维
```

### 3. 使用模板

1. 在 `source/_posts/` 新建笔记并先输入文件名，例如 `Docker基础.md`。
2. 打开命令面板，执行“模板：插入模板（Templates: Insert template）”。
3. 选择 `Hexo文章`。
4. 检查标题、分类和标签，然后编写正文。

也可以为“插入模板”设置快捷键，以后新建文章后按一次快捷键即可。

## 五、日常写作流程

### 开始写作前

在项目目录打开终端：

```bash
git switch blog
git pull
```

如果同时在多台电脑写作，必须先拉取远端内容，再开始修改。

### 写文章

1. 在 Obsidian 中创建新笔记。
2. 确认文件位于 `source/_posts/`。
3. 插入 `Hexo文章` 模板。
4. 使用标准 Markdown 编写内容。
5. 图片保存到 `source/images/`，并使用 `/images/文件名` 引用。

### 本地预览

在仓库根目录运行：

```bash
npm ci
npm run server
```

浏览器访问：

```text
http://localhost:4000
```

Obsidian 预览与 NexT 最终页面可能略有不同，应以本地 Hexo 页面为准。

发布前可以执行完整构建：

```bash
npm run clean
npm run build
```

## 六、同步到 GitHub 并发布

Obsidian 保存文件只代表内容已经写入本机，并不会自动同步或发布。

当前流程分为三步：

```text
Obsidian 保存 Markdown
        ↓
Git 提交并推送到 blog
        ↓
GitHub Actions 发布到 cmhr.cc
```

### 推荐方式：使用 Git 命令

完成文章后运行：

```bash
git status
git add source/_posts source/images templates
git commit -m "发布文章：文章标题"
git push
```

如果本次没有修改图片或模板，只添加实际修改的文件即可。推送成功后，在 GitHub 的 Actions 页面等待部署完成。

### 可选方式：Obsidian Git 插件

如果希望在 Obsidian 内自动提交和拉取，可以安装社区插件 **Obsidian Git**：

1. 在“设置 → 社区插件”中启用社区插件。
2. 搜索并安装 `Obsidian Git`。
3. 开启启动时自动拉取。
4. 设置自动备份间隔，例如 10 分钟。
5. 开启提交后推送。

使用自动同步时仍要遵守：

- 只在 `blog` 分支写作。
- 一台设备开始写作前先完成拉取。
- 遇到冲突时停止自动同步，先手动解决冲突。
- 不要同时用 Obsidian Sync、网盘同步和 Git 自动同步同一个仓库，多个同步工具可能互相覆盖或产生冲突。

社区插件并非 Obsidian 官方功能，安装前应查看插件权限、说明和维护状态。

## 七、`.obsidian` 设置如何处理

Obsidian 首次打开仓库后会创建 `.obsidian/`。它可能包含窗口布局、插件列表和本机界面状态。

个人博客推荐将整个目录加入 `.gitignore`：

```gitignore
.obsidian/
```

这样执行 `git add .` 时不会误提交本机设置。如果以后确实需要在多台设备同步 Obsidian 配置，再单独决定提交哪些配置文件；不要提交工作区布局、缓存或含有隐私信息的插件数据。

## 八、草稿与隐私

Hexo 草稿存放在：

```text
source/_drafts/
```

普通构建不会将草稿发布到博客，但当前 GitHub 仓库是公开仓库：只要将草稿提交并推送，别人仍然可以在 GitHub 中阅读。

因此：

- 未公开的草稿不要推送。
- 不要在文章、模板或 Obsidian 配置中保存密码、令牌、身份证件等敏感信息。
- 发布前使用 `git diff --cached` 检查即将提交的内容。

## 九、常见问题

### Obsidian 中能看到图片，博客中看不到

检查图片是否位于 `source/images/`，并将引用改为：

```markdown
![说明](/images/example.png)
```

### 推送后博客没有更新

依次检查：

1. 文件是否位于 `source/_posts/`。
2. 是否推送到了 `blog` 分支。
3. GitHub Actions 是否执行成功。
4. 文章日期是否被设置到了未来。
5. 浏览器是否仍在使用旧缓存。

### 文章被发布，但格式不正常

优先使用标准 Markdown。Obsidian 的 Wiki 链接、嵌入笔记、查询和部分插件语法不能直接被 Hexo 识别。

### 出现 Git 冲突

不要继续自动推送。先备份当前 Markdown 文件，然后执行 `git status` 查看冲突文件，合并双方内容并测试构建后再提交。

## 十、官方参考

- [Obsidian：管理仓库](https://help.obsidian.md/vault)
- [Obsidian：模板核心插件](https://help.obsidian.md/plugins/templates)
- [Obsidian：属性](https://help.obsidian.md/editing-and-formatting/properties)
- [Obsidian：附件](https://help.obsidian.md/attachments)
- [GitHub：基本 Git 操作](https://docs.github.com/get-started/using-git/about-git)
