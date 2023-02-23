import { useMutation, useQuery } from "@apollo/client"
import { GET_PROJECT, ALL_PROJECTS } from "../graphql/queries"
import { DELETE_PROJECT, EDIT_PROJECT } from "../graphql/mutations"

export default function useProject (projectID: string | undefined) {
  const { loading, data } = useQuery(GET_PROJECT, {
    variables: { projectID: projectID }
  })
  const [editProject] = useMutation(EDIT_PROJECT, {
    refetchQueries: [{ query: GET_PROJECT }]
  })
  const [deleteProject, result] = useMutation(DELETE_PROJECT, {
    refetchQueries: [{ query: ALL_PROJECTS }]
  })

  return { loading, data, editProject, deleteProject }
}
