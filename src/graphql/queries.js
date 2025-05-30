/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getConversation = /* GraphQL */ `
  query GetConversation($id: ID!) {
    getConversation(id: $id) {
      id
      name
      user
      description
      createdAt
      utterances {
        nextToken
        __typename
      }
      updatedAt
      owner
      __typename
    }
  }
`;
export const listConversations = /* GraphQL */ `
  query ListConversations(
    $filter: ModelConversationFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listConversations(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        user
        description
        createdAt
        updatedAt
        owner
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const conversationsByUser = /* GraphQL */ `
  query ConversationsByUser(
    $user: String!
    $createdAt: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelConversationFilterInput
    $limit: Int
    $nextToken: String
  ) {
    conversationsByUser(
      user: $user
      createdAt: $createdAt
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        name
        user
        description
        createdAt
        updatedAt
        owner
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const getUtterance = /* GraphQL */ `
  query GetUtterance($id: ID!) {
    getUtterance(id: $id) {
      id
      text
      author
      conversationId
      data
      createdAt
      updatedAt
      owner
      __typename
    }
  }
`;
export const listUtterances = /* GraphQL */ `
  query ListUtterances(
    $filter: ModelUtteranceFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listUtterances(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        text
        author
        conversationId
        data
        createdAt
        updatedAt
        owner
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const utterancesByConversationIdAndCreatedAt = /* GraphQL */ `
  query UtterancesByConversationIdAndCreatedAt(
    $conversationId: ID!
    $createdAt: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelUtteranceFilterInput
    $limit: Int
    $nextToken: String
  ) {
    utterancesByConversationIdAndCreatedAt(
      conversationId: $conversationId
      createdAt: $createdAt
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        text
        author
        conversationId
        data
        createdAt
        updatedAt
        owner
        __typename
      }
      nextToken
      __typename
    }
  }
`;
