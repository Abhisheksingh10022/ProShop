import React,{useState,useEffect} from "react";
import {Table,Form,Button,Row,Col} from "react-bootstrap";
import {useDispatch,useSelector} from "react-redux";
import{useLocation,useSearchParams,Link,useNavigate} from "react-router-dom";
import { getUserDetails, updateUserProfile } from "../Actions/userActions";
import { listMyOrders } from "../Actions/orderActions";
import Loader from "../Components/loader";
import Message from "../Components/Message";
import {LinkContainer} from 'react-router-bootstrap'

  const ProfileScreen=()=>{
    const [name,setName]=useState('');
   const [email,setEmail]=useState('');
    const[password,setPassword]=useState('');
    const[confirmPassword,setConfirmPassword]=useState('');

   const[message,setMessage]=useState('');

  const dispatch=useDispatch();

  const userDetails=useSelector((state)=>state.userDetails);
  const {loading,error,user}=userDetails;


  const orderMyList=useSelector((state)=>state.orderMyList);
  const {loading:loadingOrders,error:errorOrders,orders}=orderMyList;
console.log(orders)
console.log(orderMyList.Loading)
  const userUpdateProfile=useSelector((state)=>state.userUpdateProfile);
  const {success}=userUpdateProfile;

  const userLogin=useSelector((state)=>state.userLogin);
  const {userInfo}=userLogin;

   const navigate=useNavigate();
   useEffect(()=>{
   
     if(!userInfo)
     {
     navigate("/login")
     }
     else{
         if(!user.name)
         {
             dispatch(getUserDetails('profile'))
             dispatch(listMyOrders())
         }
         else{
             setName(user.name);
             setEmail(user.email);
         }
     }
     
     
   },[dispatch,navigate,userInfo,user,getUserDetails,listMyOrders])  
    const submitHandler=(e)=>{
        e.preventDefault();
        if(password!=confirmPassword)
        {
            setMessage('passwords do not match')
        }
        else{
          dispatch(updateUserProfile({id:user._id,name,email,password}))
        }
    }
    
    return( 
        <>
        <Row>
            <Col md={3}>
            <h1>User profile</h1>
        {message &&<Message variant='danger'>{message}</Message>}
        {
          error&&<Message variant="danger" disabled>{error}</Message>
        }
        
           {success &&<Message variant='success'>Profile Updated</Message>}
        
        {loading&&<Loader />}
        <Form onSubmit={submitHandler}>
         <Form.Group controlId="name">
        <Form.Label> Name</Form.Label>
        <Form.Control 
        type='name'
         placeholder='Enter name'
          value={name}
        onChange={(e)=>setName(e.target.value)}
        >
        </Form.Control>

         </Form.Group>
         <Form.Group controlId="email">
        <Form.Label>Email Address</Form.Label>
        <Form.Control 
        type='email'
         placeholder='Enter email'
          value={email}
        onChange={(e)=>setEmail(e.target.value)}
        >
        </Form.Control>
         </Form.Group>
         <Form.Group controlId="password">
        <Form.Label>Password</Form.Label>
        <Form.Control 
        type='password'
         placeholder='Enter email'
          value={password}
        onChange={(e)=>setPassword(e.target.value)}
        >
        </Form.Control>
         </Form.Group>
         <Form.Group controlId="confirmPassword">
        <Form.Label>Confirm Password</Form.Label>
        <Form.Control 
        type='password'
         placeholder='Confirm Password'
          value={confirmPassword}
        onChange={(e)=>setConfirmPassword(e.target.value)}
        >
        </Form.Control>
         </Form.Group>
      <Button type='submit' varient='primary' className="my-4">
        Update
      </Button>
        </Form>
                </Col>
                {(!orderMyList.Loading)&&(
                <Col md={9}>
                  <h2>My Orders</h2>
                  {loadingOrders?<Loader />:errorOrders?<Message variant='danger'>{errorOrders}</Message>:(
                    <Table striped borered  hover responsive className="table-sm">
                      <thead>
                        <tr>
                        <th>ID</th>
                        <th>DATE</th>
                        <th>TOTAL</th>
                        <th>PAID</th>
                        <th>DELIVERED</th>
                          </tr>
                      </thead>
                      <tbody>
                        {orders.map(order=>(<tr key={order._id}>
                          <td>{order._id}</td>
                          <td>{order.createdAt.substring(0,10)}</td>
                          <td>{order.totalPrice}</td>
                          <td>{order.isPaid?order.paidAt.substring(0,10):(<i className="fas fa-times" style={{color:"red"}}></i>)}</td>
                          <td>{order.isDelivered?order.deliveredAt.substring(0,10):(<i className="fas fa-times" style={{color:"red"}}></i>)}</td>
                          <td>
                            <LinkContainer to={`/order/${order._id}`}>
                              <Button variant='ligh'>Details</Button>
                            </LinkContainer>
                          </td>
                        </tr>))}
                      </tbody>
                    </Table>
                  )}
                </Col>
                )
  }
                
        </Row>
      
        
      

    </>
    )

}
export  default ProfileScreen;
