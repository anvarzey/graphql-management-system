import { ListGroup, Table } from 'react-bootstrap'
import type { Client } from '../types/types'
import { Link } from 'react-router-dom'

export default function Clients ({ data }: { data: Client[] }) {

  return (
    <div className='container mt-5'>
      <h2 className='mb-4'>Clients</h2>
      <Table striped bordered size="md">
        <thead>
          <tr>
            <th>Name:</th>
            <th>Email:</th>
            <th>Phone:</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {
            data &&
            data.map(client => (
              <tr key={client.id}>
                <td>{client.name}</td>
                <td>{client.email}</td>
                <td>{client.phone}</td>
                <td>
                  <Link style={{ transform: 'translateX(-50%)' }} to={`/client/${client.id}`} className='btn btn-outline-info position-relative start-50'>More Info</Link>
                </td>
              </tr>
            ))
          }
        </tbody>
      </Table>
    </div>
  )
}
