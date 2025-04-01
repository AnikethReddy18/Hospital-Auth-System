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
    <div className="container">
      <h1 className="section-title">Employees</h1>
      <div className="grid">
        {employees.map((value) => (
          <Link to={"/logs/emp/" + value.id} key={value.id} className="card emp-card">
            {value.name}
          </Link>
        ))}
      </div>
  
      <h1 className="section-title">Rooms</h1>
      <div className="grid">
        {rooms.map((value) => (
          <Link to={"/logs/room/" + value.id} key={value.id} className="card room-card">
            {value.name}
          </Link>
        ))}
      </div>
    </div>
    <LatestLogs />
  </>
  
  )
}

export default App
