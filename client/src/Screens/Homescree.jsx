import React,{useState,useEffect} from "react";
import{Container,Row,Col} from "react-bootstrap"
import Product from "../Components/Product";
import axios from 'axios';
const HomeScreen=()=>{
    const[products,setProducts]=useState([]);

    useEffect(()=>{
     const fetchproduct=async ()=>{
         const {data}=await axios.get('/api/products');
     setProducts(data)
     }
     fetchproduct();
    },[]);
    return(
        <>
        <h1>Latest products</h1>
        <Row>
            {
                products.map((product)=>{
                    return(
                    <Col key={product._id}sm={12} md={6} lg={4} xl={3}>
                <Product prop={product} />
                    </Col>
                    )
                })
            }
        </Row>
        </>
    )
}
export default HomeScreen;