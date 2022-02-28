import React ,{useEffect}from "react";
import { Link } from "react-router-dom";
import { useDispatch,useSelector } from "react-redux";
import {Row,Col,ListGroup,Image,Form,Button,Card}from 'react-bootstrap'
import { addToCart } from "../Actions/CartActions";
import { useParams } from "react-router-dom";
const CartScreen=()=>{
const {_id}=useParams();
const productId=_id;

const queryParams=new URLSearchParams(window.location.search);

const qty=queryParams.get("qty");//getting query params from url

const dispatch=useDispatch();
const cart=useSelector(state=>state.cart);
const {cartItems}=cart;
useEffect(()=>{
    if(productId)
    {
      dispatch(addToCart(productId,qty));
    }

},[dispatch,productId,qty])
console.log(qty);
    return (
        <>
       <div>
           <h1>Cart</h1>
       </div>
        </>
    )
}
export default CartScreen;