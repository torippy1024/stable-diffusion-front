# 概要

Next.js +α の自分用テンプレート

- Next.js
- TypeScript
- Tailwind CSS
- daisyUI
- ESLint / prettier
- husky / lint-staged
- Vercel
- NextAuth.jsによる認証
- NextAuth.jsによるトークン取得
- react-burger-menuによるハンバーガーメニュー

# テンプレートの解説（自分で一から構築したい人向け）

https://qiita.com/torippy/private/68e3bd542694a6a24e67

# 使い方

- まず[import repository](https://github.com/new/import)で本リポジトリ(https://github.com/hiroto-toriyama/web-template )をimportして新しいリポジトリを作成

## Vercel その１

- [Vercel](https://vercel.com/new)で新規プロジェクトを作成
- 対象のGitHubリポジトリをimport
- デフォルトの設定でDeploy
- デプロイ完了を確認＆デプロイURLをメモ

## GitHubのOAuthApps

- [GitHubのDeveloper settings](https://github.com/settings/developers)から新しいOAuthAppを開発環境用と本番環境用の2つ作成
  - 開発環境用の callback URL は http://localhost:3000/api/auth/callback/github
  - 本番環境用の callback URL は [デプロイURL]/api/auth/callback/github
- Client ID と Client secrets をメモ

## Git/ローカル操作 その１

- リポジトリをローカルにclone
- nextjs に checkout
- .env.localを作成
  - NEXTAUTH_SECRET=[https://generate-secret.vercel.app/32 で作成されたランダムな文字列]
  - NEXTAUTH_CREDENTIAL_HASH=[[SHA512ハッシュ生成ツール](https://www.milk-island.net/javascript/hashgenerator/sha2_512.html)で、previewデプロイ時に使いたいパスワードをハッシュ化した文字列]
- .env.development.localを作成
  - GITHUB_ID=[開発環境用の Client ID]
  - GITHUB_SECRET=[開発環境用の Client Secrets]
- .env.production.localを作成
  - GITHUB_ID=[本番環境用の Client ID]
  - GITHUB_SECRET=[本番環境用の Client Secrets]

## Vercel その２

- Dashboardの`Settings > Environment Variables`から環境変数を追加
  - .env.development.local は Development と Preview にチェック
  - .env.production.local は Production にチェック
  - .env.local はすべてにチェック

## Git/ローカル操作 その２
- `src/const/`の定数群を書き換える
- commit & push
- master に pull request
- previewデプロイが自動で行われるので確認
- master に merge
- 本番環境に自動デプロイ🎉
