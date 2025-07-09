import dotenv from 'dotenv';
import connectDB from './db/index.js';
import { app } from './app.js';

dotenv.config({
  path: './env'
});

const PORT = process.env.PORT || 8000;

app.on("error", (error) => {
  console.log("❌ App Error:", error);
  process.exit(1);
});

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`🏃‍➡️ Server is running at port ${PORT}`);
    });
  })
  .catch((err) => {
    console.log("❌ MongoDB Connection failed!", err);
    process.exit(1);
  });
