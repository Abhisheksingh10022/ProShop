import AsyncHandler from "express-async-handler";
import Product from "../models/productModel.js"


const getProducts=AsyncHandler(async(req,res)=>{
const products=await Product.find({});
res.json(products);
})

const getProductById=AsyncHandler(async(req,res)=>{
    const product=await Product.findById(req.params.id);
    if(product)
    {
        res.json(product);
    }
    else{
        res.status(404)
        throw new Error('product not found');
    }
})
//@desc delete a product
//route DELETE /api/products/:id
//@access Private/Admin
const deleteProduct=AsyncHandler(async(req,res)=>{
    const product=await Product.findById(req.params.id);
    if(product)
    {
        await product.remove()
        res.json({message:'product removed'})
    }
    else{
        res.status(404)
        throw new Error('product not found');
    }
})
//@desc update a product
//route  PUT/api/products/:id
//@access Private/Admin
const updateProduct=AsyncHandler(async(req,res)=>{
  const {name,price,description,image,brand,category,countInStock}=req.body
  const product=await Product.findById(req.params.id)
  if(product)
  {
      product.name=name
      product.price=price
      product.description=description
       product.image=image
       product.brand=brand
       product.category=category
       product.countInStock=countInStock

    const updatedProduct=await product.save()
    res.json(updatedProduct)
  }
  else{
      res.status(404)
      throw new Error('Product not found')
  }

})

//@desc  create a product
//route  POST/api/products
//@access Private/Admin
const createProduct=AsyncHandler(async(req,res)=>{
    const product=new Product({
        name:'Sample name',
        price :0,
        user:req.user._id,
        image:'/images/sample/jpg',
        brand:'Sample brand',
        category:'Sample category',
        countInStock:0,
        numReviews:0,
        description:'Sample description'
  
    })
  
    const createdProduct=await product.save()
    res.status(201).json(createdProduct)
  })

export {updateProduct,  createProduct,getProductById,getProducts,deleteProduct};