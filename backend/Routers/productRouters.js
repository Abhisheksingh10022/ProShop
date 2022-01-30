import express from "express";
import AsyncHandler from "express-async-handler";
const router=express.Router();
import Product from '../models/productModel.js';


//@description  Fetch all products
//@route  GET/api/products
//@public
router.get('/',AsyncHandler(async (req,res)=>{
  const products=await Product.find({});

    return res.json(products);
}));
//@description  Fetch asingle products
//@route  GET/api/products:id
//@public
router.get('/:id',AsyncHandler(async(req,res)=>{
  const pq=req.params.id;
const product=await Product.findById(pq);
if(product)
{
res.json(product);
}
else{
    res.status(404).json({message:'product not found'})
}
}));
export default router;