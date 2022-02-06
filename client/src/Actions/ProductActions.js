import { 
    PRODUCT_LIST_FAIL,
    PRODUCT_LIST_SUCCESS,
    PRODUCT_LIST_REAQUEST
 } from "../Constants/ProductConstants";
 import axios from "axios";
 export const ListProducts=()=> async(dispatch)=>{
  try{
   dispatch({type:PRODUCT_LIST_REAQUEST})

   const {data}=await axios.get('api/products')
   dispatch({
       type:PRODUCT_LIST_SUCCESS,
       payload:data
  })
}
  catch(error){
    dispatch({
        type:PRODUCT_LIST_FAIL,
        payload:error.response&&error.response.data.message?
        error.response.data.message
        :error.message
    })
  }
 }