import{createStore,combineReducers,applyMiddleware} from "redux";
import thunk from "redux-thunk";
import {composeWithDevTools} from "redux-devtools-extension"
import { ProductListReducer,ProductDetailReducer} from "./Reducers/ProductsReducers";
import { cartReducer } from "./Reducers/CartReducer";
import { userLoginReducer,userRegisterReducer ,userDetailsReducer,userUpdateProfileReducer} from "./Reducers/userReducer";
import { orderCreateReducer ,orderDetailReducer,orderPayReducer
,orderMyListReducer} from "./Reducers/orderReducers";
const reducer=combineReducers({
    productList:ProductListReducer,
    productDetails:ProductDetailReducer,
    cart:cartReducer,
    userLogin:userLoginReducer,
    userRegister:userRegisterReducer,
    userDetails:userDetailsReducer,
    userUpdateProfile:userUpdateProfileReducer,
    orderCreate:orderCreateReducer,
    orderDetail:orderDetailReducer,
    orderPay:orderPayReducer,
    orderMyList:orderMyListReducer,
})
const cartItemsFromStorage=localStorage.getItem('cartItems')?JSON.parse(localStorage.getItem('cartItems')):[]

const userInfoFromStorage=localStorage.getItem('userInfo')?JSON.parse(localStorage.getItem('userInfo')):null

const shippingAddressFromStorage=localStorage.getItem('shippingAddress')?JSON.parse(localStorage.getItem('shippingAddress')):{}
const initialState={
    
   cart:{cartItems:cartItemsFromStorage,
         shippingAddress:shippingAddressFromStorage},
   userLogin:{userInfo:userInfoFromStorage}
}

const middleware=[thunk]
const store=createStore(reducer,initialState,composeWithDevTools(applyMiddleware(...middleware)))

export default store;