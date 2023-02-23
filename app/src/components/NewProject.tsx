import { useMutation, useQuery } from '@apollo/client'
import { ChangeEvent, SyntheticEvent, useState } from 'react'
import { Modal } from 'react-bootstrap'
import { HiOutlineX } from 'react-icons/hi'
import { ADD_PROJECT } from '../graphql/mutations'
import { ALL_CLIENTS, ALL_PROJECTS } from '../graphql/queries'
import { Client } from '../types/types'

interface Props {
  variables: {
    name: string
    status: string
    description: string
    clientID: string
  }
}

export default function NewProject ({ clients, show, handleCloseProjectForm, addProject }: { clients: Client[], show: boolean, handleCloseProjectForm: () => void, addProject: (args: Props) => void }) {
  const [name, setName] = useState<string>('')
  const [status, setStatus] = useState<string>('NotStarted')
  const [description, setDescription] = useState<string>('')
  const [client, setClient] = useState<string>('')


  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target
    switch (id) {
      case 'nameNewProject':
        setName(value)
        break
      case 'descriptionNewProject':
        setDescription(value)
        break
      default: break
    }
  }

  const handleSelect = (e: ChangeEvent<HTMLSelectElement>) => {
    setStatus(e.target.value)
  }

  const handleClient = (e: ChangeEvent<HTMLSelectElement>) => {
    setClient(e.target.value)
  }

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault()
    if (client && name && status && description) {
      addProject({
        variables: { name, status, description, clientID: client }
      })
      handleCloseProjectForm()
    }

  }
  return (
    <Modal
      show={show}
      centered>
      <Modal.Header className=''>
        <Modal.Title className='d-flex justify-content-between align-items-center px-2 w-100'>
          Create New Project
          <HiOutlineX className='close-btn' onClick={handleCloseProjectForm} />
        </Modal.Title>
      </Modal.Header>
      <Modal.Body >
        <form onSubmit={handleSubmit} className='d-flex flex-column'>
          <label htmlFor="projectName">Name of the project:</label>
          <input className='p-2' required onChange={handleChange} type="text" name="projectName" id="nameNewProject" />
          <label htmlFor="" className='mt-3'>Status:</label>
          <select onChange={handleSelect} name="statusNewProject" id="statusNewProject" className='p-2'>
            <option value="NotStarted">Not started</option>
            <option value="Progress">In progress</option>
            <option value="Paused">Paused</option>
            <option value="Canceled">Canceled</option>
            <option value="Completed">Completed</option>
          </select>
          <label htmlFor="" className='mt-3'>Client:</label>
          <select className='p-2' onChange={handleClient} name="" id="">
            <option value="">---</option>
            {
              clients &&
              clients.map((client) => (
                <option key={client.id} value={client.id}>{client.name}</option>
              ))
            }
          </select>
          <label htmlFor="descriptionNewProject" className='mt-3'>Description: </label>
          <textarea className='p-2' onChange={handleChange} required id='descriptionNewProject' />
          <button className='btn btn-success mt-4'>Add Project</button>
        </form>
      </Modal.Body>
    </Modal>
  )
}
