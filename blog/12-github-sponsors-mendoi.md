---
title: GitHub Sponsorsは面倒くさくない！
description: GitHub Sponsorsの申請で個人的に引っかかった点をまとめました。
layout: blog
category: Money
thumbnail: /files/images/imports/2019/08/P_20190812_114755a.jpg
date: 2020-01-07T17:01:00+09:00
author:
  name: aqz
  url: https://yuzulia.xyz/@aqz
  avatar: aqz
amp: true
---
GitHub Sponsorsの手続きが面倒臭かったけど今になってみればそこまで面倒じゃないと思っています。

※ただの愚痴です。あと英語がだめなので間違ったことを書いているかもしれませんがご了承ください。

## まえがき
この文章は**日本国籍を持つ日本人向け**に書いています。それ以外の方がこの記事の内容を実行したとしても私は責任を負えませんし、日本国籍を持つ日本人であっても私は責任を負えません。

### 必要だったもの
- 顔写真付き証明書（後述）
- 個人番号（マイナンバー）
- 英語力（ちょっと）

## 本人確認が顔写真付き証明書のみ　
GitHub Sponsorsの銀行口座へのはStripeを使いますが、本人確認は**顔写真付き証明書しか**受け付けていません。

別に持っていればたいしたことないのですが、私はそういうものを持っていなかったので、今後のためにも**個人番号カード**を作成しました。  
以下のリストに個人番号カード（マイナンバーカード）は載っていませんが、ちゃんと通りました。ケースをした状態で通りました（ケースを外した状態だと通らない可能性がありますし、そもそもマイナンバーで通ったのがまぐれかもしれません）。

> 有効な身分証明書：
> 
> - 運転免許書
> - パスポート
> - 外国国籍を持つ方の場合は在留カード
> - 住基カード（顔写真つきのみ）
>
> ―― [パスポートや運転免許証のスキャンをアップロードするのはなぜですか?](https://support.stripe.com/questions/jp-why-do-i-need-to-upload-a-scan-or-photo-of-my-passport-or-driver-s-license)

## W-8BENの入力でひと悶着
`Fill out a tax form`がクソめんどいです。というか他の人の記事を見るとこの手順はないのですが、これはいったいどこから湧いてきたんでしょう……？  
とにかく、これを書かないことには先に進めません。

![Fill out a tax form](/files/images/imports/2020/01/kimon.png)

収入が発生する以上は所得税を払う必要があります。~~GitHub Sponsersにおいてこの所得税の支払い方というのが[**米国での源泉徴収**](https://help.github.com/ja/github/site-policy/github-sponsors-additional-terms#43-sponsored-developer-payment-exclusions)であるようです。~~[（訂正: 源泉徴収はされません）](https://help.github.com/ja/github/supporting-the-open-source-community-with-github-sponsors/tax-information-for-github-sponsors)

まず、申し込み時にGitHubからDocuSignにて**W-8BEN**フォームの記入と署名を求められます。  
この書類自体難しいことはありません。**[記入方法はこちらのDiG DUGさんの記事を参考にしてください。](https://stockillust.com/archives/270)**

このフォームの**5 U.S. taxpayer identification number (SSN or ITIN)**（*訳: 米国納税者識別番号 （SSNもしくは<b>[ITIN](https://jp.usembassy.gov/ja/u-s-citizen-services-ja/itin-ja/)</b>）*）が赤い必須の枠になっている場合があります。私の場合がそうでした。

私のような日本に住んでいる一般的な日本人は、SSNやITINを持っていませんし必要ありません。  
これはW-8BENフォームの意図するところでもあるのですが、DiG DUGさんの記事にもあるように、ふつうは<u>**5**を空欄にして**6**に（日本人なら）**個人番号**（マイナンバー）</u>を埋めます。  
でも、それではDocuSignでダメって言われます。

じゃあどうすればいいんでしょう。

私の場合、<u>[GitHubのサポート](https://www.nta.go.jp/taxes/shiraberu/taxanswer/shotoku/1240.htm)に連絡を取って**6**が必須なフォームに変更してもらいました</u>。

次のような内容を[GitHubのコンタクトフォーム](https://support.github.com/contact)で送信すれば変えてくれるんじゃないかと思います。  
文を例示してはいますが、**私はそこまで英語に明るくない**のでこれを送って変なことになっても責任は負えません。

----

**Subject**: Please change my W-8BEN form

**How can we help?**:  
To whom it may concern,

In order to submit the application of my GitHub Sponsors profile, I am filling in the details, but I've been having trouble with filling out W-8BEN form.

It is required to fill SSN or ITIN in line 5, but I want to fill the individual number, the taxpayer identification number of Japan, in line 6 instead of filling in line 5.  
So please replace my form with one that requires filling in not line 5 but line 6.

Thank you.

○○（←自分の名前（GitHub名でよい）を入れる）

----

GitHubのサポートは返信が早いと評判なので、返信は1日待たずに来るのではないでしょうか。

変えてくれたって返信が来たら多分変わっているはずなので、もう一度`tax form`リンクを開いて記入しなおします。  
**6**が赤枠になっているので、そこにマイナンバーを埋め、[完了]を押します。これでW-8BENフォームの記入は片付きました！

### ちなみに、5を埋めようとすると……
**SSN**とは、社会保障番号と訳され、日本人の個人番号に類するものです。米国市民に配られ、私のような日本人には全く縁のない番号です。  
いっぽう**ITIN**は、（米国にとっての）外国人の納税申告用の番号です。SSNに対応するもので、私のような日本人をはじめとするSSNを持つ資格のない人に対して米国の税務当局「内国歳入庁（IRS）」が割り当てています。

ITINの申請は、[申請書W-7](https://www.irs.gov/forms-pubs/about-form-w-7)を書き（申請事由は恐らく上から2番目）、パスポートや免許証等の証明書を添付して郵送する必要があります。  
証明書の添付方法として、（1）オリジナルを添付する、あるいは（2）証明済（certified）コピーを添付するという2つの方法があります。  
60日以内に返ってくるとはいえさすがに国際郵便でオリジナルを添付するのはあり得ないので、証明済コピーを添付するのが当然と思います（てか国内郵便でも怖いわ）。公証役場に行って証明書のアポスティーユ付きのコピーを貰えばいいのではないでしょうか。

IRSによると申請から発行までは通常7週間かかるらしいです。
