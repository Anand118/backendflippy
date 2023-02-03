const app= require('./app')
const DatabaseConn = require("./config/database")






const dotenv =require("dotenv")
dotenv.config({path:"./config/config.env"})
const PORT = process.env.PORT

DatabaseConn()
    


const server = app.listen(PORT, ()=>{
    console.log("connection succesfull")
}) 

 
