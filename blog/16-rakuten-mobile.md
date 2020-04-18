---
title: Rakuten Mobileが来た
description: MVNOからMNOに移行しました。
layout: blog
category: Computer
thumbnail: /files/images/imports/2020/04/rakuten-mobile.png
date: 2020-04-19T02:00:00+09:00
author:
  name: aqz
  url: https://yuzulia.xyz/@aqz
  avatar: aqz
amp: true
---
楽天モバイル（Rakuten Mobile）をMVNOからMNOに移行してみました。  
公式サイト: https://network.mobile.rakuten.co.jp/

![](/files/images/imports/2020/04/rm-1.jpg)

4/13公開の記事を再構成・分割・加筆しました。  
この記事では価格をすべて税込で記載します。

## おしらせ
4/19現在、楽天モバイルではMVNOと同じく紹介キャンペーンを行っており、紹介者のIDを申し込み時に入力すると紹介された方に**2000ポイント**がもらえます。

私のIDは`2020040803433`ですので、お申し込みの際にぜひ入力していただけると嬉しいです。

キャンペーン詳細: https://network.mobile.rakuten.co.jp/campaign/introduction/

## まとめ
- 申し込みからSIM到着までは早い
- MVNO殺しか？
- 対応端末はMVNOとは違うから気を付けて
- 通話で問題が発生……[解決しました！](16-2-rakuten-link-wifi)
- サポートが炎上中、サポートがクソなのが嫌な人はあきらめて
- まだ待ったほうがいいけれど、契約を前提に考えてみてはいかがかなと

## 楽天モバイル 【Rakuten UN-LIMIT 2.0】 サービス概要
既報の通りですが、まとめてご紹介します。

