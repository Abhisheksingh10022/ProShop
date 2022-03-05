import React,{useState,useEffect} from "react";
import {Form,Button,Row,Col} from "react-bootstrap";
import {useDispatch,useSelector} from "react-redux";
import{useLocation,useSearchParams,Link,useNavigate} from "react-router-dom";
import { getUserDetails, updateUserProfile } from "../Actions/userActions";

import Loader from "../Components/loader";
import Message from "../Components/Message";
  const ProfileScreen=()=>{
    const [name,setName]=useState('');
   const [email,setEmail]=useState('');
    const[password,setPassword]=useState('');
    const[confirmPassword,setConfirmPassword]=useState('');

   const[message,setMessage]=useState('');

  const dispatch=useDispatch();

  const userDetails=useSelector((state)=>state.userDetails);
  const {loading,error,user}=userDetails;

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
         }
         else{
             setName(user.name);
             setEmail(user.email);
         }
     }
     
     
   },[dispatch,navigate,userInfo,user])  
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
                <Col md={9}>
                    <h2>MY orders</h2>
                </Col>
        </Row>
      
        
      

    </>
    )

}
export  default ProfileScreen;
