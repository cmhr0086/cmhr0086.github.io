---
title: wg-easy-v15配置&注意事项
date: 2026-06-18 20:08:47
categories:
  - 笔记
tags:
  - Wireguard
---

## 摘要

在这里写文章摘要。

## 正文


v15版本和之前的v14版本有很大的区别：

| **特性**      | **v14 (旧版)**      | **v15 (当前版)**             | **影响**                        |
| ----------- | ----------------- | ------------------------- | ----------------------------- |
| **数据存储**    | 纯文本 / `config` 文件 | **SQLite 数据库**            | 稳定性提高，但直接改文件不再生效，需通过 UI。      |
| **校验机制**    | 比较宽松，允许配置越界       | **极度严格的 CIDR 校验**         | 改变全局网段后，旧客户端会报 500 错误。        |
| **前端框架**    | 旧版 Vue / Express  | **Nitro / Nuxt 3 (现代架构)** | 界面更丝滑，但报错信息（如 H3Error）更偏向开发者。 |
| **IPv6 支持** | 插件式，配             | **深度集成**                  | 开启后会强制要求客户端填写 IPv6 地址。        |

## 第一步 配置docker-compose

以下是docker-compose.yml配置文件

```yaml
volumes:
  etc_wireguard:

services:
  wg-easy:
    environment:
    #  Optional:
    #  - PORT=51821
    #  - HOST=0.0.0.0
      - INSECURE=true # 重要的配置文件

    image: ghcr.io/wg-easy/wg-easy:15
    container_name: wg-easy
    networks:
      wg:
        ipv4_address: 10.42.42.42
        ipv6_address: fdcc:ad94:bacf:61a3::2a
    volumes:
      - etc_wireguard:/etc/wireguard
      - /lib/modules:/lib/modules:ro
    ports:
      - "51820:51820/udp"
      - "51821:51821/tcp"
    restart: unless-stopped
    cap_add:
      - NET_ADMIN
      - SYS_MODULE
      # - NET_RAW # ⚠️ Uncomment if using Podman
    sysctls:
      - net.ipv4.ip_forward=1
      - net.ipv4.conf.all.src_valid_mark=1
      - net.ipv6.conf.all.disable_ipv6=0
      - net.ipv6.conf.all.forwarding=1
      - net.ipv6.conf.default.forwarding=1

networks:
  wg:
    driver: bridge
    enable_ipv6: true # 改成false可以禁用ipv6
    ipam:
      driver: default
      config:
        - subnet: 10.42.42.0/24
        - subnet: fdcc:ad94:bacf:61a3::/64
```

注意：
- 不要更改里面的10.42.42.0/24，这个不是实际的WireGuard内网ip，而是docker网络
- 一定要将environment里的INSECURE=true，否则没证书你将无法登录
- 不建议更改此处的51820端口，除非你十分明确如何配置端口
- ghcr.io/wg-easy/wg-easy:15 不要改成latest，lateset是14版本

## 第二步 运行容器

可以通过ip:51921进入配置流程，在要求你输入ip的时候，输入你的服务器的公网ip和51820 udp端口即可，开放端口和环境配置就不再赘述了

## 第三步 配置基本设置

此时的wireguard就是可用状态，但是存在很多坑，而且默认的内网ip段是10.0.8.x，你想更改这个ip段，怎么办？？

点击右上角的 **“Administrator”** 图标---->**管理面板** 这是 v15 改动最大的地方，很多以前需要改 `docker-compose` 的参数，现在都在这里。

### 1. 网络配置

- **客户端的 Allowed IPs** 是告诉自己：**哪些目的地** 该走这条秘密地道。

自带的0.0.0.0/24很坑人，会代理所有的流量，一般没有这个需求

如果你只是简单的wireguard设备互访的话，你可以直接设置一个10.0.8.0/24

DNS设置公共DNS即可 比如 114.114.114.114

建议设置保活间隔：25，防止特殊网络环境的掉线

### 2. 接口配置

如果不想使用10.0.8.0/24这一默认网段，可以点击 **"修改CIDR"** 进行修改

比如我就比较习惯用 10.5.2.0/24

注意：此处修改的网段要与 网络配置中的 **Allowed IPs** 一致，否则客户端会报错

## 进阶玩法

此时已经可以像v14版本一样使用wireguard了，但是？v15多了些v14无法实现的功能

【此处生成多的功能】

当你连上wireguard的时候。你就可以直接访问对应家里的局域网了（虽然v14也可以实现）

v15更重要的是可以实现直接访问wireguard连接的客户端所在网段的其他设备

【生成实现方法】

还没写完嘿嘿
