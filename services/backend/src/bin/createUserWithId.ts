import { createUserWithId } from '../modules/user'

const main = async () => {
  await createUserWithId('Vl25tBuup7Af38GD2Qx4cOj8g1MB', {
    email: 'hoge@fuga.com',
    name: '認証用ユーザー',
  })
}

void main()
