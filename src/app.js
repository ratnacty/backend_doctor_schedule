import express from "express";
import router from "./routes/router.js";
import cors from "cors";
import cookieParser from "cookie-parser";


const app = express();

// app.use(
//   cors({
//     origin: "http://localhost:5173", // React frontend URL
//     credentials: true,
//   })
// );

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:5173"); 
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, OPTIONS"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.setHeader("Access-Control-Allow-Credentials", true);
  next();
});
app.use(cookieParser());
app.use(express.json());

// const cors = require('cors');
// const cors = require('cors');



app.use(router);

export default app;
