import { useState } from "react";
import apiClient from '../apiClient'
import { useNavigate } from "react-router-dom";

function Login() {
    const [name, setName] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')

    const navigate = useNavigate()

    function handleWrongData() {
        setName('')
        setPassword('')
        setError('Wrong Admin Name or Password')
    }

    async function handleLogin(e) {
        e.preventDefault()

        try {
            const response = await apiClient.post('/login', { name, password }, {
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
            })

            const token = response.data.token
            localStorage.setItem("token", token)
            navigate('/')
        } catch (e) {
            handleWrongData()
        }
    }

    return (<>
        <form onSubmit={handleLogin}>
            <input type="text" placeholder="Admin Name" value={name} onChange={(e) => setName(e.target.value)} />
            <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
            <button>Login</button>
            {error}
        </form>
    </>);
}

export default Login;