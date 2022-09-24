import { createUserWithId } from '../modules/user'

const main = async () => {
  await createUserWithId('0zgYDDHDssbzDQTM4tvNKHvx7IQv', {
    email: 'hoge@fuga.com',
    name: '岡田拓也',
  })
}

void main()
