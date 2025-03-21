import React, { useEffect } from 'react'
import { Routes } from 'react-router-dom'
import { Route } from 'react-router-dom'
import Navbar from './components/Navbar.jsx'
import ProfilePage from './pages/ProfilePage.jsx'
import SettingsPage from './pages/SettingsPage.jsx'
import LoginPage from './pages/LoginPage.jsx'
import SignUpPage from './pages/SignUpPage.jsx'
import HomePage from './pages/HomePage.jsx'
import { useAuthStore } from './store/useAuthStore.js'
const App = () => {
  const {authUser,checkAuth}=useAuthStore()
  useEffect(()=>{
    checkAuth()
  },[checkAuth]);
  console.log({authUser});
  return (
<div>
  <Navbar/>
  <Routes>
    <Route path="/" element={<HomePage/>}/>
    <Route path="/signup" element={<SignUpPage/>}/>
    <Route path="/login" element={<LoginPage/>}/>
    <Route path="/settings" element={<SettingsPage/>}/>
    <Route path="/profile" element={<ProfilePage/>}/>
  </Routes>
</div>

  )
}

export default App