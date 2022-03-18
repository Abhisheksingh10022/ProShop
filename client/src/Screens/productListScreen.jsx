import React,{useEffect} from "react";
import {Table,Button,Row,Col} from "react-bootstrap";
import {useDispatch,useSelector} from "react-redux";
import Loader from "../Components/loader";
import Message from "../Components/Message";
import{LinkContainer} from "react-router-bootstrap";
import { ListUsers,deleteUser } from "../Actions/userActions";
import {ListProducts,deleteProduct,createProduct} from "../Actions/ProductActions"
import { useNavigate ,useParams} from "react-router-dom";
import { PRODUCT_CREATE_RESET } from "../Constants/ProductConstants";
const ProductListScreen=()=>{
    const dispatch=useDispatch();
    const navigate=useNavigate();

    const productList=useSelector(state=>state.productList)
    const{loading,error,products}=productList

    const productDelete =useSelector(state=>state.productDelete)
    const{loading:loadingDelete,error:errorDelete,success:successDelete}=productDelete
    

    const productCreate =useSelector(state=>state.productCreate)
    const{loading:loadingCreate,success:successCreate,error:errorCreate,product:createdProduct}=productCreate
    console.log(productCreate)

    const userLogin=useSelector(state=>state.userLogin)
    const{userInfo}=userLogin

     useEffect(()=>{
         dispatch({type:PRODUCT_CREATE_RESET})
         if(!userInfo.isAdmin)
         {
        navigate('/login')
         }
         if(successCreate)
         {
             navigate(`/admin/product/${createdProduct._id}/edit`)
         }
         else{
             dispatch(ListProducts())
         }
     },[dispatch,userInfo,successDelete,successCreate,createdProduct])

     const deleteHandler=(id)=>{
         const st=window.confirm('Are you sure')
         console.log(st)
         if(st===true)
         {
      dispatch(deleteProduct(id))
         }
         
     }
     const createProductHandler=()=>{
       dispatch(createProduct())
     }
    return (
        <>
        <Row className='align-items-center'>
          <Col>
          <h1>Products</h1>
              </Col>
              <Col className="text-right">
              <Button className='my-3' onClick={createProductHandler}><i className="fas fa-plus"></i>Create Product</Button>
              </Col>
              </Row>
              {loadingDelete&&<Loader />}
          {errorDelete&&<Message variant='danger' >{errorDelete}</Message>}
          {loadingCreate&&<Loader />}
          {errorCreate&&<Message variant='danger' >{errorCreate}</Message>}
        {loading?<Loader />:error?<Message variant='danger'></Message>:(
       <Table striped bordered hover responsive className="table-sm">
           <thead>
               <tr>
                   <th>ID</th>
                   <th>NAME</th>
                   <th>PRICE</th>
                   <th>CATEGORY</th>
                   <th>BRAND</th>
               </tr>
           </thead>
           <tbody>
               {products.map((product)=>(
                   <tr key={product._id}>
                       <td>{product._id}</td>
                       <td>{product.name}</td>
                       <td>${product.price}</td>
                       <td>
                         {product.category}
      
                       </td>
                       <td>{product.brand}</td>
                       <td>
                           <LinkContainer to={`/admin/product/${product._id}/edit`}>
                           <Button variant='light' className="btn-sm">
                               <i className='fas fa-edit'></i>
                           </Button>
                           </LinkContainer>
                           <Button variant="danger" className='btn-sm' onClick={()=>deleteHandler(product._id)}>
                               <i className="fas fa-trash"></i>
                           </Button>
                       </td>

                   </tr>
               ))}
           </tbody>
       </Table>
        )
        }
        </>
    )
}
export default ProductListScreen