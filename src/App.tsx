import Canvas from 'components/Canvas'
import Settings from 'components/Settings'
import ToolBar from 'components/ToolBar'

import './styles/app.scss'

function App() {
  return (
    <div className='app'>
      <ToolBar />
      <Settings />
      <Canvas />
    </div>
  )
}

export default App
