const express=require('express');
const app =express();
const products=require("./Data/products");

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
 
app.listen(5000,console.log('server running on port 5000'))