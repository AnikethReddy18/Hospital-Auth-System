import bcrypt from "bcrypt"
import { createAdmin, getAdmin } from "../queries.js"
import jwt from "jsonwebtoken"

export async function signupController(req, res){
    const { name, password } = req.body
    const hashedPassword = await bcrypt.hash(password, 10);

    await createAdmin(name, hashedPassword)
    res.sendStatus(200)
}

export async function loginController(req, res){
    const { name, password } = req.body

    const admin = await getAdmin(name)
    if(admin === null) return res.sendStatus(401)
    
    const validPassword = await bcrypt.compare(password, admin.password)
    if(!validPassword) return res.sendStatus(401)
        
    jwt.sign(admin, process.env.SECRET_KEY, (err, token)=>{
        res.json({token})
    })    
}
