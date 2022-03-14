import AsyncHandler from "express-async-handler";
import Product from "../models/productModel.js"
import Order from "../models/orderModel.js"
//@des  create new order
//@route POST /api/orders
//@access private

const addOrderItems =AsyncHandler(async(req,res)=>{
    console.log(req.body);
   const {
       orderItems,
       shippingAddress,
       paymentMethod,
       itemsPrice,
       taxPrice,
       shippingPrice,
       totalPrice,
   }=req.body


   if(orderItems && orderItems.length===0)
   {
       res.status(400)
       throw new Error('No order items')
   }
   else{
       const order=new Order({
        orderItems,
        user:req.user._id,
        shippingAddress,
        paymentMethod,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
       })
       const createdOrder=await order.save()

       res.status(201).json(createdOrder)
   }
})
//@des  get order by id
//@route POST /api/orders/:id
//@access private

const getOrderById =AsyncHandler(async(req,res)=>{
    const id=req.params.id;
   const order =await  Order.findById(id).populate('user', 'name email')
   if(order)
   {
       res.json(order)
   }
   else{
       res.status(404)
       throw new Error('Order not found')
   }
       
})
export {addOrderItems,getOrderById};
