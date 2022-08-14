// @ts-nocheck
import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions = {} as const;
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

/** お知らせ */
export type News = {
  __typename?: 'News';
  body: Scalars['String'];
  id: Scalars['ID'];
  title: Scalars['String'];
};

/** 支払い状況 */
export enum PaymentStatus {
  NotPaid = 'NOT_PAID',
  Paid = 'PAID'
}

export type Query = {
  __typename?: 'Query';
  getNews: Array<News>;
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

export type MemberInfoPageQueryVariables = Exact<{ [key: string]: never; }>;


export type MemberInfoPageQuery = { __typename?: 'Query', getRegularUsers: Array<{ __typename?: 'RegularUser', id: string, name: string, currentRank: RankKind, paymentStatus: PaymentStatus }> };

export type MemberInfoPage_UpdatePaymentStatusMutationVariables = Exact<{
  userId: Scalars['ID'];
  paymentStatus: PaymentStatus;
}>;


export type MemberInfoPage_UpdatePaymentStatusMutation = { __typename?: 'Mutation', updateUserPaymentStatus: { __typename?: 'RegularUser', id: string, paymentStatus: PaymentStatus } };

export type MemberInfoPage_UpdateCurrentRankMutationVariables = Exact<{
  userId: Scalars['ID'];
  currentRank: RankKind;
}>;


export type MemberInfoPage_UpdateCurrentRankMutation = { __typename?: 'Mutation', updateUserRank: { __typename?: 'RegularUser', id: string, currentRank: RankKind } };

export type NewsPageQueryVariables = Exact<{ [key: string]: never; }>;


export type NewsPageQuery = { __typename?: 'Query', getNews: Array<{ __typename?: 'News', id: string, title: string, body: string }> };

export type SubmitTrialApplicationPage_SubmitTrialApplicationMutationVariables = Exact<{
  input: SubmitTrialApplicationInput;
}>;


export type SubmitTrialApplicationPage_SubmitTrialApplicationMutation = { __typename?: 'Mutation', submitTrialApplication: boolean };


export const MemberInfoPageDocument = gql`
    query MemberInfoPage {
  getRegularUsers {
    id
    name
    currentRank
    paymentStatus
  }
}
    `;

/**
 * __useMemberInfoPageQuery__
 *
 * To run a query within a React component, call `useMemberInfoPageQuery` and pass it any options that fit your needs.
 * When your component renders, `useMemberInfoPageQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMemberInfoPageQuery({
 *   variables: {
 *   },
 * });
 */
export function useMemberInfoPageQuery(baseOptions?: Apollo.QueryHookOptions<MemberInfoPageQuery, MemberInfoPageQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<MemberInfoPageQuery, MemberInfoPageQueryVariables>(MemberInfoPageDocument, options);
      }
export function useMemberInfoPageLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MemberInfoPageQuery, MemberInfoPageQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<MemberInfoPageQuery, MemberInfoPageQueryVariables>(MemberInfoPageDocument, options);
        }
export type MemberInfoPageQueryHookResult = ReturnType<typeof useMemberInfoPageQuery>;
export type MemberInfoPageLazyQueryHookResult = ReturnType<typeof useMemberInfoPageLazyQuery>;
export type MemberInfoPageQueryResult = Apollo.QueryResult<MemberInfoPageQuery, MemberInfoPageQueryVariables>;
export const MemberInfoPage_UpdatePaymentStatusDocument = gql`
    mutation MemberInfoPage_UpdatePaymentStatus($userId: ID!, $paymentStatus: PaymentStatus!) {
  updateUserPaymentStatus(userId: $userId, paymentStatus: $paymentStatus) {
    id
    paymentStatus
  }
}
    `;
export type MemberInfoPage_UpdatePaymentStatusMutationFn = Apollo.MutationFunction<MemberInfoPage_UpdatePaymentStatusMutation, MemberInfoPage_UpdatePaymentStatusMutationVariables>;

/**
 * __useMemberInfoPage_UpdatePaymentStatusMutation__
 *
 * To run a mutation, you first call `useMemberInfoPage_UpdatePaymentStatusMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useMemberInfoPage_UpdatePaymentStatusMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [memberInfoPageUpdatePaymentStatusMutation, { data, loading, error }] = useMemberInfoPage_UpdatePaymentStatusMutation({
 *   variables: {
 *      userId: // value for 'userId'
 *      paymentStatus: // value for 'paymentStatus'
 *   },
 * });
 */
export function useMemberInfoPage_UpdatePaymentStatusMutation(baseOptions?: Apollo.MutationHookOptions<MemberInfoPage_UpdatePaymentStatusMutation, MemberInfoPage_UpdatePaymentStatusMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<MemberInfoPage_UpdatePaymentStatusMutation, MemberInfoPage_UpdatePaymentStatusMutationVariables>(MemberInfoPage_UpdatePaymentStatusDocument, options);
      }
export type MemberInfoPage_UpdatePaymentStatusMutationHookResult = ReturnType<typeof useMemberInfoPage_UpdatePaymentStatusMutation>;
export type MemberInfoPage_UpdatePaymentStatusMutationResult = Apollo.MutationResult<MemberInfoPage_UpdatePaymentStatusMutation>;
export type MemberInfoPage_UpdatePaymentStatusMutationOptions = Apollo.BaseMutationOptions<MemberInfoPage_UpdatePaymentStatusMutation, MemberInfoPage_UpdatePaymentStatusMutationVariables>;
export const MemberInfoPage_UpdateCurrentRankDocument = gql`
    mutation MemberInfoPage_UpdateCurrentRank($userId: ID!, $currentRank: RankKind!) {
  updateUserRank(userId: $userId, rank: $currentRank) {
    id
    currentRank
  }
}
    `;
