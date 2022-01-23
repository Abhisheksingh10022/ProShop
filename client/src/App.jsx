
import React from "react";
import Footer from "./Components/Footer";
import Header from "./Components/Header";
import { Container } from "react-bootstrap";
import HomeScreen from "./Screens/Homescree";
import {Route,Routes} from"react-router-dom";
import ProductScreen from "./Screens/ProductScreen";
const App=()=> {
  return (
   <>
   <Header />
   <main className="py-3">
     <Container>
       <Routes>
<Route path='/' element={<HomeScreen/>} exact></Route>
<Route path='/product/:_id' element={<ProductScreen></ProductScreen>} exact />
</Routes>
   </Container>
   </main>
   <Footer />
   </>
  );
}

export default App;
