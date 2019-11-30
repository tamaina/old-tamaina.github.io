---
title: maqzアップデート
description: joinmisskeyの成果をmaqzに反映しました。
layout: blog
category: Computer
thumbnail: /files/images/imports/2019/08/P_20190812_134047.jpg
date: 2019-11-30T15:45:00+09:00
author:
  name: aqz
  url: https://yuzulia.xyz/@aqz
  avatar: aqz
amp: true
---
[joinmisskeyでの成果](https://join.misskey.page/ja/blog/2019/11/23-1-about-jm)をこのサイトを生成している自作ソフト（[maqz](../maqz/)）に反映しました。

- URL（パーマリンク）を変更しました。
  * 今まで全てindex.htmlで生成していたものを{basename}.htmlで生成するようにしました。  
    Markdownでリンクを追加する時はわざわざ`../`を余分に書いていたのを解消しました。  
    ただし、特にリダイレクト処理等はしていないので検索結果がほぼすべて404という事態に。
- `pug.render()`で1ページずつ関数を生成していたのを`pug.compileFile()`を使用しテンプレートごとに関数を生成するようにしたところ、ビルドが早くなりました。  
  もともとこうするべきだったのですが、PugのAPIがよくわからなかったためできていませんでした。
- 縮小画像の生成に[gulp-responsive](https://www.npmjs.com/package/gulp-responsive)を用いるようにしました。  
  gulp-responsiveは[sharp](https://sharp.pixelplumbing.com/en/stable/)を使用するので、ImageMagick/GraphicsMagickの依存が解消され、さらにイメージ縮小処理が高速化しました。普段あんまりしないけど。
- `&lt;picture&gt;`要素および`srcset`/`sizes`属性を導入し、画像読み込みの高速化をしました。
- Pjaxは要らなさそうなので廃止しました。  
  Pjaxの問題点:
  * Googleの諸々のスクリプトと相性が合わない
    * SPAでも使えないということなのでGoogle先生の方もちょっとどうにかしてよ～という気持ちがあります。
  * ページ遷移時にしたい処理は新たに登録する必要がある
    * コード量が多くなって処理も複雑になります。
  * だからといって早くなるわけではない
    * ブラウザもページ遷移にはかなりのチューニングをしているのでそこまで変わりません。
- ブログにページングを導入しました。
