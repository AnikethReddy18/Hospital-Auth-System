import jwt from "jsonwebtoken"

export function verifyToken(req, res, next){
    const bearerHeader = req.headers['authorization']
    if(bearerHeader === undefined) return res.json({"error": "Attach Token"})

    const bearer = bearerHeader.split(' ')
    const token = bearer[1]

    jwt.verify(token, process.env.SECRET_KEY, (err, authData)=>{
        if(err) return res.sendStatus(401)

        req.user = authData
        next()    
    })
}