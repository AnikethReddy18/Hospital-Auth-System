import { useState, useEffect } from 'react'
import { useNavigate, Link } from "react-router-dom"
import './App.css'
import LatestLogs from './components/latestLogs'
import apiClient from './apiClient'


function App() {
  const [count, setCount] = useState(0)
  const [employees, setEmployees] = useState([])
  const [rooms, setRooms] = useState([])

  const navigate = useNavigate()

  useEffect(() => {
    if (!localStorage.getItem('token')) navigate("/signup")

    async function getData() {
      const empResponse = await apiClient.get('/employees', {
        headers: { Authorization: 'Bearer ' + localStorage.getItem('token') }
      })

      const roomResponse = await apiClient.get('/rooms', {
        headers: { Authorization: 'Bearer ' + localStorage.getItem('token') }
      })

      setEmployees(empResponse.data)
      setRooms(roomResponse.data)
    }

    getData()

  }, [])

  return (<>
    <LatestLogs />
    {employees.map((value, index)=><Link to={"/logs/emp/"+value.id} key={index}>{value.name}</Link>)}
    {rooms.map((value, index)=><Link to={"/logs/room/"+value.id} key={index}>{value.name}</Link>)}
  </>)
}

export default App
