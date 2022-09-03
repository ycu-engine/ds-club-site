import { PaymentStatus, RankKind, UserRole } from '../generates/graphql'
import { createUserWithId } from '../modules/user'

const main = async () => {
  await createUserWithId('LFoYLqtv4t5AXKSNDzuWC3ngTjlD', {

    currentRank: RankKind.Evangelist,
    name: '諸田健太朗',
    paymentStatus: PaymentStatus.Paid,
    roles: [UserRole.Admin, UserRole.Menter],
  })
  await createUserWithId('xNy9EoZRBvUUJpJZBDDqNoXF9zHD', {
    currentRank: RankKind.Beginner,
    name: '森健',
    paymentStatus: PaymentStatus.NotPaid,
    roles: [UserRole.Staff],
  })
}

void main()
