import { useMutation, useQuery } from "@apollo/client"
import { ADD_CLIENT } from "../graphql/mutations"
import { ALL_CLIENTS } from "../graphql/queries"

export default function useClients () {
  const { loading, data, error } = useQuery(ALL_CLIENTS)
  const [addClient, result] = useMutation(ADD_CLIENT, {
    refetchQueries: [{ query: ALL_CLIENTS }]
  })

  return { loading, data, addClient, error }
}
