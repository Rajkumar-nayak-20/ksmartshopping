import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
dotenv.config()
import cookieParser from 'cookie-parser'
import morgan from 'morgan'
import helmet from 'helmet'
import sendEmail from './config/sendEmail.js'

import connectDB from './config/connectDB.js'
import userRouter from './route/user.route.js'
import categoryRouter from './route/category.route.js'
import uploadRouter from './route/upload.router.js'
import subCategoryRouter from './route/subCategory.route.js'
import productRouter from './route/product.route.js'
import cartRouter from './route/cart.route.js'
import addressRouter from './route/address.route.js'
import orderRouter from './route/order.route.js'

const app = express()

/* 
   MIDDLEWARES */

app.use(express.json())
app.use(cookieParser())
app.use(morgan("dev"))
app.use(
  helmet({
    crossOriginResourcePolicy: false
  })
)

/* 
   CORS CONFIG (FIXED)
 */

app.use(
  cors({
    origin: (origin, callback) => {
      const allowedOrigins = [
        process.env.FRONTEND_URL,
        "http://localhost:5173",
        "http://localhost:5174",
        //  "https://ksmartshopping-x5s7.vercel.app" 
      ]//allowed origins me hum frontend ke url ko add karte hai taki hum backend se frontend ke request ko allow kar sake
      //cors me origin ka use isliye karte hai taki hum backend se frontend ke request ko allow kar sake aur callback ka use isliye karte hai taki hum cors ke error ko handle kar sake

      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true)
      } else {
        callback(new Error("Not allowed by CORS"))
      }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"]//allowed headers me hum content-type aur authorization header ko allow karte hai taki hum backend se frontend ke request me in headers ko use kar sake
  })
)

app.options("*", cors())

/*ROUTE*/

const PORT = process.env.PORT || 8181

app.get("/", (req, res) => {
  res.json({
    message: "Server is running on port " + PORT
  })
})

app.use('/api/user', userRouter)
app.use("/api/category", categoryRouter)
app.use("/api/file", uploadRouter)
app.use("/api/subcategory", subCategoryRouter)
app.use("/api/product", productRouter)
app.use("/api/cart", cartRouter)
app.use("/api/address", addressRouter)
app.use('/api/order', orderRouter)

/* SERVER START */

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log("Server running on port", PORT)
  })
})
