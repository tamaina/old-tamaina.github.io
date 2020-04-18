---
title: maqz README
description: 詳細な使い方
---
## 使い方
### 導入
必要なソフトウェアをインストールし、GitHubからクローンして環境を整えます。

#### 1. 必要なソフトウェアのインストール
以下のソフトウェアは必須です。

- **node.js**
- **Git**

また、エディターも必要です。エディターにはVisual Studio Codeを推奨します。

環境によって追加のライブラリも必要です。

##### Mac OS
- Command Line Tools
- libjpeg, libpng

```
brew install libjpeg libpng
```

##### Ubuntu
- libjpeg, libpng

```
apt-get install -y libjpeg libpng
```

#### 2. yarnとgitで導入
新しいフォルダーを作成し、以下の操作をしてください。

```
git init
git remote add upstream https://github.com/tamaina/tamaina.github.io.git
git fetch upstream
git checkout src
npx yarn install
git worktree add docs master; git worktree add pages pages
```

### 2. ビルド

### 普通のビルド
```
npx gulp
```

一般的なビルドです。

### ページのみビルド
```
npx gulp pages
```

ページのみを変更した場合は`npx gulp pages`をします。distの一掃やスタイルやスクリプトの生成・更新をしないので、速くビルドできます。

### ローカルで確認
ローカルサーバーを立てて内容を事前に確認できます。`.config/debug-override.yml`で設定できます。

`npx gulp local-server` を実行し、緑色で表示されたlocalhostを含むアドレスにアクセスします。

### 公開する
GitHub Pagesを使って自分のサイトとして公開してみましょう。

1. GitHubでリポジトリを作成します。
2. `.config/default.yml`を編集し、自分のサイトの設定に合わせます。 
3. `package.json`も編集します。
4. `git remote add origin (git url).git`
5. **独自ドメインにする場合、**`theme/static`に`CNAME`という名前のファイル（拡張子なし）を作成し、中身は自分が公開したいドメインを書きます（例: `maqz.example.com`）
6. ビルド `npx gulp`
7. `.\pushAll.bat "コミットコメント"`（コミットコメントにはわかりやすいものに）
8. 実際にアクセスして確認してみましょう。 

### 画像の登録（圧縮）
maqzでは、画像は原則縮小・圧縮することになっています。

filesフォルダー以下に置いたファイルには圧縮がかかります。  
`theme/static/`に置いたファイルは圧縮されません。

設定は`./config/images.yml`で行います。

#### 画像を追加
```
gulp image -i <glob-readable-path>
```

ラスター画像（png, jpegなどのビットマップ画像）は以下のようになります（設定で変更可）。  
- `/files/images/imports/yyyy/mm/{name}.{ext}` - 横幅が1200px以下で同系式（圧縮はする）
- `/files/images/imports/yyyy/mm/{name}.webp` - 横幅が1200px以下でwebp
- `/files/images/imports/yyyy/mm/{name}.720.{ext}` - 横幅が720px以下で同系式（圧縮はする）
- `/files/images/imports/yyyy/mm/{name}.720.webp` - 横幅が720pxのwebp
- `/files/images/imports/yyyy/mm/{name}.360.{ext}` - 横幅が360px以下で同系式（圧縮はする）
- `/files/images/imports/yyyy/mm/{name}.360.webp` - 横幅が360pxのwebp

SVGも圧縮しますが、png化などは行いません。

#### すべての画像を再圧縮
```
gulp image-prebuildFiles
```

files以下の画像をすべて圧縮しなおします。圧縮の設定

## ページを編集する
ページを編集するには、`pages`フォルダー以下にmarkdown(.md)、pug(.pug)、html(.html)を配置します。通常はこのディレクトリ構造のままファイルが公開されることでしょう。

ファイルの先頭の`---`で囲んだ範囲をFrontMatterといい、Yaml形式でページに関する設定を行えます。  
たとえば、`title`はページのタイトル、`description`はページの短い説明、`theme`は使用するテンプレート（後述）を指定します。

pugファイルであれば、自身のFrontMatterは`page.attributes`から参照できます。

## テーマを編集する
`theme`フォルダーにテーマがあり、編集できます。

### HTML(pug)
`templates`フォルダーにはテンプレートを配置します。  
この中にあるどのファイル名のpugを利用するかをFrontMatterの`theme`で決定できます。  
指定しなければ、または存在しなければ`default.pug`で処理を行います。  
ampはamp_を付加したものを利用します。  
ページをhtml化したものは`mainHtml`として格納されています。

`includes/_mixins.pug`, `includes/_script.pug`はページのpugをHTMLにするときに先頭に付加されます。

`.config`フォルダー内の設定は`site`にまとめて格納されています。

また、`scripts/builder/registerer/base.js`を編集することでデータを簡単に追加できます。

### スタイル (styl, sass)
sass形式で書かれています。main.jsを読みます。

### JavaScript
サイトに挿入するJavaScriptです。main.sassを読みます。ampはamp_mainを読みます。

## サイトを公開する
1. `.config/default.yml`を公開条件に合わせて編集する
2. ビルドする
3. `docs`フォルダーもしくは`docs`ブランチを公開する


## Note

### worktreeの追加

1. 
  * （既存の{basebranch}ブランチを親として利用）`git checkout -b {basebranch}; git checkout {basebranch}`
  * （親をもたない新規ブランチを作る）念のため新たな作業フォルダーにcloneして`git checkout --orphan {branch}`→すべてのフォルダーを消去→`git push origin {branch}`
2. `git checkout master`
2. `git worktree add {path} {branch}`
3. `cd {path}`
4. 不要なファイルを消去
5. `git push --set-upstream origin {branch}`（set-upstreamを指定してあると、`git pull/push`などで明示的にリモートを指定する必要がなくなる）

worktreeについて他のコマンドを調べるには`git worktree -h`でヘルプを表示

## ライセンス
CC0
