import { useState, useEffect } from "react";
import apiClient from "../apiClient";

function LatestLogs() {
    const [logs, setLogs] = useState([]);

    useEffect(() => {
        async function getLogs() {
            const response = await apiClient.get("/log", {
                headers: { Authorization: "Bearer " + localStorage.getItem("token") },
            });

            const data = response.data.logs.map((log) => ({
                employeeId: log.employeeId,
                employeeName: log.employee.name,
                date: new Date(log.timestamp).toLocaleDateString(),
                roomId: log.roomId,
                roomName: log.room.name,
            }));

            setLogs(data.slice(0, 10));
        }

        getLogs();
    }, []);

    return (
        <div className="logs-container">
            <h3 className="logs-title">Latest 10 Logs</h3>
            {logs.length === 0 ? (
                <div className="no-logs">No logs available.</div>
            ) : (
                <ul className="logs-list">
                    {logs.map((log, index) => (
                        <li key={index} className="log-item">
                            <strong>{log.employeeName}</strong> {log.date} - {log.roomName}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default LatestLogs;
