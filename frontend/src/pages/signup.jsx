import { useState } from "react";
import apiClient from "../apiClient";
import { useNavigate } from "react-router-dom"

function Signup() {
    const [name, setName] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPass, setConfirmPass] = useState('')
    const [error, setError] = useState('')

    const navigate = useNavigate()

    function handelConfPassChange(e){
        setConfirmPass(e.target.value)
        password === e.target.value ? setError("") : setError("Passwords do not match")
    }

    async function handleFormSubmission(e){
        e.preventDefault()

        const response = await apiClient.post("/signup", {name, password}, 
            {headers: { 'Content-Type': 'application/x-www-form-urlencoded' }}
        )
        if(response.status == 200) navigate('/login')
    }

    return ( <>
    <form onSubmit={handleFormSubmission}>
        <input type="text" placeholder="Hospital(Admin) Name" onChange={(e)=>setName(e.target.value)}/>
        <input type="password" placeholder="Password" onChange={(e)=>setPassword(e.target.value)}/>
        <input type="password" placeholder="Confirm Password" onChange={handelConfPassChange}/>
        {error}
        <button>Signup</button>
    </form>
    </> );
}

export default Signup;