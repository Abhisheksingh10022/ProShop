import{createStore,combineReducers,applyMiddleware} from "redux";
import thunk from "redux-thunk";
import {composeWithDevTools} from "redux-devtools-extension"
import { ProductListReducer,ProductDetailReducer} from "./Reducers/ProductsReducers";
import { cartReducer } from "./Reducers/CartReducer";
const reducer=combineReducers({
    productList:ProductListReducer,
    productDetails:ProductDetailReducer,
    cart:cartReducer,
})
const cartItemsFromStorage=localStorage.getItem('cartItems')?JSON.parse(localStorage.getItem('cartItems')):[]

const initialState={
    
   cart:{cartItems:cartItemsFromStorage}
}
console.log(initialState);
const middleware=[thunk]
const store=createStore(reducer,initialState,composeWithDevTools(applyMiddleware(...middleware)))

export default store;