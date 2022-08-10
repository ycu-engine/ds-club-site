// @ts-nocheck
import type { GraphQLResolveInfo } from 'graphql';
import type { Context } from '../context';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Mutation = {
  __typename?: 'Mutation';
  submitTrialApplication: Scalars['Boolean'];
  updateUserPaymentStatus: RegularUser;
  updateUserRank: RegularUser;
};


export type MutationSubmitTrialApplicationArgs = {
  input: SubmitTrialApplicationInput;
};


export type MutationUpdateUserPaymentStatusArgs = {
  paymentStatus: PaymentStatus;
  userId: Scalars['ID'];
};


export type MutationUpdateUserRankArgs = {
  rank: RankKind;
  userId: Scalars['ID'];
};

/** 支払い状況 */
export enum PaymentStatus {
  NotPaid = 'NOT_PAID',
  Paid = 'PAID'
}

export type Query = {
  __typename?: 'Query';
  getRegularUsers: Array<RegularUser>;
  getUser?: Maybe<User>;
  ok: Scalars['Boolean'];
};


export type QueryGetUserArgs = {
  id: Scalars['ID'];
};

export enum RankKind {
  Beginner = 'BEGINNER',
  Evangelist = 'EVANGELIST',
  Imperator = 'IMPERATOR',
  Master = 'MASTER'
}

export type RegularUser = User & {
  __typename?: 'RegularUser';
  /** 段位 */
  currentRank: RankKind;
  id: Scalars['ID'];
  name: Scalars['String'];
  /** 支払い状況 */
  paymentStatus: PaymentStatus;
};

export type SubmitTrialApplicationInput = {
  affiliation: Scalars['String'];
  email: Scalars['String'];
  name: Scalars['String'];
};

export type User = {
  id: Scalars['ID'];
  name: Scalars['String'];
};

export enum UserRole {
  Normal = 'NORMAL',
  Staff = 'STAFF'
}



export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
  ID: ResolverTypeWrapper<Scalars['ID']>;
  Mutation: ResolverTypeWrapper<{}>;
  PaymentStatus: PaymentStatus;
  Query: ResolverTypeWrapper<{}>;
  RankKind: RankKind;
  RegularUser: ResolverTypeWrapper<RegularUser>;
  String: ResolverTypeWrapper<Scalars['String']>;
  SubmitTrialApplicationInput: SubmitTrialApplicationInput;
  User: ResolversTypes['RegularUser'];
  UserRole: UserRole;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Boolean: Scalars['Boolean'];
  ID: Scalars['ID'];
  Mutation: {};
  Query: {};
  RegularUser: RegularUser;
  String: Scalars['String'];
  SubmitTrialApplicationInput: SubmitTrialApplicationInput;
  User: ResolversParentTypes['RegularUser'];
};

export type MutationResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  submitTrialApplication?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType, RequireFields<MutationSubmitTrialApplicationArgs, 'input'>>;
  updateUserPaymentStatus?: Resolver<ResolversTypes['RegularUser'], ParentType, ContextType, RequireFields<MutationUpdateUserPaymentStatusArgs, 'paymentStatus' | 'userId'>>;
  updateUserRank?: Resolver<ResolversTypes['RegularUser'], ParentType, ContextType, RequireFields<MutationUpdateUserRankArgs, 'rank' | 'userId'>>;
};

export type QueryResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  getRegularUsers?: Resolver<Array<ResolversTypes['RegularUser']>, ParentType, ContextType>;
  getUser?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType, RequireFields<QueryGetUserArgs, 'id'>>;
  ok?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
};

export type RegularUserResolvers<ContextType = Context, ParentType extends ResolversParentTypes['RegularUser'] = ResolversParentTypes['RegularUser']> = {
  currentRank?: Resolver<ResolversTypes['RankKind'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  paymentStatus?: Resolver<ResolversTypes['PaymentStatus'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UserResolvers<ContextType = Context, ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']> = {
  __resolveType: TypeResolveFn<'RegularUser', ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
};

export type Resolvers<ContextType = Context> = {
  Mutation?: MutationResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  RegularUser?: RegularUserResolvers<ContextType>;
  User?: UserResolvers<ContextType>;
};

