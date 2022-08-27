import { PaymentStatus, RankKind, UserRole } from '../generates/graphql'
import { createUserWithId } from '../modules/user'

const main = async () => {
  await createUserWithId('7Iepp1rAkzVBmXYpYdevFBmGfqqT', {
    currentRank: RankKind.Evangelist,
    name: '諸田健太朗',
    paymentStatus: PaymentStatus.Paid,
    roles: [UserRole.Admin, UserRole.Menter],
  })
}

void main()
