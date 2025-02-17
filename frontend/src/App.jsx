import { useState, useEffect } from 'react'
import { useNavigate } from "react-router-dom"
import './App.css'

function App() {
  const [count, setCount] = useState(0)
  const navigate = useNavigate()

  useEffect(()=>{
    if(!localStorage.getItem('token')) navigate("/signup")
  }, [])

  return (<>Home</>)
}

export default App
