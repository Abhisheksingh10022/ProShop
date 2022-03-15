import React,{useEffect,useState} from "react";
import {Button,Row,Col,ListGroup,Image,Card} from "react-bootstrap";
import {useDispatch,useSelector} from "react-redux";
import Message from "../Components/Message";
import {PayPalButton} from "react-paypal-button-v2"
import { Link,useParams } from "react-router-dom";
import { getOrderDetail, payOrder } from "../Actions/orderActions";
import Loader from "../Components/loader";
import { ORDER_PAY_RESET } from "../Constants/orderConstants";
import axios from "axios";

const OrderScreen=()=>{
   const dispatch=useDispatch();

  const{id}=useParams();
  console.log(id)

  const [sdkReady,setSdkReady]=useState(false)


  const  orderDetail=useSelector((state)=>state.orderDetail)
   const {order}=orderDetail;  
const {Loading}=orderDetail;
 
const  orderPay=useSelector((state)=>state.orderPay)
const {loading:loadingPay}=orderPay;
const {success:successPay}=orderPay

   if(!Loading)
   {
  const addDecimals=(num)=>{
   return (Math.round(num*100)/100).toFixed(2)
  }

order.itemsPrice=addDecimals(order.orderItems.reduce((acc,item)=>acc+item.price*item.qty,0))
   }

   useEffect(()=>{
       const addPayPalScript=async()=>{
           const {data:clientId}=await axios.get('/api/config/paypal')
         const script=document.createElement("script")
         script.type='text/javascript'
         script.src=`https://www.paypal.com/sdk/js?client-id=${clientId}`
         script.async=true
         script.onload=()=>{
             setSdkReady(true)
         }
         document.body.appendChild(script)
       }
  
       if(!order||successPay)
       {   dispatch({
           type:ORDER_PAY_RESET
       })
           dispatch(getOrderDetail(id))
       }
       else if(!order.isPaid)
       {
           if(!window.paypal)
           {
               addPayPalScript()
           }
           else{
               setSdkReady(true)
           }
       }
   },[order,id,successPay,dispatch])

   const successPaymentHandler=(paymentResult)=>{
console.log(paymentResult)
dispatch(payOrder(id,paymentResult))
   }
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
               {order.isDelivered?<Message variant='success'>paid at {order.DeliveredAt}</Message>:
                <Message variant='danger'>Not paid</Message>}
               
            </ListGroup.Item>
            <ListGroup.Item>
                <h2>PayMent Method</h2>
                <p>
                <strong>Method:</strong>
                {order&&order.paymentMethod}
                </p>
                {order.isPaid?<Message variant='success'>paid on {order.paidAt}</Message>:
                <Message variant='danger'>Not paid</Message>}
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
               {!order.isPaid&&(
                   <ListGroup.Item>
                       {loadingPay&&<Loader />}
                       {!sdkReady?<Loader />:(
                           <PayPalButton amount={order.totalPrice} onSuccess={successPaymentHandler} />
                       )}
                   </ListGroup.Item>
               )}
            </ListGroup>
        </Card>
    </Col>
</Row>
}
    </>
            
   )

   
}
export default OrderScreen;