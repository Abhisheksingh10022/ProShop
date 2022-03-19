import React,{useEffect} from "react";
import{Row,Col} from "react-bootstrap";
import {useDispatch,useSelector} from "react-redux";
import{useNavigate,useParams} from "react-router-dom"
import Loader from "../Components/loader";
import Message from "../Components/Message";
import Product from "../Components/Product";
import { ListProducts } from "../Actions/ProductActions";
const HomeScreen=()=>{
    const {keyword}=useParams();
  
    const queryParams=new URLSearchParams(window.location.search);

    const shipping=queryParams.get("shipping");
  const dispatch=useDispatch();
  const navigate=useNavigate();
  const productList=useSelector((state)=>state.productList);
  const{loading,error,products}=productList;
    useEffect(()=>{
   dispatch(ListProducts(keyword))
   if(shipping)
   {
    navigate("/shipping");
   }
    },[dispatch,navigate,keyword]);

    return(
        <>
        <h1>Latest products</h1>
        {
            loading?(<Loader></Loader>):error?(<Message variant='danger'></Message>):
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
}
        </>
    )
}
export default HomeScreen;