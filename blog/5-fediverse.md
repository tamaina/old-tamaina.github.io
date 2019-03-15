---
title: Fediverseへのいざない――自分だけのSNSを持ってみないか？
description: 自分でSNSを持ってみるのはどうでしょうか？MastodonやMisskeyを自分で持ってみましょう！VTuberさんにもお勧めかも？
layout: blog
category: Misskey
thumbnail: /files/images/imports/2019/03/FEDIVERSE.png
date: 2019-03-15T13:15:00+09:00
author:
  name: aqz
  url: https://twitter.com/aqzvy
  avatar: aqz
---
MastodonやMisskeyなどの連合型SNSについて、その仕組みと利点を簡潔に紹介したいと思います。  
連合型SNSは分散型SNSとも呼ばれます。

## 先に結論を言え？
- 自分でSNSを運営しながら、その中で外部との交流もできる。
- Twitterより優れている機能がある。

興味が湧きましたか？それなら、詳しく見ていきましょう。

## 「連合」とは？
![Fediverseのイメージ](/files/images/imports/2019/03/FEDIVERSE.svg)

連合型SNSのイメージはだいたい上図のような感じです（少し適当に描きすぎた感はあります）。  
MastodonやMisskeyなどの連合型SNSソフトは、「ActivityPub」という標準規格に準じてほかのサーバーと通信を行います。  
ActivityPubの通信では、ほかのサーバーのユーザーをフォローしたり、ほかのサーバーの投稿を取得したりできます。  
連合型SNSでは、他のサーバーに登録することなく、他のサーバーの投稿を見て反応したりユーザーをフォローしたりできるのです。

### 用語
連合型SNSソフトがインストールされたサーバーは**インスタンス**と呼ばれます。  
無数のインスタンスが関係しあって形成される連合型SNSの世界は**Fediverse（フェディバース）**と呼ばれます。FediverseはFederate(連合)とUniverse(宇宙)を組み合わせた造語です。

