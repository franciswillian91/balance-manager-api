import express from "express";

import routes from './routes.js' 

const appPort = 3000

const app = express()

app.use(express.json())

app.use(routes)

app.listen(appPort,()=>{
    console.log(`API Server running on port [${appPort}].`)
})