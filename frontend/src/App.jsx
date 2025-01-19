import React, { useEffect } from 'react'
import Navbar from './components/Navbar.jsx'
import HomePage from './pages/HomePage.jsx'
import SignUpPage from './pages/SignUpPage.jsx'
import LoginPage from './pages/LoginPage.jsx'
import SettingsPage from './pages/SettingsPage.jsx'
import ProfilePage from './pages/ProfilePage.jsx'
import { Routes, Route, Navigate } from 'react-router-dom'
import { useAuthState } from './global/useUserState.js'
import {Loader} from 'lucide-react'
import { ToastContainer } from'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const App = () => {
  const { authUser, checkAuth, isCheckingAuth } = useAuthState()

  useEffect(() => {
    checkAuth()
  }, [checkAuth])

  if (isCheckingAuth && !authUser) {
    return (
      <div className='flex justify-center items-center h-screen'>
        <Loader className='size-10 animate-spin' />
      </div>
    )
  }
  return (
    <div className ='h-screen'>
      {authUser ? (<Navbar />) : (<></>) }
      <ToastContainer position='top-left' autoClose='3000' pauseOnHover='true' />
      <Routes>
        <Route path='/' element={authUser? <HomePage /> : <Navigate to= '/login'/>} />
        <Route path='/signup' element={!authUser ? <SignUpPage /> : <Navigate to = '/'/>} />
        <Route path='/login' element={!authUser ? <LoginPage /> : <Navigate to = '/'/>} />
        <Route path='/settings' element={<SettingsPage />} />
        <Route path='/profile' element={authUser ? <ProfilePage /> : <Navigate to = '/login'/>} />
      </Routes>
    </div>
  )
}
export default App