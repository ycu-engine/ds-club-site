import { PaymentStatus, RankKind, UserRole } from '../generates/graphql'
import { createUserWithId } from '../modules/user'

const main = async () => {
  await createUserWithId('QOnAJTTfhNVnS7nF2AlYqgZvAopn', {
    currentRank: RankKind.Evangelist,
    name: '岡田拓也',
    paymentStatus: PaymentStatus.Paid,
    roles: [UserRole.Admin, UserRole.Menter],
  })
}

void main()
