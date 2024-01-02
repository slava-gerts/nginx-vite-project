import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom'

import Canvas from 'components/Canvas'
import Settings from 'components/Settings'
import ToolBar from 'components/ToolBar'
import {ModalForm} from 'components/ModalForm'

import './styles/app.scss'

function App() {

  const router = createBrowserRouter([
    {
      path: '/:id',
      element: (
        <div className='app'>
          <ToolBar />
          <Settings />
          <Canvas />
          <ModalForm isOpen={true}>Message</ModalForm>
        </div>
      )
    },
    {
      path: '*',
      element: <Navigate to={`/${Date.now().toString(16)}`} />
    }
  ])

  return <RouterProvider router={router} />
}

export default App
