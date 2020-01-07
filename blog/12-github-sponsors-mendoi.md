---
title: GitHub Sponsors、面倒臭い
description: ただの愚痴です。
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
GitHub Sponsorsの手続きが面倒臭い。

※ただの愚痴です。あと英語がだめなので間違ったことを書いているかもしれませんがご了承ください。

## 本人確認が顔写真付き証明書のみ　
GitHub Sponsorsの銀行口座へのはSpriteを使いますが、本人確認は**顔写真付き証明書しか**受け付けていません。

私はそういうものを持っていなかったので、今後のためにも**個人番号カード**を作成しました。  
以下のリストに個人番号カード（マイナンバーカード）は載っていません……がどうか対応していますように。

> 有効な身分証明書：
> 
> - 運転免許書
> - パスポート
> - 外国国籍を持つ方の場合は在留カード
> - 住基カード（顔写真つきのみ）
>
> ―― [パスポートや運転免許証のスキャンをアップロードするのはなぜですか?](https://support.stripe.com/questions/jp-why-do-i-need-to-upload-a-scan-or-photo-of-my-passport-or-driver-s-license)

## 米国で源泉徴収されるためクソめんどい
`Fill out a tax form`がクソめんどいです。というか他の人の記事を見るとこの手順はないのですが、これはいったいどこから湧いてきたんでしょう……？

収入が発生する以上は所得税を払う必要があり、GitHub Sponsersにおいてこの所得税の支払い方というのが[**米国での源泉徴収**](https://help.github.com/ja/github/site-policy/github-sponsors-additional-terms#43-sponsored-developer-payment-exclusions)であるようです。

まず、申し込み時にGitHubから**W-8BEN**の記入と提出を求められます。この書類自体難しいことはありません。  
しかしここで[**ITIN**](https://jp.usembassy.gov/ja/u-s-citizen-services-ja/itin-ja/)という番号を求められます。

ITINは、外国人の納税申告用の番号です。米国人の社会保障番号（SSN）に対応するもので、一般的な日本人をはじめとするSSNを持つ資格のない人に対して米国の税務当局「内国歳入庁（IRS）」が割り当てています。

ITINの申請は、[申請書W-7](https://www.irs.gov/forms-pubs/about-form-w-7)を書き（申請事由は恐らく上から2番目）、パスポートや免許証等の証明書を添付して郵送する必要があります。  
証明書の添付方法として、（1）オリジナルを添付する、あるいは（2）証明済（certified）コピーを添付するという2つの方法があります。  
60日以内に返ってくるとはいえ、さすがに国際郵便でオリジナルを添付するのはあり得ないので、証明済コピーを添付しようと思います。  
公証役場に行って、アポスティーユ付きのパスポートのコピーを貰えばいいのではないかなと思っています（未実施）。

IRSによると申請から発行までは通常7週間かかるらしいです。

とりあえずこの時点（R2/1/7）で記事を書きました。

## 結論
面倒臭いので他のサービスを利用した方がいいかと思われます。
