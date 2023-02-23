import { gql } from "@apollo/client"

export const ALL_CLIENTS = gql`
query allClients{
  allClients {
    id
    name
    email
    phone
  }
}
`

export const GET_CLIENT = gql`
query GetClient($clientID: ID!) {
  getClient(clientID: $clientID) {
    id
    name
    email
    phone
    projects {
      name
    }
  }
}
`

export const ALL_PROJECTS = gql`
query {
  allProjects {
    id
    name
    status
  }
}
`

export const GET_PROJECT = gql`
query GetProject($projectID: ID!) {
  getProject(projectID: $projectID) {
    id
    name
    status
    description
    client {
      id
      name
    }
  }
}
`