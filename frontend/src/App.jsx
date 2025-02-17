import { useState, useEffect } from 'react'
import { useNavigate } from "react-router-dom"
import './App.css'
import LatestLogs from './components/latestLogs'


function App() {
  const [count, setCount] = useState(0)
  const [employees, setEmployees] = useState([])
  const [rooms, setRooms] = 

  const navigate = useNavigate()

  useEffect(()=>{
    if(!localStorage.getItem('token')) navigate("/signup")
  }, [])

  return (<>
  <LatestLogs />
  </>)
}

export default App
