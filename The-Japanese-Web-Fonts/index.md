---
title: the Japanese Web Fonts
description: the Japanese Web Fontsは、フリーフォントを集めたWebフォントセットです。
layout: index
rank: 10
---
the Japanese Web Fontsは、日本語フリーフォントを集めたWebフォントセットです。  
日本語用にサブセットしています。

[GitHub tamaina/the-japanese-web-fonts](https://github.com/tamaina/The-Japanese-Web-Fonts)

## 概要
日本語に適したサブセットにしています。

## 使い方

[フォントリスト](fonts/)の「CSS」に書かれているURLをHTMLの`&lt;link&gt;`タグで読み込みます。

```html
&lt;link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/tamaina/The-Japanese-Web-Fonts@v7.0.1/dist/SourceHanSans/SourceHanSans.css"&gt;
```

[フォントリスト](fonts/)の「font-family」に書かれているフォント名をfont-familyとして指定します。

```css
body, html {
  font-family: SourceHanSans-w, sans-serif;
}
```
