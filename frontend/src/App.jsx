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
    <h1>Employees:</h1>

    <div className="employees">
      {employees.map((value, index)=><Link to={"/logs/emp/"+value.id} key={index}>{value.name}</Link>)}
    </div>

    <h1>Rooms:</h1>
    <div className="rooms">
      {rooms.map((value, index)=><Link to={"/logs/room/"+value.id} key={index}>{value.name}</Link>)}
    </div>

    <h1>Add:</h1>
    <Link to="/create/room">Add Room</Link>
    <br></br>
    <Link to="/create/emp">Add Employee</Link>
  </>)
}

export default App
