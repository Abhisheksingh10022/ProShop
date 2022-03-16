import{ORDER_CREATE_FAIL,ORDER_CREATE_REQUEST,
    ORDER_CREATE_SUCCESS,
    ORDER_DETAIL_FAIL,
    ORDER_DETAIL_REQUEST,
    ORDER_DETAIL_SUCCESS,
     ORDER_PAY_RESET,
     ORDER_PAY_FAIL,
     ORDER_PAY_REQUEST,
     ORDER_PAY_SUCCESS,
     ORDER_LIST_MY_FAIL,
     ORDER_LIST_MY_REQUEST,ORDER_LIST_MY_RESET,
     ORDER_LIST_MY_SUCCESS
} from "../Constants/orderConstants"
export const orderCreateReducer=(state={},action)=>{
    switch(action.type)
    {
        case ORDER_CREATE_REQUEST:
            return {
                loading:true
            }
            case ORDER_CREATE_SUCCESS:
                return{
                    loading:false,
                    success:true,
                    order:action.payload
                }
                case ORDER_CREATE_FAIL:
                return{
                    loading:false,
                   error:action.payload
                }
                default:
                    return state
            }
}
export const orderDetailReducer=(state={Loading:true,orderItems:[],shippingAddress:{}},action)=>{

    switch(action.type)
    {
        case ORDER_DETAIL_REQUEST:
            return {
             
                Loading:true
            }
            case ORDER_DETAIL_SUCCESS:
                return{
                   Loading:false,
                    orders:action.payload
                }
                case ORDER_DETAIL_FAIL:
                return{
                    Loading:false,
                   error:action.payload
                }
                default:
                    return state
            }
}
export const orderPayReducer=(state={},action)=>{
    switch(action.type)
    {
        case ORDER_PAY_REQUEST:
            return {
                Loading:true
            }
            case ORDER_PAY_SUCCESS:
                return{
                   Loading:false,
                  success:true,
                }
                case ORDER_PAY_FAIL:
                return{
                    Loading:false,
                   error:action.payload
                }
                case ORDER_PAY_RESET:
                    return {}
                default:
                    return state
            }
}
export const orderMyListReducer=(state={orders:[]},action)=>{
    switch(action.type)
    {
        case ORDER_LIST_MY_REQUEST:
            return {
                Loading:true
            }
            case ORDER_LIST_MY_SUCCESS:
                return{
                   Loading:false,
                   orders:action.payload

                
                }
                case ORDER_LIST_MY_FAIL:
                return{
                    Loading:false,
                   error:action.payload
                }
                case ORDER_LIST_MY_RESET:
                    return {orders:[]}
                default:
                    return state
            }
}