import { PRODUCT_LIST_FAIL,PRODUCT_LIST_SUCCESS,
    PRODUCT_LIST_REAQUEST,
    PRODUCT_DETAIL_REAQUEST,
    PRODUCT_DETAIL_SUCCESS,
    PRODUCT_DETAIL_FAIL
 } from "../Constants/ProductConstants"
export const ProductListReducer=(state={products:[]},action)=>{
    switch(action.type){
      case PRODUCT_LIST_REAQUEST:
          return {loading:true,products:[]}
          case PRODUCT_LIST_SUCCESS:
              return {loading:false,products:action.payload}
              case PRODUCT_LIST_FAIL:
              return{loading:false,error:action.payload}
              default:
                  return state
    }
}
export const ProductDetailReducer=(state={product:{reviews:[]}},action)=>{
    switch(action.type){
      case PRODUCT_DETAIL_REAQUEST:
          return {loading:true,...state}
          case PRODUCT_DETAIL_SUCCESS:
              return {loading:false,product:action.payload}
              case PRODUCT_DETAIL_FAIL:
              return{loading:false,error:action.payload}
              default:
                  return state
    }
}