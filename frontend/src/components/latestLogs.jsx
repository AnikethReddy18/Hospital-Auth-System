import { useState, useEffect } from "react";
import apiClient from "../apiClient"

function LatestLogs() {
    const [logs, setLogs] = useState([])

    useEffect(() => {
        async function getLogs() {
            const response = await apiClient.get('/log', {
                headers: { Authorization: 'Bearer ' + localStorage.getItem('token') }
            })

            const data = response.data.logs.map((log) => [log.employeeId, log.employee.name, new Date(log.timestamp).toLocaleDateString(), log.roomId, log.room.name])
            setLogs(data.slice(0, 10))
        }

        getLogs()
    }, [])

    return (<>
        Last 10 Logs:
        {logs.map((value, index) => {
            return <div key={index}>{value[0] + ' ' +  value[1] + ' ' + value[2] + ' ' + value[4]}</div>
        })}
    </>);
}

export default LatestLogs;