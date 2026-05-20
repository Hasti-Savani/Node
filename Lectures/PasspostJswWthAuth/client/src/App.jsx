import './App.css'
import { useEffect } from 'react';
import {  Routes, Route, useNavigate } from 'react-router-dom'
import Login from './components/Login'
import Register from './components/Register';
import Profile from './pages/Profile';

function App() {

  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const token = params.get('token')
    if (!token) console.log("Access Denied");
    
    if (token) {
      localStorage.setItem("token", token)
      window.location.replaceState({}, '', '/profile')
      navigate("/profile")
    }
  })

  return (
    <>
        <Routes>
          <Route path='/' element={<h1>Welcome to my home page</h1>} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/profile' element={<Profile />} />
        </Routes>
    </>
  )
}

export default App
