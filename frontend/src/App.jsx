import React, { useEffect } from 'react'
import Navbar from './components/Navbar.jsx'
import HomePage from './pages/HomePage.jsx'
import SignUpPage from './pages/SignUpPage.jsx'
import LoginPage from './pages/LoginPage.jsx'
import SettingsPage from './pages/SettingsPage.jsx'
import ProfilePage from './pages/ProfilePage.jsx'
import { Routes, Route } from 'react-router-dom'
import { useAuthState } from './global/globalState.js'
const App = () => {
  const { authUser, checkAuth } = useAuthState()

  useEffect(() => {
    checkAuth();
  },[])

  return (
    <div className='w-full h-full'>
      {/* <Navbar/> */}
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/signup' element={<SignUpPage />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/settings' element={<SettingsPage />} />
        <Route path='/profile' element={<ProfilePage />} />
      </Routes>
    </div>
  )
}
export default App