import dotenv from 'dotenv'
import connectDB from './db/index.js'


dotenv.config({
    path: './env'
})

const PORT = process.env.PORT || 8000

app.on("error", (error) => {
    console.log("App Error:", error)
    process.exit(1);
})

connectDB()
    .then((PORT) => {
        console.log("🏃‍➡️ Server in running at port", { PORT })
    })
    .catch((err) => {
        console.log("MONGO DB Connection failed !!!", err)
    })

