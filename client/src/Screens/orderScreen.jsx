import React,{useEffect} from "react";
import {Button,Row,Col,ListGroup,Image,Card} from "react-bootstrap";
import {useDispatch,useSelector} from "react-redux";
import Message from "../Components/Message";
import { Link,useParams } from "react-router-dom";
import { getOrderDetail } from "../Actions/orderActions";
import Loader from "../Components/loader";


const OrderScreen=()=>{
   const dispatch=useDispatch();

  const{id}=useParams();
  console.log(id)
  const  orderDetail=useSelector((state)=>state.orderDetail)
   const {order}=orderDetail;
const {Loading}=orderDetail;
  console.log(order)
   if(!Loading)
   {
  const addDecimals=(num)=>{
   return (Math.round(num*100)/100).toFixed(2)
  }

order.itemsPrice=addDecimals(order.orderItems.reduce((acc,item)=>acc+item.price*item.qty,0))
   }



   useEffect(()=>{
      dispatch(getOrderDetail(id));
   },[dispatch,id])
   return (
      <>
    {(!Loading)&&
    <Row >
         <Col md={8}>
        
        <ListGroup variant='flush'>
            <ListGroup.Item>
               <h2>Shipping</h2>
              <p> <strong>Name:</strong>{order&&order.user.name}</p>
               <p><strong>Email:</strong>{' '}
               <a href={`mailto:${order.user.email}`}>{order.user.email}</a></p>
               <p>
                   <strong>Address:</strong>
                   {order&&order.shippingAddress.address},{order&&order.shippingAddress.city}{' '}
                   {order&&order.shippingAddress.postalCode},{' '}
                   {order&&order.shippingAddress.country}
               </p>
               
            </ListGroup.Item>
            <ListGroup.Item>
                <h2>PayMent Method</h2>
                <strong>Method:</strong>
                {order&&order.paymentMethod}
            </ListGroup.Item>
            <ListGroup.Item>
                <h2>Order Items</h2>
             {
                 order&&order.orderItems.length===0?<Message>your cart is empty</Message>
                 :(<ListGroup variant='flush'>
                     {order&&order.orderItems.map((item,index)=>(
                         <ListGroup.Item key={index}>
                             <Row>
                                 <Col md={1}>
                                     <Image src={item.image} alt={item.name}
                                     fluid rounded />
                                 </Col>
                                 <Col>
                                 <Link to={`/product/${item.product}`}>
                                     {item.name}</Link>
                                 </Col>
                                 <Col md={4}>
                                     {item.qty}x${item.price}=${item.qty*item.price}
                                 </Col>
                             </Row>
                             </ListGroup.Item>
                     ))

                     }</ListGroup>)
             }
            </ListGroup.Item>
            </ListGroup>
    </Col>
    <Col md={4}>
        <Card>
            <ListGroup>
                <ListGroup.Item>
                    <h2>order Summary</h2>
                </ListGroup.Item>
                <ListGroup.Item>
                    <Row>
                        <Col>ItemsPrice</Col>
                        <Col>${order&&order.itemsPrice}</Col>
                    </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                    <Row>
                        <Col>Shipping</Col>
                        <Col>${order&&order.shippingPrice}</Col>
                    </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                    <Row>
                        <Col>Tax</Col>
                        <Col>${order&&order.taxPrice}</Col>
                    </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                    <Row>
                        <Col>Total</Col>
                        <Col>${order&&order.totalPrice}</Col>
                    </Row>
                </ListGroup.Item>  
     
            </ListGroup>
        </Card>
    </Col>
</Row>
}
    </>
            
   )

   
}
export default OrderScreen;