### 連合型SNSソフトの例
ActivityPub規格は[W3Cが勧告している](https://www.w3.org/TR/activitypub/)規格であるため、連合型SNSソフトは多く存在します。その中から日本で主要なソフトをご紹介します。

- [**Mastodon**](https://joinmastodon.org/)  
  Twitter/Facebookタイプ。[mstdn.jp](https://mstdn.jp), [pawoo.net](https://pawoo.net), [friends.nico](https://friends.nico)といった大規模インスタンスはMastodonで動いています。連合型SNSの中ではもっとも普及しており、モバイルアプリなど多くの資産もあります。開発者は[Eugen Rochko (Gargron)氏](https://mastodon.social/@Gargron)。
- [**Pleroma**](https://pleroma.social/)  
  Twitterタイプ。日本で有名なインスタンスはあまり見かけませんが、連合型SNSの中では2番目に普及しているようです。開発者は[lain氏](https://pleroma.soykaf.com/users/lain)。
- [**Misskey**](https://joinmisskey.github.io/)  
  国産のTwitterライクな連合型SNS。[misskey.xyz](https://misskey.xyz)は、開発者が運営するMisskeyでもっとも大きなインスタンスです。他のソフトに比べ、見た目や機能が優れています。2014年から存在し、近年ActivityPubが実装されました。開発者は[しゅいろ氏](https://misskey.xyz/@syuilo)。
- [**PixelFed**](https://pixelfed.org/)  
  Instagramタイプ。開発者は[Dansup氏](https://mastodon.social/@dansup)。
- [**PeerTube**](https://joinpeertube.org/)  
  YouTubeタイプ。[Blender財団がインスタンスを開設](https://video.blender.org/)したことを[ニュース](https://gigazine.net/news/20180621-blender-switch-youtube-to-peertube/)で目にした方もいるかもしれません。開発者は[Chocobozzz氏](https://framapiaf.org/@Chocobozzz)。

## 連合型SNSにありがちな便利機能
多くの連合型SNSで利用できる便利な機能をご紹介します。このほかにもTwitterより利便性が増した機能もあります。

### 文字数制限が緩い
Mastodonの文字数制限はふつう500文字です。  
Misskeyの文字数制限はインスタンスによって異なりますが、1000文字以上の場合が多いです。

### ローカルタイムライン
主要な連合型SNSソフトには、インスタンス内のすべての公開投稿を見られるタイムライン「ローカルタイムライン」が存在します。  
同じインスタンス内のユーザーなら、フォローしあうことなく近況を知ることができます。

### 公開範囲
投稿の公開範囲を細かく設定できます。見せたい人にだけ見せる、公開したいときは公開する、をきっちり分けられます。

連合型SNSの鍵アカウントはすべての投稿が非公開になるわけではなく、フォローを制限するだけです。

### NSFW
画像を**NSFW**（Not Safe for Work; 職場での閲覧は危険）に指定すると、1回クリックしないと見られないようになります。  
公共の場で見る人に配慮しながら、えっちな画像や飯テロ画像などを公開できます。 [NSFWの例 (Misskey)](https://misskey.xyz/notes/5c8b14e029962e002eef3678)

![NSFW](/files/images/imports/2019/03/NSFW.png "NSFW")

### CW
投稿の**CW**（Content Warning; 内容に注意）を有効にすると、本文のテキストを警告文付きで隠すことができます。
不適切な内容の文やタイムラインで邪魔になるくらいの長文を投稿するときなどに便利です。 [CWの例 (Misskey)](https://misskey.xyz/notes/5c8b14ac15a7be002771b2c1)

![CW](/files/images/imports/2019/03/CW.png "CW")

### タイムラインのストリーミング
タイムラインが自動的に更新されるのは当たり前のことです（といいながら、Pleromaでは利用できません）。  
Twitterではなくなってしまったストリーミングを利用できます。

## 自分でSNSを運営できる！
自分でSNSを運営できるということは、そのすべてを自分で判断できるということです。  
TwitterやFacebook、YouTubeなどの運営方針や時に理不尽な決定に左右されず、あなたの思想や作品を自由に公表できます。より自由なAPIを活用し、さらに便利な連携アプリも作成できます。

しかし、サーバーを維持するために少なくない対価を払う必要がありますし、自由になる代わりに自分の判断に責任をもつ必要があります。  
安心してください。そのために、連合型SNSは管理者を十分に補助する管理・モデレーション機能を持っています。

## 自分自身のSNSを持つ喜び
連合型SNSを使うと、より便利に、より楽しくインターネットで活動できることがお分かりいただけたでしょうか。

まずはどこかのインスタンスでアカウントを登録し、使い始めてみてください。

そして、ぜひご自身のコンテンツ向けのインスタンスを作ってみてください。  
新規登録を停止して自分だけがインスタンスを利用することも可能です。

## のぞいてみよう
Fediverseのインスタンスがどんな感じなのか、のぞいて雰囲気を見てみましょう！  
[ほかのインスタンスも探してみる (distdn.org Mastodon インスタンスリスト アクティブ順)](http://distsn.org/instance-speed.html)

- [**特務機関NERV**](https://unnerv.jp)  
  Twitterでもお馴染みの、生活情報を速報する謎に包まれた機関。
- [**ますとどんちほー**](https://mstdn.kemono-friends.info/about)  
  けものフレンズのテーマインスタンス。
- [**アスタルテ**](https://kirishima.cloud)  
  [霧島ひなた](https://kirishima.cloud/@Kirishimalab21)氏を中心としたインスタンス。Mastodonだが、多くの改造が加えられている。
- [**:don: (通称:末代鯖)**](https://mstdn.maud.io)  
  末代を自称するギークな人々が集まっている。
- [**幻想街　〜 Gensokyo.Town**](https://gensokyo.town/)  
  東方Projectのテーマインスタンス。
- [**im@stodon**](https://imastodon.net)  
  アイドルマスターのテーマインスタンス。
- [**twista**](https://twista.283.cloud)  
  シャニマス（アイドルマスター シャイニーカラーズ）のテーマインスタンス。
