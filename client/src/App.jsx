
import React from "react";
import Footer from "./Components/Footer";
import Header from "./Components/Header";
import { Container } from "react-bootstrap";
import HomeScreen from "./Screens/Homescree";
import {Route,Routes} from"react-router-dom";
import ProductScreen from "./Screens/ProductScreen";
import CartScreen from "./Screens/cartScreen";
import LoginScreen from "./Screens/LoginScreen";
const App=()=> {
  
  return (
   <>
   <Header />
   <main className="py-3">
     <Container>
       <Routes>
       <Route path='/login' element={<LoginScreen></LoginScreen>} exact />
       <Route path='/product/:_id' element={<ProductScreen></ProductScreen>} exact />
       <Route path='/cart/:_id' element={<CartScreen></CartScreen>} exact />
<Route path='/' element={<HomeScreen/>} exact></Route>
</Routes>
   </Container>
   </main>
   <Footer />
   </>
  );
}

export default App;
