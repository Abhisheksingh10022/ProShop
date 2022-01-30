import express from "express";
import dotenv from "dotenv";
import products from "./Data/products.js";
import connectDB from "./config/DB.js";
import ProductRouters from "./Routers/ProductRouters.js"
dotenv.config();

connectDB();//connecting mongodb
const app =express();
app.get("/",(req,res)=>{
   res.send("running");
});

app.use("/api/products",ProductRouters);

 const PORT=process.env.PORT;
app.listen(PORT,console.log(`server running in ${process.env.NODE_ENV} on port ${PORT}`))