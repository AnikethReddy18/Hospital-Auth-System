import { useState } from "react";
import apiClient from '../apiClient'
import { useNavigate } from "react-router-dom";

function CreateEmployee() {
    const [name, setName] = useState('')
    const [id, setId] = useState('')
    const [email, setEmail] = useState('')
    const [role, setRole] = useState('')

    const navigate = useNavigate()

    async function handleFormSubmission(e) {
        e.preventDefault()

        const response = await apiClient.post('/employee', { name, id, email, role }, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                Authorization: 'Bearer ' + localStorage.getItem('token')
            }

        })

        if (response.status == 200) navigate('/')
    }

    return (<>
        <form onSubmit={handleFormSubmission}>
            <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
            <input type="text" placeholder="ID" value={id} onChange={(e) => setId(e.target.value)} />
            <input type="text" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
            <input type="text" placeholder="Role" value={role} onChange={(e) => setRole(e.target.value)} />
            
            <button>Create Employee</button>
        </form>
    </>);    
}

export default CreateEmployee;