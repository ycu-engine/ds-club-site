import fs from 'fs/promises'
import path from 'path'
import process from 'process'
import { authenticate } from '@google-cloud/local-auth'
import { google } from 'googleapis'
import type { OAuth2Client } from 'googleapis-common'

// これらのスコープを変更する場合は、token.jsonを削除してください。
const SCOPES = ['https://www.googleapis.com/auth/drive.metadata.readonly']
// token.jsonというファイルには、ユーザーのアクセストークンやリフレッシュトークンが保存され、
// 認可フローが初めて完了したときに自動的に作成されます。
const TOKEN_PATH = path.join(process.cwd(), 'token.json')
const CREDENTIALS_PATH = path.join(process.cwd(), 'credentials.json')

/**
 * 保存ファイルから以前に認証された資格情報を読み取ります。
 *
 * @return {Promise<OAuth2Client|null>}
 */
const loadSavedCredentialsIfExist: () => Promise<OAuth2Client | null> =
  async () => {
    try {
      const content = await fs.readFile(TOKEN_PATH)
      const credentials = JSON.parse(content.toString())
      // const client = new google.auth.OAuth2(
      //   credentials.client_id,
      //   credentials.client_secret,
      //   credentials.redirect_uris[0]
      // )
      // client.setCredentials(credentials)
      // return client
      const client = new google.auth.OAuth2()
      client.setCredentials(credentials)
      return client
      // return google.auth.fromJSON(credentials)
    } catch (err) {
      return null
    }
  }

/**
 * GoogleAUth.fromJSON と互換性のあるファイルに証明書をシリアライズします。
 *
 * @param {OAuth2Client} client
 * @return {Promise<void>}
 */
const saveCredentials: (client: OAuth2Client) => Promise<void> = async (
  client,
) => {
  const content = await fs.readFile(CREDENTIALS_PATH)
  const keys = JSON.parse(content.toString())
  const key = keys.installed || keys.web
  const payload = JSON.stringify({
    client_id: key.client_id,
    client_secret: key.client_secret,
    refresh_token: client.credentials.refresh_token,
    type: 'authorized_user',
  })
  await fs.writeFile(TOKEN_PATH, payload)
}

/**
 * APIを呼び出すためのロードまたはリクエストまたは認証。
 *
 */
const authorize = async () => {
  let client = await loadSavedCredentialsIfExist()
  if (client) {
    return client
  }
  client = await authenticate({
    keyfilePath: CREDENTIALS_PATH,
    scopes: SCOPES,
  })
  if (client.credentials) {
    await saveCredentials(client)
  }
  return client
}

/**
 * 最大10個のファイル名とIDを一覧表示します。
 * @param {OAuth2Client} authClient An authorized OAuth2 client.
 */
const listFiles = async (authClient: OAuth2Client) => {
  const drive = google.drive({ auth: authClient, version: 'v3' })
  const res = await drive.files.list({
    fields: 'nextPageToken, files(id, name)',
    pageSize: 10,
  })
  const files = res.data.files || []
  if (files.length === 0) {
    console.info('No files found.')
    return
  }

  console.info('Files:')
  files.map((file) => {
    console.info(`${file.name} (${file.id})`)
  })
}

authorize().then(listFiles).catch(console.error)

// workspace/services/backend $ yarn dotenv -e .env.local ts-node src/clients/google_drive/index.ts
