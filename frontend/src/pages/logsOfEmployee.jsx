import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import apiClient from '../apiClient'

function LogsOfEmployee() {
    const params = useParams()
    const [logs, setLogs] = useState([])
    const [empData, setEmpData] = useState({name: "Employee Name", role: "Employee Role"})

    useEffect(()=>{
        async function getLogs(){
            const response = await apiClient.get('/log/emp/'+params.id,{
                headers: { Authorization: 'Bearer ' + localStorage.getItem('token') }
            })

            setEmpData({name: response.data.logs[0].employee.name, role: response.data.logs[0].employee.role})

            const data = response.data.logs.map((log) => ({
                date: new Date(log.timestamp).toLocaleDateString(),
                roomName: log.room.name,
            }));

            setLogs(data)
        }
        getLogs()
    }, [])

    return (<div className="logs-container">
        <h3 className="logs-title">{empData.name}'s Logs ({empData.role})</h3>
        {logs.length === 0 ? (
            <div className="no-logs">No logs available.</div>
        ) : (
            <ul className="logs-list">
                {logs.map((log, index) => (
                    <li key={index} className="log-item">
                        <strong> {log.date} - {log.roomName}</strong>
                    </li>
                ))}
            </ul>
        )}
    </div> );
}

export default LogsOfEmployee;