import axios from 'axios'
import React from 'react'
import { CART_ADD_ITEM } from '../Constants/CartConstants'
export const addToCart=(id,qty)=>async(dispatch,getState)=>{
const {data}=await axios.get(`api/products/${id}`)
console.log(data);
dispatch({
    type:CART_ADD_ITEM,
    payload:{
        product:data._id,
        name:data.name,
        image:data.image,
        price:data.price,
        countInstock:data.countInstock,
        qty
    }
})
localStorage.setItem('cartItems',JSON.stringify(getState().cart.cartItems))
}