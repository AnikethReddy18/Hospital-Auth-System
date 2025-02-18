import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import apiClient from '../apiClient'

function LogsOfRoom() {
    const params = useParams()
    const [logs, setLogs] = useState()

    useEffect(()=>{
        async function getLogs(){
            const response = await apiClient.get('/log/room/'+params.id,{
                headers: { Authorization: 'Bearer ' + localStorage.getItem('token') }
            })

            const data = response.data.map((log) => [log.employeeId, log.employee.name, new Date(log.timestamp).toLocaleDateString(), log.roomId, log.room.name])
            setLogs(data)
        }
        getLogs()
    }, [])

    return ( <>
    {logs && logs.map((value, index) => {
            return <div key={index}>{value[0] + ' ' +  value[1] + ' ' + value[2] + ' ' + value[4]}</div>
        })}
    </> );
}

export default LogsOfRoom;