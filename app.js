const express =require('express')
const cors  =require('cors')
const app = express()
app.use(cors())

const cookieParser = require('cookie-parser')
const errorMiddleware =require("./middleware/error")

app.use(express.json())
app.use(cookieParser())

const userRoutes = require("./routes/userRoutes/userRoutes")
const adminRoutes = require("./routes/adminRoutes/adminRoutes")
const sellerRoutes = require("./routes/sellerRoutes/sellerRoutes")
const productAdminRoutes = require("./routes/adminRoutes/productRoutes")
const productSellerRoutes = require("./routes/sellerRoutes/productRoutes")




const categoryRoutes = require("./routes/adminRoutes/categoryRoutes")

const attributeRoutes = require("./routes/adminRoutes/attributeRoutes")




// uses of routes or make api 

app.use("/api/flippy/v1/",userRoutes)
app.use("/api/flippy/v1/",adminRoutes)
app.use("/api/flippy/v1/",sellerRoutes)
app.use("/api/flippy/v1/",productAdminRoutes)
app.use("/api/flippy/v1/",productSellerRoutes) 
app.use("/api/flippy/v1/",categoryRoutes)
app.use("/api/flippy/v1/",attributeRoutes)



  




app.use(errorMiddleware)


module.exports = app 