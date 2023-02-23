export const typeDefs = `
enum Status {
  NotStarted
  Progress
  Paused
  Completed
  Canceled
}

type Project {
  id: ID!
  name: String!
  status: Status
  description: String!
  client: Client!
}

type Client {
  id: ID!
  name: String!
  email: String!
  phone: String!
  projects: [Project]
}

type Query {
  allProjects: [Project]
  getProject(
    projectID: ID!
  ): Project
  allClients: [Client]
  getClient(
    clientID: ID!
  ): Client
}

type Mutation {
  addProject(
    name: String!
    status: Status!
    description: String!
    clientID: ID!
  ):Project
  addClient(
    name: String!
    email: String!
    phone: String!
  ):Client
  editProject(
    id: ID!
    name: String
    status: Status
    description: String
  ):Project
  editClient(
    id: ID!
    name: String
    email: String
    phone: String
  ):Client
  deleteProject(
    id: ID!
    clientID: ID!
  ):Project
  deleteClient(
    id: ID!
  ):Client
}
`