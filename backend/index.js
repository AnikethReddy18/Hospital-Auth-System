import express, { urlencoded } from "express"
import cors from "cors"
import routes from "./routers/router.js"

const app = express();
const PORT = process.env.PORT || 3000
app.use(urlencoded({extended: true}))
app.use(cors())

app.use(routes.authRouter)
app.use(routes.homeRouter)

app.listen(PORT, ()=>console.log("Listening at http://localhost:"+PORT))