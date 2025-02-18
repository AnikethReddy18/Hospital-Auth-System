import { useState } from "react";
import apiClient from '../apiClient'
import { useNavigate } from "react-router-dom";


function CreateRoom() {
    const [name, setName] = useState('')
    const [allowedRoles, setAllowedRoles] = useState('')

    const navigate = useNavigate()

    async function handleFormSubmission(e) {
        e.preventDefault()

        const response = await apiClient.post('/room', { name, allowedRolesRaw: allowedRoles }, {
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
            <input type="text" placeholder="Allowed Roles" value={allowedRoles} onChange={(e) => setAllowedRoles(e.target.value)} />
            <button>Create Room</button>
        </form>
    </>);
}

export default CreateRoom;