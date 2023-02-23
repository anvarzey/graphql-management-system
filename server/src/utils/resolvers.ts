import Project from '../models/Project.js'
import Client from '../models/Client.js'

interface Client {
  id: string
  name: string
  email: string
  phone: string
}

interface Project {
  id: string
  name: string
  status: string
  description: string
}

export const resolvers = {
  Query: {
    allProjects: async () => {
      const projects = await Project.find({}).populate('client')
      return projects
    },
    getProject: async (root: any, args: any) => {
      const { projectID } = args
      const project = await Project.findById(projectID).populate('client')
      return project
    },
    allClients: async () => {
      const clients = await Client.find({}).populate('projects')
      return clients
    },
    getClient: async (root: any, args: any) => {
      const { clientID } = args
      const client = await Client.findById(clientID).populate('projects')
      return client
    }
  },
  Mutation: {
    addProject: async (root: any, args: any) => {
      const { clientID, ...projectProps } = args
      const client = await Client.findById(clientID)
      if(!client) return null
      const newProject = new Project({ ...projectProps, client: client._id })
      try {
        await newProject.save()
        client.projects.push(newProject._id)
        await client.save()
        return newProject
      } catch (error) {
        return null
      }
    },
    addClient: async (root: any, args: any) => {
      const newClient = new Client({ ...args, projects: [] })
      await newClient.save()
      return newClient
    },
    editProject: async (root: any, args: any) => {
      const { id, ...rest } = args
      const projectUpdated = await Project.findByIdAndUpdate(id, rest, { returnDocument: 'after' }).populate('client')
      return projectUpdated
    }, 
    editClient: async (root: any, args: any) => {
      const { id, ...rest } = args
      const clientUpdated = await Client.findByIdAndUpdate(id, rest, { returnDocument: 'after' }).populate('projects')
      return clientUpdated
    } ,
    deleteProject: async (root: any, args: any) => {
      const clientToUpdate = await Client.findById(args.clientID)
      if(clientToUpdate) {
      const projectToRemove = await Project.findByIdAndRemove(args.id)
      const newProjArr = clientToUpdate?.projects.filter(project => project.id !== args.id)
      clientToUpdate.projects = newProjArr || []
        await clientToUpdate?.save()
        return projectToRemove
      }
      return null
    }, 
    deleteClient: async (root: any, args: any) => {
      const clientToRemove = await Client.findByIdAndRemove(args.id)
      return clientToRemove
    }
  }
}