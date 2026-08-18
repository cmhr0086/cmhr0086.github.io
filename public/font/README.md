## Logo 字体替换

站点实际使用的压缩字体位于 `src/assets/fonts/Pacifico-Regular.ttf`，构建时由 Vite
生成带内容哈希的资源地址，避免浏览器或 Service Worker 继续使用旧字体。

该文件夹下的 `Pacifico-Regular-all.ttf` 是完整字体备份。需要使用完整字形时，
请用它替换 `src/assets/fonts/Pacifico-Regular.ttf` 后重新构建。

## HarmonyOS Sans

本站使用 HarmonyOS Sans Regular，并将网页字体分片托管在
`HarmonyOS_Sans` 目录下，避免页面渲染依赖第三方 CDN。

- 官方字体资源：https://developer.huawei.com/consumer/cn/design/resource/?catalogVersion=V1
- 网页字体分片来源：https://github.com/imsyy/file/tree/master/font/HarmonyOS_Sans

字体名称及相关权利归原权利人所有，请遵守字体资源随附的许可条款。