export type MemberInfoPage_UpdateCurrentRankMutationFn = Apollo.MutationFunction<MemberInfoPage_UpdateCurrentRankMutation, MemberInfoPage_UpdateCurrentRankMutationVariables>;

/**
 * __useMemberInfoPage_UpdateCurrentRankMutation__
 *
 * To run a mutation, you first call `useMemberInfoPage_UpdateCurrentRankMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useMemberInfoPage_UpdateCurrentRankMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [memberInfoPageUpdateCurrentRankMutation, { data, loading, error }] = useMemberInfoPage_UpdateCurrentRankMutation({
 *   variables: {
 *      userId: // value for 'userId'
 *      currentRank: // value for 'currentRank'
 *   },
 * });
 */
export function useMemberInfoPage_UpdateCurrentRankMutation(baseOptions?: Apollo.MutationHookOptions<MemberInfoPage_UpdateCurrentRankMutation, MemberInfoPage_UpdateCurrentRankMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<MemberInfoPage_UpdateCurrentRankMutation, MemberInfoPage_UpdateCurrentRankMutationVariables>(MemberInfoPage_UpdateCurrentRankDocument, options);
      }
export type MemberInfoPage_UpdateCurrentRankMutationHookResult = ReturnType<typeof useMemberInfoPage_UpdateCurrentRankMutation>;
export type MemberInfoPage_UpdateCurrentRankMutationResult = Apollo.MutationResult<MemberInfoPage_UpdateCurrentRankMutation>;
export type MemberInfoPage_UpdateCurrentRankMutationOptions = Apollo.BaseMutationOptions<MemberInfoPage_UpdateCurrentRankMutation, MemberInfoPage_UpdateCurrentRankMutationVariables>;
export const NewsPageDocument = gql`
    query NewsPage {
  getNews {
    id
    title
    body
  }
}
    `;

/**
 * __useNewsPageQuery__
 *
 * To run a query within a React component, call `useNewsPageQuery` and pass it any options that fit your needs.
 * When your component renders, `useNewsPageQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useNewsPageQuery({
 *   variables: {
 *   },
 * });
 */
export function useNewsPageQuery(baseOptions?: Apollo.QueryHookOptions<NewsPageQuery, NewsPageQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<NewsPageQuery, NewsPageQueryVariables>(NewsPageDocument, options);
      }
export function useNewsPageLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<NewsPageQuery, NewsPageQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<NewsPageQuery, NewsPageQueryVariables>(NewsPageDocument, options);
        }
export type NewsPageQueryHookResult = ReturnType<typeof useNewsPageQuery>;
export type NewsPageLazyQueryHookResult = ReturnType<typeof useNewsPageLazyQuery>;
export type NewsPageQueryResult = Apollo.QueryResult<NewsPageQuery, NewsPageQueryVariables>;
export const SubmitTrialApplicationPage_SubmitTrialApplicationDocument = gql`
    mutation SubmitTrialApplicationPage_SubmitTrialApplication($input: SubmitTrialApplicationInput!) {
  submitTrialApplication(input: $input)
}
    `;
export type SubmitTrialApplicationPage_SubmitTrialApplicationMutationFn = Apollo.MutationFunction<SubmitTrialApplicationPage_SubmitTrialApplicationMutation, SubmitTrialApplicationPage_SubmitTrialApplicationMutationVariables>;

/**
 * __useSubmitTrialApplicationPage_SubmitTrialApplicationMutation__
 *
 * To run a mutation, you first call `useSubmitTrialApplicationPage_SubmitTrialApplicationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSubmitTrialApplicationPage_SubmitTrialApplicationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [submitTrialApplicationPageSubmitTrialApplicationMutation, { data, loading, error }] = useSubmitTrialApplicationPage_SubmitTrialApplicationMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useSubmitTrialApplicationPage_SubmitTrialApplicationMutation(baseOptions?: Apollo.MutationHookOptions<SubmitTrialApplicationPage_SubmitTrialApplicationMutation, SubmitTrialApplicationPage_SubmitTrialApplicationMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SubmitTrialApplicationPage_SubmitTrialApplicationMutation, SubmitTrialApplicationPage_SubmitTrialApplicationMutationVariables>(SubmitTrialApplicationPage_SubmitTrialApplicationDocument, options);
      }
export type SubmitTrialApplicationPage_SubmitTrialApplicationMutationHookResult = ReturnType<typeof useSubmitTrialApplicationPage_SubmitTrialApplicationMutation>;
export type SubmitTrialApplicationPage_SubmitTrialApplicationMutationResult = Apollo.MutationResult<SubmitTrialApplicationPage_SubmitTrialApplicationMutation>;
export type SubmitTrialApplicationPage_SubmitTrialApplicationMutationOptions = Apollo.BaseMutationOptions<SubmitTrialApplicationPage_SubmitTrialApplicationMutation, SubmitTrialApplicationPage_SubmitTrialApplicationMutationVariables>;