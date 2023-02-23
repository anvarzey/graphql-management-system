import { useMutation, useQuery } from '@apollo/client'
import { DELETE_CLIENT, EDIT_CLIENT } from '../graphql/mutations'
import { ALL_CLIENTS, GET_CLIENT } from '../graphql/queries'

export default function useClient (clientID: string | undefined) {

  const { loading, data, error } = useQuery(GET_CLIENT, {
    variables: { clientID: clientID }
  })

  const [deleteClient] = useMutation(DELETE_CLIENT, {
    refetchQueries: [{ query: ALL_CLIENTS }]
  })
  const [editClient, result] = useMutation(EDIT_CLIENT, {
    refetchQueries: [{ query: GET_CLIENT }]
  })


  return { loading, data, deleteClient, editClient, error }
}
