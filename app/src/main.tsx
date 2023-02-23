import React from 'react'
import ReactDOM from 'react-dom/client'
import Home from './pages/Home'
import 'bootstrap/dist/css/bootstrap.min.css'
import './styles.css'
import { ApolloProvider } from '@apollo/client'
import { client } from './graphql/client'
import {
  createBrowserRouter,
  RouterProvider
} from "react-router-dom"
import ProjectPage from './pages/ProjectPage'
import ClientPage from './pages/ClientPage'
import Header from './components/Header'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />
  },
  {
    path: 'project/:projectID',
    element: <ProjectPage />
  },
  {
    path: 'client/:clientID',
    element: <ClientPage />
  }
])

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <Header />
      <RouterProvider router={router} />
    </ApolloProvider>
  </React.StrictMode>,
)
