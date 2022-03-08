import React ,{useEffect}from "react";
import { Link } from "react-router-dom";
import { useDispatch,useSelector } from "react-redux";
import {Row,Col,ListGroup,Image,Form,Button,Card}from 'react-bootstrap'
import { addToCart } from "../Actions/CartActions";
import { useParams } from "react-router-dom";
import Message from "../Components/Message";

const CartScreen=()=>{
const {_id}=useParams();
const productId=_id;

const queryParams=new URLSearchParams(window.location.search);

const qty=queryParams.get("qty");//getting query params from url

const dispatch=useDispatch();
const cart=useSelector(state=>state.cart);
const {cartItems}=cart;
console.log(cartItems);
useEffect(()=>{
    if(productId)
    {
      dispatch(addToCart(productId,qty));
    }

},[dispatch,productId,qty])
const removeFromCartHandler=(id)=>{
    console.log('remove item');
}

    return (
    <Row>
       <Col md={8}>
           <h1>Shopping cart</h1>
           {cartItems.length===0?<Message>Your cart is empty<Link to='/'>Go Back</Link></Message>
           :(
               <ListGroup variant="flush">
                   {cartItems.map(item=>(
                   <ListGroup.Item key={item.product}>
                   <Row>
                       <Col md={2}>
                           <Image src={item.image} alt={item.name} fluid rounded />
                       </Col>
                       <Col md={3}>
                           <Link to={`/product/${item.product}`}>{item.name}</Link>
                       </Col>
                       <Col md={2}>
                           ${item.price}
                       </Col>
                       <Col md={2}>
                       <Form.Control as='select' value={qty} onChange={(e)=>
                      dispatch(addToCart(item.product,Number(e.target.value)))}>
                     {
                          [...Array(item.countinstock).keys()].map((x) =>(
                          <option key={x+1} value={x+1}>{x+1}</option>
                          ))
                       }
                      </Form.Control>   
                       </Col>
                       <Col md={2}>
                           <Button type='button' variant="light" onClick={()=>removeFromCartHandler}><i className="fas fa-trash"></i></Button>
                       </Col>
                   </Row>
                   </ListGroup.Item>))}
               </ListGroup>
           )}
       </Col>
       <Col>
       </Col>
       </Row>
    )
}
export default CartScreen;