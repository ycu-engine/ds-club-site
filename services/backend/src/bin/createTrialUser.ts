import { auth } from '../clients/firebase'
import { createTrialUser } from '../modules/trialUser'

const main = async () => {
  for (let i = 0; i < 5; i++) {
    const user = await createTrialUser({
      email: `hogehoge${i}@gmail.com`,
      name: `体験ユーザー${i}`,
    })
    await auth.createUser({
      disabled: Math.random() > 0.5,
      email: user.email,
      emailVerified: true,
      password: 'password',
      uid: user.id,
    })
  }
}

void main()
// workspace/services/backend $ yarn dotenv -e .env.local ts-node src/bin/createTrialUser.ts
