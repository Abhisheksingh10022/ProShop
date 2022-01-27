import express from "express";
import dotenv from "dotenv";
import products from "./Data/products.js";
import connectDB from "./config/DB.js"
dotenv.config();

connectDB();
const app =express();
app.get("/",(req,res)=>{
   res.send("running");
});
app.get('/api/products',(req,res)=>{
    return res.json(products);
})
app.get('/api/products/:id',(req,res)=>{
  const pq=req.params.id;
 products.map((p)=>{
if(p._id===pq)
{
    return res.json(p);
}
}

)

});
 const PORT=process.env.PORT;
app.listen(PORT,console.log(`server running in ${process.env.NODE_ENV} on port ${PORT}`))