import Clients from '../components/Clients'
import Projects from '../components/Projects'
import { useState } from "react"
import { Button } from "react-bootstrap"
import NewProject from "../components/NewProject"
import NewClient from "../components/NewClient"
import useClients from '../hooks/useClients'
import useProjects from '../hooks/useProjects'

export default function Home () {
  const [showProjectForm, setShowProjectForm] = useState(false)
  const [showClientForm, setShowClientForm] = useState(false)

  const handleCloseProjectForm = () => setShowProjectForm(false)
  const handleCloseClientForm = () => setShowClientForm(false)

  const { data: clientsData, addClient } = useClients()
  const { data: projectsData, addProject } = useProjects()

  return (
    <div className='container'>
      <div className='container d-flex gap-4 justify-content-end'>
        <Button onClick={() => setShowProjectForm(true)} variant='info'>Add Project</Button>
        <Button onClick={() => setShowClientForm(true)} variant='outline-info'>New Client</Button>
      </div>
      <NewProject clients={clientsData?.allClients} show={showProjectForm} addProject={addProject} handleCloseProjectForm={handleCloseProjectForm} />
      <NewClient show={showClientForm} addClient={addClient} handleCloseClientForm={handleCloseClientForm} />
      <Projects data={projectsData?.allProjects} />
      <Clients data={clientsData?.allClients} />
    </div>
  )
}