楽天モバイルのプランは[「Rakuten UN-LIMIT 2.0」](https://network.mobile.rakuten.co.jp/fee/un-limit/)ただ1つのみで、**月額3,278円**（税抜2,980円）です。  
契約時に契約事務手数料3,300円がかかります。

海外の話はここでは取り上げませんが、海外旅行者的にもかなり安く利用できる値段設定のようです。

4/19現在、キャンペーンとして、

- 月額利用料が1人1回線のみ300万人限定で1年間無料
- 3,000ポイント【オンライン契約 + Rakuten Link認証】[*](https://network.mobile.rakuten.co.jp/campaign/online-application-3000pt/)
- 3,300ポイント【Rakuten Link認証】[*](https://network.mobile.rakuten.co.jp/campaign/point-return/)
- 2,000ポイント【紹介者ID入力（先述）】[*](https://network.mobile.rakuten.co.jp/campaign/introduction/)
- 対象端末セット購入の場合5,000～14,500ポイント[*](https://network.mobile.rakuten.co.jp/campaign/start-point/)

があります。  
ここでいうポイントはもちろん楽天ポイントのことです。

- 楽天回線内では、**容量無制限**。
  * ただし制限はある模様。現状1日10GBがひとつの目安のようで、1Mbpsに制限されて日付が変わると制限が解除されるらしい。
- パートナー（KDDI）回線では、5GBまで高速通信を利用可能で、低速は1Mbps。
  * 楽天独自の回線はまだ整備途中で、楽天の電波の届かない場所はパートナー（KDDI）回線を利用できるようになっています。
  * 「my 楽天モバイル（管理画面）」にて**高速と低速を任意に切り替え可能。**素晴らしい。
  * 高速容量5GBは4/22からでそれまでは容量2GB。4/22になると自動加算されるらしい。
  * 550円/1GBで高速容量（所謂【ギガ】）を追加（データチャージ）可能。  
    ちなみに、高速容量を買い足したとしても、他のMNOのライトプランより圧倒的に安いです。  
    MVNOとも勝負できると思います（後述）。
  * KDDI = auです。UQモバイルもKDDIですし、楽天MVNOでもau回線が提供されていました。
- 通話とSMSは専用RCSアプリ[「Rakuten Link」](https://network.mobile.rakuten.co.jp/service/rakuten-link/)でします。
  * **Link経由での通話・SMSは無料です！**
  * MNOとしては日本初のWi-Fi Callingサービスで、Wi-FiがあればLTE圏外でも通話・SMSができます。
  * 通常のSMSは他3MNOの相互利用可能ですが、RCS「+メッセージ」とは相互利用不可能。
  * 現状Androidのみで提供。
- 電波はバンド3（1.7Ghz帯）のみ。
  * Softbankはプラチナバンドを得るまでは繋がりにくいという評判でした。楽天モバイルも同様かと思われます。  
  * 周波数の再割り当てをして楽天モバイルにもプラチナバンドを免許するべきだと私は考えます。
- SIMカードのほかにeSIMを利用可能
  * MNOとしては日本初でeSIMを提供しています。
  * 現状サポートされているのはRakuten Miniだけです。
  * eSIMに対応するiPhoneは動作保証外で、現状Linkが利用できません。動作状況はググれば出てくるはず。
  * eSIMに対応するPixelは動作保証外です。動作状況はググれば出てくるはず。

## 価格比較
価格は他社と比べてどうなのでしょうか。  
[価格比較を別の記事で紹介しているので、ぜひお読みください。](16-3-rakuten-mobile-price)

## 申し込みからSIM到着まで
私の場合、申し込みからSIM到着までは次のような経過でした。

| 4月 |||
|:--:|:--|:--|
|8日|12時|MVNOのメンバーズステーションで移行手続き|
||15時|本人確認書類不備のメールが届く<br>スキャンしたものを提出したら駄目と言われました。スマホで写真を撮って送りましょう。|
||||
|9日|0時|本人確認書類の写真を撮ったものを再提出。申し込みし直しという形になりました。|
||||
|10日|23時|ヤマト運輸でSIMが発送される|
||||
|11日|19時<br>（時間指定）|自宅で受け取り|

申し込みの情報に不備がなければ、申し込みから3日程度でSIMが届くようです。

![](/files/images/imports/2020/04/rm-2.jpg)

![](/files/images/imports/2020/04/rm-3.jpg)

MVNOの移行ページで移行しようとしたところ、エラーで正しく申し込めませんでしたが、メールで届いたMNP番号を利用して申し込みました。  
今は改善されているものと思われます。

## MNP転入
到着してすぐにMNP転入しようとしました。

新しいSIMを刺してから転入ボタンを押しました。これが悪かったのか、その日の夜は接続ができませんでした。  
翌日、端末を再起動したら接続できました。

新しいSIMを刺す前に転入をしないといけません。  
前にもやらかしたのですが、学習してませんね……。

## Linkでの通話に問題発生
Linkでの通話に問題が発生したのですが、Wi-Fiルーターの設定を弄って解決しました。

[Linkの問題については別途記事を参照ください。](16-3-rakuten-link-wifi)

## 速度は？
速度はどうでしょうか。

筆者は群馬県民だし、わざわざ東京に行くほどでもないわけなので、**パートナー（KDDI）回線でしか計測していません。**  
使用端末はAQUOS sense3 lite (SH-RM12)です。

### my 楽天モバイルアプリで計測
2回のみの適当な場所での計測なのですが、十分な結果だと思います。

![](/files/images/imports/2020/04/rm-kddi.png "2020/4/12 11:41 下り11.9Mbps / 上り5.1Mbps")

![](/files/images/imports/2020/04/rm-kddi2.png "2020/4/14 16:16 下り16.0Mbps / 上り5.1Mbps")

my 楽天モバイルアプリでは速度計測もできます。

### 速度制限（1Mbps）時は？
ノートパソコンでテザリングし、Windowsタスクマネージャーで通信状況を確認したところ、安定した1Mbpsとなっていました。  
ちなみにテザリングは無料で利用できます。そもそも有料のほうがおかしいと私は思います。

![](/files/images/imports/2020/04/rm-1mbps.png "Rakuten UN-LIMIT 2.0 テザリング時の通信状況グラフ")

スーパーホーダイ（MVNO）の1Mbpsといえば、実はこうではありませんでした。  
「しばらく通信していると128Kbps前後に落ちる」という感じで、安定した通信ではありませんでした。  
楽天モバイルではなくdocomo側の問題だったのかもしれませんが、これでは大きいファイルのダウンロードのダウンロードが事実上不可能で、かなり問題のある挙動でした。

![](/files/images/imports/2020/04/rm-mvno.png "スーパーホーダイ テザリング時の通信状況グラフ")

画像ののアクセスポイント名が別の端末になっていますが、これはテザリングのアクセスポイント名を引っ越したまま変更していないためです。

## 楽天モバイル、対応機種は？
公式にサポートしているのは[楽天モバイルで販売している機種](https://www.rakuten.ne.jp/gold/rakutenmobile/un-limit/product/)もしくは[別途掲載されている機種](https://mobile.rakuten.co.jp/news/service_20200303/)に限られています。

インターネットの噂話では、Band3（楽天回線のLTEバンド）とBand18（パートナー（KDDI）回線のLTEバンド）に対応している機種であれば繋がるのではないかということです。  
このような機種にはAPN情報が登録されていない場合が多いらしいのですが、楽天モバイルは親切にも[APN情報を公開](https://network.mobile.rakuten.co.jp/faq/detail/00001495/)しているので、その場合はこれを設定すればよいようです。  
あくまで自己責任でやってください。私含め誰も責任を負いません。

参考:  
[au SIMロック解除可能機種の実装周波数表](https://www.au.com/support/service/mobile/procedure/simcard/unlock/compatible_network/)  
[SoftBank SIMロック解除可能機種の実装周波数表](https://cdn.softbank.jp/mobile/set/common/pdf/support/usim/unlock_procedure/frequency-band-list.pdf)  
[docomo SIMロック解除可能機種の実装周波数表](https://www.nttdocomo.co.jp/binary/pdf/support/unlock_simcard/band.pdf)

## 楽天ひかりとRakuten Casa
楽天モバイルMNO正式サービスにあわせて、楽天ひかりの販促が積極的になり、記事執筆現在キャンペーンも実施しています。

[楽天ひかりとRakuten Casaについてこちらの記事でまとめました。](16-4-rakuten-casa)

## いかがでしたか？
いかがでしたか？

楽天モバイル「Rakuten UN-LIMIT 2.0」、私的には、あともうちょっとだけ程度様子見して申し込んだほうが良いと思います。

最後に三言だけ。  
楽天MVNOから移行した人は古いSIMの返却を忘れないようにしましょう！  
役に立ったと思ったらBraveでチップを送っていただけると幸いです。  
記事の拡散もお願いします。ありがとうございました。

最終更新: 2020/4/18

投票やってました。  
「Rakuten UN-LIMIT 2.0の戦果はどうなると思いますか？」  
https://c2.a9z.dev/notes/860tkq9yvj
