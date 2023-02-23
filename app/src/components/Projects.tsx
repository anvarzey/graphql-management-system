import { ListGroup } from "react-bootstrap"
import type { Project } from "../types/types"
import { Link } from "react-router-dom"

export default function Projects ({ data }: { data: Project[] }) {

  return (
    <div className='container'>
      <h2 className='mb-4'>Projects</h2>
      <ListGroup>
        {
          data &&
          data.map((project: Project) => (
            <ListGroup.Item key={project.id} className='d-flex justify-content-between px-5 py-3'>
              <div>
                {project.name}
              </div>
              <div className='text-center'>
                Status:&nbsp;
                {project.status === 'NotStarted' ? 'Not Started' : project.status}
              </div>
              <Link to={`project/${project.id}`} className='btn btn-outline-info'>Details</Link>
            </ListGroup.Item>

          ))
        }
      </ListGroup>
    </div>
  )
}