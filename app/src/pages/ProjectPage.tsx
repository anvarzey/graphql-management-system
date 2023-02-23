import { ChangeEvent, SyntheticEvent, useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import { Button, Form } from "react-bootstrap"
import useProject from "../hooks/useProject"

export default function ProjectPage () {
  const { projectID } = useParams()
  const navigate = useNavigate()
  const { loading, data, editProject, deleteProject } = useProject(projectID)

  const [name, setName] = useState('')
  const [status, setStatus] = useState('')
  const [description, setDescription] = useState('')

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target
    switch (id) {
      case 'nameEdited':
        setName(value)
        break
      case 'descriptionEdited':
        setDescription(value)
        break
      default: break
    }
  }

  const handleSelect = (e: ChangeEvent<HTMLSelectElement>) => {
    setStatus(e.target.value)
  }

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault()
    const projectChanges = {
      id: data?.getProject.id
    }

    if (name.length > 1) projectChanges.name = name
    if (description.length > 1) projectChanges.description = description
    if (status.length > 1) projectChanges.status = status

    if (Object.keys(projectChanges).length > 1) {
      editProject({
        variables: { ...projectChanges }
      })
      setName('')
      setDescription('')
      setStatus('')
    }
  }

  const handleDeletion = async () => {
    await deleteProject({
      variables: {
        projectID,
        clientID: data?.getProject.client?.id
      }
    })
    navigate('/')
    // console.log({ projectID, clientID: data?.getProject.client?.id })
  }

  if (loading) return <h2>Loading...</h2>

  return (
    <main className='container pb-5'>
      <div className='d-flex justify-content-between mt-3'>
        <Link to='/' className="btn btn-info">
          Home
        </Link>
        <Button onClick={handleDeletion} variant='danger'>
          Delete Project
        </Button>
      </div>
      <div className='mt-4'>
        <h2>Project Details</h2>
        <div className="d-flex justify-content-between align-items-center py-3">
          <span className="fw-bold">Name: </span>
          <span>{data?.getProject.name}</span>
        </div>
        <div className="d-flex justify-content-between align-items-center py-3">
          <span className="fw-bold">Description: </span>
          <span>{data?.getProject.description}</span>
        </div>
        <div className="d-flex justify-content-between align-items-center py-3">
          <span className="fw-bold">Status:</span>
          <span>{data?.getProject.status}</span>
        </div>
        <div className="d-flex justify-content-between align-items-center py-3">
          <span className="fw-bold">Client: </span>
          <span>{data?.getProject.client?.name}</span>
        </div>
      </div>
      <div>
        <h2>Edit Project:</h2>
        <form className='d-flex flex-column' onSubmit={handleSubmit}>
          <label>Name: </label>
          <input className='p-2' onChange={handleChange} value={name} id='nameEdited' type="text" />
          <label>Description: </label>
          <input className='p-2' onChange={handleChange} value={description} id='descriptionEdited' type="text" />
          <label>Status:</label>
          <select className='p-2' onChange={handleSelect} name="statusNewProject" value={status} id="statusNewProject">
            <option value="">----</option>
            <option value="NotStarted">Not started</option>
            <option value="Progress">In progress</option>
            <option value="Paused">Paused</option>
            <option value="Canceled">Canceled</option>
            <option value="Completed">Completed</option>
          </select>
          <button style={{ width: 'fit-content', transform: 'translateX(-50%)' }} className='btn btn-success position-relative start-50 mt-4'>Make the changes</button>
        </form>
      </div>
    </main>
  )
}
