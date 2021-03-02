---
title: Fediverseへのいざない
description: 分散SNSで自分に合ったインターネットライフを。
layout: blog
Tag: Misskey
category: Computer
thumbnail: /files/images/imports/2019/03/FEDIVERSE.png
date: 2019-03-15T13:15:00+09:00
author:
  name: aqz
  url: https://c2.a9z.dev/@aqz
  avatar: aqz
amp: true
---
この記事では、MisskeyやMastodonなどの分散SNSについて、その仕組みと利点を簡潔に紹介します。  
分散SNSは連合型SNSなどとも呼ばれます。

## 概要
分散SNSは、インスタンス内でコミュニティをつくりながら、その中で他のインスタンスのユーザーをフォローし、また他のインスタンスの投稿にいいねを付けたり再拡散（Twitterでいうところのリツイート）できたりします。  
また、分散SNSにはストリーミングや公開範囲の指定など、Twitterより優れている機能があります。

## 「連合」とは？
![Fediverseのイメージ](/files/images/imports/2019/03/FEDIVERSE.svg)

分散SNSのイメージはだいたい上図のような感じです（少し適当に描きすぎたかもしれません）。  
MisskeyやMastodonなどの分散SNSソフトは、「ActivityPub」という標準規格に準じてほかのサーバーと通信を行います。  

分散SNSソフトがインストールされたサーバーは**インスタンス**と呼ばれます。

ActivityPubの通信では、ほかのサーバーのユーザーをフォローしたり、ほかのサーバーの投稿を取得したりできます。  
このActivityPubを使うことで、他のサーバーに登録することなく他のサーバーの投稿を見て反応したりユーザーをフォローしたりできるのです。

無数のインスタンスが関係しあって形成される分散SNSの世界は**Fediverse（フェディバース）**と呼ばれます。FediverseはFederate（連合）とUniverse（宇宙）を組み合わせた造語です。

### 分散SNSソフトの例
ActivityPub規格は[W3Cが勧告している](https://www.w3.org/TR/activitypub/)規格であるため、分散SNSソフトは多く存在します。その中から日本で主に使われているソフトをご紹介します。

- [**Mastodon**](https://joinmastodon.org/)  
  Twitter/Facebookタイプ。[mstdn.jp](https://mstdn.jp), [pawoo.net](https://pawoo.net), [best-friends.chat](https://best-friends.chat)といった大規模インスタンスはMastodonで動いています。分散SNSの中ではもっとも普及しており、モバイルアプリなど多くの資産もあります。開発者は[Eugen Rochko (Gargron)氏](https://mastodon.social/@Gargron)。
- [**Pleroma**](https://pleroma.social/)  
  Twitterタイプ。日本で有名なインスタンスはあまり見かけませんが、分散SNSの中では2番目に普及しているようです。開発者は[lain氏](https://pleroma.soykaf.com/users/lain)。
- [**Misskey**](https://join.misskey.page/)  
  国産のTwitterライクな分散SNS。[misskey.io](https://misskey.io)は、開発者が運営するMisskeyでもっとも大きなインスタンスです。他のソフトに比べ、見た目や機能が優れています。2014年から存在し、近年ActivityPubが実装されました。開発者は[しゅいろ氏](https://misskey.xyz/@syuilo)。
- [**Dolphin**](https://github.com/syuilo/dolphin)  
  Misskeyの姉妹ソフトで、おひとり様インスタンス向けに軽量化されています。こちらもしゅいろ氏が開発しています。
- [**PixelFed**](https://pixelfed.org/)  
  Instagramタイプ。開発者は[Dansup氏](https://mastodon.social/@dansup)。
- [**PeerTube**](https://joinpeertube.org/)  
  YouTubeタイプ。[Blender財団がインスタンスを開設](https://video.blender.org/)したことを[ニュース](https://gigazine.net/news/20180621-blender-switch-youtube-to-peertube/)で目にした方もいるかもしれません。開発者は[Chocobozzz氏](https://framapiaf.org/@Chocobozzz)。

## 分散SNSにありがちな便利機能
多くの分散SNSで利用できる便利な機能をご紹介します。このほかにもTwitterより利便性が増した機能もあります。

### 文字数制限が緩い
Mastodonの文字数制限はふつう500文字です。  
Misskeyの文字数制限はインスタンスによって異なりますが、1000文字以上の場合が多いです。

### ローカルタイムライン
主要な分散SNSソフトには、インスタンス内のすべての公開投稿を見られるタイムライン「ローカルタイムライン」が存在します。  
同じインスタンス内のユーザーなら、フォローしあうことなく近況を知ることができます。

### 公開範囲
投稿の公開範囲を細かく設定できます。見せたい人にだけ見せる、公開したいときは公開する、をきっちり分けられます。

分散SNSの鍵アカウントはすべての投稿が非公開になるわけではなく、フォローを制限するだけです。

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

## 自分でSNSを運営できる
自分でSNSを運営できるということは、そのすべてを自分で判断できるということです。  
TwitterやFacebook、YouTubeなどの運営方針や時に理不尽な決定に左右されず、あなたの思想や作品を自由に公表できます。より自由なAPIを活用し、さらに便利な連携アプリも作成できます。

ただし、サーバーを維持するために少なくない対価を払う必要がありますし、自由になる代わりに自分の判断に責任をもつ必要があります。  
でも安心してください。分散SNSには、管理者を補助する機能も十分に備わっています。

## さっそく始めてみませんか
分散SNSは、便利でストレスが少ないSNSであることがお分かりいただけたでしょうか。

まずはどこかのインスタンスでアカウントを登録し、使い始めてみてください。

また、ぜひご自身のコンテンツ向けのインスタンスを作ってみてください。  
新規登録を停止して自分だけのインスタンスを作ることもできます。

## のぞいてみよう
Fediverseのインスタンスがどういう、のぞいて雰囲気を見てみましょう！

[国見小道さんの『Mastodonサーバー紹介 2019/11/14版』](https://express.komittee.net/posts/my-recommending-mastodon-server-20191114/)を見て、Mastodonインスタンスを探してみましょう。

Misskeyを紹介するサイト『Misskeyをはじめよう (joinmisskey)』では[Misskeyインスタンスのリスト](https://join.misskey.page/ja/wiki/instances/)を掲載しています。このリストはMisskeyのバージョン順をもとに並べられています。

さらにインスタンスを探したい方は[distdn.orgの『Mastodon インスタンスリスト アクティブ順』を使ってみてください。](http://distsn.org/instance-speed.html)
