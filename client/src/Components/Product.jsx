import React from "react";
import {Card} from "react-bootstrap";
const Product =({prop})=>{
    return( 
        <> 
    <Card className='my-3 p-3 rounded'>
        <a href={`/product/${prop._id}`}>
       <Card.Img src={prop.image} variant='top' />
   </a>
   <Card.Body>
   <a href={`/product/${prop._id}`}>
       <Card.Title as="div">
          <strong> {prop.name}</strong>
       </Card.Title>
   </a>
   </Card.Body>
    </Card>

    </>
    )
}
export default Product;