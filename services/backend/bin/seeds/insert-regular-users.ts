import { PaymentStatus, RankKind } from '../../src/generates/graphql'
import { createUser } from '../../src/modules/user'

const main = async () => {
  await createUser({
    name: '浦 優太',
    currentRank: RankKind.Imperator,
    paymentStatus: PaymentStatus.Paid,
  })
  await createUser({
    name: '佐藤 駿',
    currentRank: RankKind.Master,
    paymentStatus: PaymentStatus.NotPaid,
  })
  await createUser({
    name: '諸田 健太朗',
    currentRank: RankKind.Master,
    paymentStatus: PaymentStatus.Paid,
  })
  await createUser({
    name: 'Aさん',
    currentRank: RankKind.Beginner,
    paymentStatus: PaymentStatus.Paid,
  })
  await createUser({
    name: 'Bさん',
    currentRank: RankKind.Evangelist,
    paymentStatus: PaymentStatus.Paid,
  })
  await createUser({
    name: 'Cさん',
    currentRank: RankKind.Beginner,
    paymentStatus: PaymentStatus.Paid,
  })
  await createUser({
    name: 'Dさん',
    currentRank: RankKind.Beginner,
    paymentStatus: PaymentStatus.NotPaid,
  })
  await createUser({
    name: 'Eさん',
    currentRank: RankKind.Evangelist,
    paymentStatus: PaymentStatus.Paid,
  })
  await createUser({
    name: 'Fさん',
    currentRank: RankKind.Beginner,
    paymentStatus: PaymentStatus.Paid,
  })
  await createUser({
    name: 'Gさん',
    currentRank: RankKind.Beginner,
    paymentStatus: PaymentStatus.Paid,
  })
  await createUser({
    name: 'Hさん',
    currentRank: RankKind.Beginner,
    paymentStatus: PaymentStatus.NotPaid,
  })
  await createUser({
    name: 'Iさん',
    currentRank: RankKind.Beginner,
    paymentStatus: PaymentStatus.NotPaid,
  })
}

void main()
