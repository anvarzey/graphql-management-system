import { useMutation, useQuery } from "@apollo/client"
import { ADD_PROJECT } from "../graphql/mutations"
import { ALL_PROJECTS } from "../graphql/queries"

export default function useProjects () {
  const { loading, data, error } = useQuery(ALL_PROJECTS)
  const [addProject] = useMutation(ADD_PROJECT, {
    refetchQueries: [{ query: ALL_PROJECTS }]
  })

  return { loading, data, addProject, error }
}