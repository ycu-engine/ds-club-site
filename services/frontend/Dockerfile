FROM node:16-slim

WORKDIR /app

# ライブラリのインストール
# ./package.json -> /app/package.json
COPY package.json ./
RUN yarn install

# ソースコードの追加（ファイル全てを追加する）
COPY . .

# アプリケーションのビルドを行います。
RUN yarn graphql-codegen
RUN yarn build

# ビルドしたアプリケーションを実行します。
# 注) RUN じゃなくて CMD を使う
CMD ["yarn", "start"]
