import { createTrialUser } from '../modules/trialUser'

const main = async () => {
  for (let i = 0; i < 5; i++) {
    await createTrialUser({
      email: `hogehoge${i}@gmail.com`,
      name: `体験ユーザー${i}`,
    })
  }
}

void main()
// workspace/services/backend $ yarn dotenv -e .env.local ts-node src/bin/createTrialUser.ts
