import { gql } from "@apollo/client"

/*-------- PROJECT --------*/

export const ADD_PROJECT = gql`
mutation addProject($name: String!, $status: Status!, $description: String!, $clientID: ID!) {
  addProject(name: $name, status: $status, description: $description, clientID: $clientID) {
    id
    name
    status
    description
  }
}
`

export const EDIT_PROJECT = gql`
mutation editProject($id: ID!, $name: String, $status: Status, $description: String){
  editProject(id: $id, name: $name, status: $status, description: $description){
    id
    name
    status
    description
  }
}
`

export const DELETE_PROJECT = gql`
mutation deleteProject($projectID: ID!, $clientID: ID!) {
  deleteProject(id: $projectID, clientID: $clientID) {
    id
    name
    status
    description
  }
}
`

/*-------- CLIENT --------*/

export const ADD_CLIENT = gql`
mutation addClient($name: String!, $email: String!, $phone: String!) {
  addClient(name: $name, email: $email, phone: $phone) {
    id
    name
    email
    phone
  }
}
`

export const EDIT_CLIENT = gql`
mutation editClient($id: ID!, $name: String, $email: String, $phone: String) {
  editClient(id: $id, name: $name, email: $email, phone: $phone) {
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

export const DELETE_CLIENT = gql`
mutation deleteClient($clientID: ID!) {
  deleteClient(id: $clientID) {
    id
    name 
    phone
  }
}
`