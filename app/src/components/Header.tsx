import reactLogo from '../assets/react.svg'

export default function Header () {

  return (
    <header className='d-flex mt-5 container ps-4'>
      <h1 className='d-inline-flex gap-3 align-items-center mb-0'>
        <img src={reactLogo} className="logo react" alt="React logo" />
        <span>Management System</span>
      </h1>
    </header>
  )
}
