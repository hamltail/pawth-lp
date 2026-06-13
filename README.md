# Pawth Landing Page

Pawth の紹介・ポートフォリオ用に制作したランディングページです。

アプリのコンセプトや主要画面、設計思想をわかりやすく伝えることを目的として制作しました。

## Demo

🌐 [Pawth Landing Page](https://pawth-lp.hamltail.dev/)

## 技術スタック

* HTML5
* CSS3
* JavaScript (Vanilla JS)

フレームワークやUIライブラリは使用していません。

## CSS設計

CSSはBEMを参考にしながら、コンポーネントごとに整理しやすい命名を意識しています。

```css
.hero
.hero__title
.hero__subtitle

.screen-card
.screen-card__image
.screen-card__body

.button
.button--primary
.button--secondary
```

## なぜシンプルな構成を選んだのか

本LPは単一ページの小規模サイトであり、複雑な状態管理やコンポーネント分割を必要としません。

そのため、

* 学習コストを抑える
* ビルド環境を不要にする
* 保守しやすくする
* 読み込み速度を向上させる

ことを目的として、HTML・CSS・JavaScriptのみで構築しています。

## 実装した機能

* レスポンシブ対応
* スクロール連動フェードイン
* 画像モーダル
* ヒーロー画像クロスフェード
* ページトップへ戻るボタン

## デザイン方針

Pawthの世界観である

> 日々の足あとを描く

というコンセプトを意識し、柔らかい配色と余白を重視したデザインとしています。

また、アプリの紹介だけでなく、設計思想やUX上の意図も伝わる構成を目指しました。

## 工夫した点

* Pawth本体のコンセプトをLP上でも伝わるように情報設計を行った
* 「非採用機能」セクションを設け、設計思想が伝わるよう工夫した
* JavaScriptを用いたモーダルやアニメーションを実装し、体験向上を図った
* フレームワークに依存せず、基礎技術のみで構築した
* LPの規模に対して適切な技術選択を意識した

## ライセンス

このリポジトリは、ポートフォリオ目的で公開しています。

著作権は作者に帰属します。
無断転載・再配布・商用利用はご遠慮ください。

This repository is published for portfolio purposes only.

All rights to the content belong to the author.

Please do not reproduce, redistribute, or use any part of this project for commercial purposes without permission.

## Author

- h-waji (hamltail)
