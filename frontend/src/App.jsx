import React, { useEffect } from 'react'
import Navbar from './components/Navbar.jsx'
import HomePage from './pages/HomePage.jsx'
import SignUpPage from './pages/SignUpPage.jsx'
import LoginPage from './pages/LoginPage.jsx'
import SettingsPage from './pages/SettingsPage.jsx'
import ProfilePage from './pages/ProfilePage.jsx'
import { Routes, Route, Navigate } from 'react-router-dom'
import { useAuthState } from './global/globalState.js'
import {Loader} from 'lucide-react'
const App = () => {
  const { authUser, checkAuth, isCheckingAuth } = useAuthState()

  useEffect(() => {
    checkAuth();
  }, [checkAuth])

  if (isCheckingAuth && !authUser) {
    return (
      <div className='flex justify-center items-center h-screen'>
        <Loader className='size-10 animate-spin' />
      </div>
    )
  }
  return (
    <div className='w-full h-full'>
      {/* <Navbar/> */}
      <Routes>
        <Route path='/' element={authUser? <HomePage /> : <Navigate to= '/login'/>} />
        <Route path='/signup' element={<SignUpPage />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/settings' element={<SettingsPage />} />
        <Route path='/profile' element={<ProfilePage />} />
      </Routes>
    </div>
  )
}
export default App