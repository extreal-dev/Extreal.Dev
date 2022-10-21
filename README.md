# Extreal.Dev

このユニティプロジェクトは Extreal のフレームワーク開発用です。
静的解析が導入されています。

## ローカル開発

1. この Git リポジトリをローカルにクローンします
1. `Packages` ディレクトリ以下に開発したいモジュールの Git リポジトリをクローンします
1. Unity Editor を開いて `Packages/Extreal.*/Runtime/Extreal.*.asmdef` を選択し、Inspector の中の `Assembly Definition References` に `Extreal.Framework.Analyzer` を追加します（ただし * はモジュール名に対応）

以上でセットアップは終了です。

## コントリビュータへ

フレームワークの各モジュールにコントリビュートするときは `develop` ブランチから新たなブランチを切ってください。

<ブランチ名の例>

- 機能を追加するとき
  - feature/<機能名>
- バグ修正をするとき
  - bugfix/<バグの概略>
