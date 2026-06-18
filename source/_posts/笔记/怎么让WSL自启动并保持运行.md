---
title: 怎么让WSL自启动并保持运行
date: 2026-06-18 20:57:41
categories:
  - 笔记
tags:
  - WSL
---
## 核心代码

```vb
CreateObject("Wscript.Shell").run "wsl -d Ubuntu-20.04 -u root",vbhide
```

这是VBS脚本文件，通过执行可实现后台保活

放在计划任务中可实现开机自启动

## 怎么关闭？

你问我怎么关闭？当然是执行命令啦

```shell
wsl poweroff
```


