import { ChangeEvent, SyntheticEvent, useState } from 'react'
import { Link, useNavigate, useParams } from "react-router-dom"
import { Button } from 'react-bootstrap'
import useClient from '../hooks/useClient'

export default function ClientPage () {
  const [name, setName] = useState<string>('')
  const [email, setEmail] = useState<string>('')
  const [phone, setPhone] = useState<string>('')
  const { clientID } = useParams()
  const navigate = useNavigate()

  const { loading, data, deleteClient, editClient, error } = useClient(clientID)


  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target
    switch (id) {
      case 'name':
        setName(value)
        break
      case 'email':
        setEmail(value)
        break

      case 'phone':
        setPhone(value)
        break

      default: break
    }
  }

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault()
    let clientChanges = {
      id: data.getClient.id
    }

    if (name.length > 1) { clientChanges.name = name }
    if (email.length > 1) { clientChanges.email = email }
    if (phone.length > 1) { clientChanges.phone = phone }
    if (Object.keys(clientChanges).length > 1) {
      editClient({
        variables: { ...clientChanges }
      })
      setName('')
      setEmail('')
      setPhone('')
    }
  }

  const handleDeletion = async () => {
    await deleteClient({
      variables: { clientID }
    })
    navigate('/')
  }
  if (data) {
    console.log(data.getClient)
  }

  if (loading) return <h2>Loading...</h2>

  return (
    <main className='container pb-5'>
      <div className='d-flex justify-content-between mt-3'>
        <Link to='/' className="btn btn-info">
          Home
        </Link>
        <Button onClick={handleDeletion} variant='danger'>
          Delete Client
        </Button>
      </div>
      <div className='border py-2 px-4 mt-4'>
        <h2>Client Details</h2>
        <div className="d-flex justify-content-between align-items-center py-3">
          <span className="fw-bold">Name: </span>
          <span>{data?.getClient.name}</span>
        </div>
        <div className="d-flex justify-content-between align-items-center py-3">
          <span className='fw-bold'>Email: </span>
          <span>{data?.getClient.email}</span>
        </div>
        <div className="d-flex justify-content-between align-items-center py-3">
          <span className='fw-bold'>Phone:</span>
          <span>{data?.getClient.phone}</span>
        </div>
        <div className="d-flex justify-content-between align-items-center py-3">
          <span className='fw-bold'>Projects: </span>
          <span>{data?.getClient.projects.length < 1 ? 'None' : data?.getClient.projects.length === 1 ? data.getClient.projects[0].name : data?.getClient.projects.reduce((acc: { name: string }, curr: { name: string }) => acc.name + ', ' + curr.name, '')}</span>
        </div>
      </div>
      <div className="mt-4">
        <h2>Edit Client:</h2>
        <form className='d-flex flex-column' onSubmit={handleSubmit}>
          <label>Name: </label>
          <input className='p-2' onChange={handleChange} value={name} id='name' type="text" />
          <label>Email: </label>
          <input className='p-2' onChange={handleChange} value={email} id='email' type="text" />
          <label>Phone:</label>
          <input className='p-2' onChange={handleChange} value={phone} id='phone' type="text" />
          <button style={{ width: 'fit-content', transform: 'translateX(-50%)' }} className='btn btn-success position-relative start-50 mt-4'>Make the changes</button>
        </form>
      </div>
    </main>
  )
}
