# 研修受講者管理アプリケーション

Vue.js を用いたフロントエンドと Nuxt 3 を用いたバックエンドで構成された、研修および受講者の管理アプリケーションです。研修一覧・研修詳細・受講者一覧・受講者詳細を確認でき、ダッシュボードでサマリーを俯瞰できます。

## プロジェクト構成

```
.
├── backend/   # Nuxt 3 ベースの API サーバー
└── src/       # Vue 3 + Vue Router + Vuex フロントエンド
```

バックエンドでは静的データを返す API エンドポイントを実装しており、フロントエンドから `http://localhost:3000/api/...` にアクセスしてデータを取得します。

## 必要要件

- Node.js 18 以上を推奨
- npm

## セットアップ

それぞれのディレクトリで依存パッケージをインストールします。

```bash
# フロントエンド
npm ci

# バックエンド
cd backend
npm ci
```

## 開発サーバーの起動

バックエンド (Nuxt) を先に起動し、続いてフロントエンド (Vue CLI) を起動します。

```bash
# バックエンド
cd backend
npm run dev

# 別ターミナルでフロントエンド
cd ..
npm run serve
```

フロントエンドは `http://localhost:8080`、バックエンドは `http://localhost:3000` で動作します。必要に応じてフロントエンド側で `VUE_APP_API_BASE_URL` 環境変数を設定し、バックエンドの URL を変更できます。

## 主要機能

- **ダッシュボード**: 研修・受講者数のサマリー表示、直近研修、部署別受講状況の可視化
- **研修一覧**: 研修の詳細情報と参加予定者を一覧で確認
- **研修詳細**: 研修の概要・目標・参加予定者の詳細を表示
- **受講者一覧**: 受講者の部署や受講状況を確認し、紐づく研修を参照
- **受講者詳細**: 基本情報と受講履歴／予定を表示

## Lint & Build

```bash
# フロントエンドの lint
npm run lint

# フロントエンドのビルド
npm run build

# バックエンドのビルド
cd backend
npm run build
```

## カスタマイズ

- フロントエンド側の API ベース URL は `.env` ファイルで `VUE_APP_API_BASE_URL` として指定できます。
- バックエンドのダミーデータは `backend/server/api/data.ts` で管理しています。必要に応じて研修や受講者の情報を編集してください。

## Docker を用いた起動

本番相当のビルドを Docker で確認したい場合は、ルートに追加した `Dockerfile` と `backend/Dockerfile` を利用できます。`docker-compose.yml` ではフロントエンド (Nginx) とバックエンド (Nuxt) を同時に起動するよう構成されています。

```bash
# 初回は --build を付与してイメージを作成します
docker compose up --build
```

- フロントエンド: http://localhost:8080
- バックエンド API: http://localhost:3000

`docker-compose.yml` ではフロントエンドのビルド時に `API_BASE_URL` ビルド引数を `http://backend:3000` に設定しているため、コンテナ間通信でバックエンド API を参照できます。別環境にデプロイする際は、`API_BASE_URL` の値を調整してください。

## Vercel へのデプロイ

フロントエンドとバックエンドを Vercel へそれぞれデプロイするための設定ファイル (`vercel.json` と `backend/vercel.json`) を追加しています。

- フロントエンド: `vercel.json` で Vue プロジェクトとしてビルドし、`dist` ディレクトリを配信します。
- バックエンド: `backend/vercel.json` と Dockerfile を使用してコンテナをデプロイします。

フロントエンドからバックエンドを参照するために、Vercel プロジェクトには `api-base-url` というシークレットを作成し、公開用のバックエンド URL を設定してください (`VUE_APP_API_BASE_URL` にマッピングされます)。

## GitHub Actions による CI/CD

`.github/workflows/deploy.yml` では以下を自動化しています。

1. ルートと `backend/` の依存インストールおよび Docker イメージのビルド
2. Vercel CLI のインストールとそれぞれのプロジェクトへのデプロイ

ワークフローを有効にするために、GitHub リポジトリのシークレットへ以下を登録してください。

- `VERCEL_TOKEN`: Vercel のトークン
- `VERCEL_ORG_ID`: 対象チーム/個人の Org ID
- `VERCEL_FRONTEND_PROJECT_ID`: フロントエンド用 Vercel プロジェクト ID
- `VERCEL_BACKEND_PROJECT_ID`: バックエンド用 Vercel プロジェクト ID

必要に応じて `workflow_dispatch` で手動実行も可能です。

