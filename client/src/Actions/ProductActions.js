import { PRODUCT_LIST_FAIL,PRODUCT_LIST_SUCCESS,
  PRODUCT_LIST_REAQUEST,
  PRODUCT_DETAIL_REAQUEST,
  PRODUCT_DETAIL_SUCCESS,
  PRODUCT_DETAIL_FAIL
} from "../Constants/ProductConstants"
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
 export const ListProductDetails=(id)=> async(dispatch)=>{
  try{
   dispatch({type:PRODUCT_DETAIL_REAQUEST})

   const {data}=await axios.get(`/api/products/${id}`);
   dispatch({
       type:PRODUCT_DETAIL_SUCCESS,
       payload:data
  })
}
  catch(error){
    dispatch({
        type:PRODUCT_DETAIL_FAIL,
        payload:error.response&&error.response.data.message?
        error.response.data.message
        :error.message
    })
  }
 }