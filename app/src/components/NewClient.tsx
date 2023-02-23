import { useMutation } from "@apollo/client"
import { ChangeEvent, SyntheticEvent, useEffect, useState } from "react"
import { Button, Modal } from "react-bootstrap"
import { HiOutlineX } from 'react-icons/hi'
import { ADD_CLIENT } from "../graphql/mutations"
import { ALL_CLIENTS } from "../graphql/queries"

interface Props {
  variables: {
    name: string
    email: string
    phone: string
  }
}

export default function NewClient ({ show, handleCloseClientForm, addClient }: { show: boolean, handleCloseClientForm: () => void, addClient: (args: Props) => void }) {
  const [name, setName] = useState<string | null>(null)
  const [email, setEmail] = useState<string | null>(null)
  const [phone, setPhone] = useState<string | null>(null)


  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target
    switch (id) {
      case 'nameClientForm':
        setName(value)
        break
      case 'emailClientForm':
        setEmail(value)
        break
      case 'phoneClientForm':
        setPhone(value)
        break
      default: break
    }
  }

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault()
    if (name && email && phone) {
      addClient({
        variables: { name, email, phone }
      })
      handleCloseClientForm()
    }
  }
  return (
    <Modal
      show={show}
      centered
      className=''
    >
      <Modal.Header>
        <Modal.Title className='d-flex justify-content-between align-items-center px-2 w-100'>
          Add New Client
          <HiOutlineX className="close-btn" onClick={handleCloseClientForm} />
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form className='d-flex flex-column' onSubmit={handleSubmit}>
          <label htmlFor="nameClientForm">Name:</label>
          <input className='p-2' onChange={handleChange} type="text" id='nameClientForm' required />
          <label htmlFor="" className='mt-3'>Email:</label>
          <input className='p-2' onChange={handleChange} type="text" id='emailClientForm' required />
          <label htmlFor="" className='mt-3'>Phone Number:</label>
          <input className='p-2' onChange={handleChange} type="text" id='phoneClientForm' required />
          <button className='btn btn-success position-relative mt-4' style={{ width: 'fit-content', left: '50%', transform: 'translateX(-50%)' }}>Add Client</button>
        </form>
      </Modal.Body>
    </Modal>
  )
}
