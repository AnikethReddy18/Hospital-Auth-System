import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import apiClient from '../apiClient'

function LogsOfRoom() {
    const params = useParams()
    const [logs, setLogs] = useState([])

    useEffect(() => {
        async function getLogs() {
            const response = await apiClient.get('/log/room/' + params.id, {
                headers: { Authorization: 'Bearer ' + localStorage.getItem('token') }
            })

            const data = response.data.logs.map((log) => ({
                employeeId: log.employeeId,
                employeeName: log.employee.name,
                date: new Date(log.timestamp).toLocaleDateString(),
                roomId: log.roomId,
                roomName: log.room.name,
            }));
            setLogs(data)
        }
        getLogs()
    }, [])

    return (<div className="logs-container">
        <h3 className="logs-title">Room Logs</h3>
        {logs.length === 0 ? (
            <div className="no-logs">No logs available.</div>
        ) : (
            <ul className="logs-list">
                {console.log(logs)}
                {logs.map((log, index) => (
                    <li key={index} className="log-item">
                        <strong>{log.employeeName}</strong> {log.date} - {log.roomName}
                    </li>
                ))}
            </ul>
        )}
    </div>);
}

export default LogsOfRoom;