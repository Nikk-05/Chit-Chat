import { useState } from 'react'
import {Box} from '@chakra-ui/react'
import './App.css'
import { Route, Routes } from'react-router-dom'
import Homepage from './pages/Homepage.jsx'
import Chatpage from './pages/Chatpage.jsx'
import ResetPassword from './components/ResetPassword.jsx'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className='App'>
      <Routes>
        <Route exact path='/' element={<Homepage/>} />
        <Route exact path='/chat' element={<Chatpage/>} />
        <Route path = '/reset-password' element={<ResetPassword/>} />
      </Routes>
    </div>
  )
}

export default App
