import React from "react";
import {Link} from "react-router-dom";
import {Row,Col,Image,ListGroup,Card,Button} from "react-bootstrap";
import Rating from "../Components/Rating";
import products from "../products"
import { useParams } from "react-router-dom";
const ProductScreen=({match})=>{
    const {_id}=useParams();
  const product=products.find((p)=>p._id===_id)
return(
    <>
    <Link className="btn btn-light" to="/">Go Back</Link>
    <Row>
        <Col md={6}>
            <Image src={product.image} alt={product.name} fluid/>
        </Col>
        <Col md={3}>
        <ListGroup  variant='flush'>
         <ListGroup.Item>
             <h2>{product.name}</h2>
         </ListGroup.Item>
         <ListGroup.Item>
             <Rating val={product.rating} text={` ${product.numReviews} Reviews`}></Rating>
         </ListGroup.Item>
         <ListGroup.Item>price:${product.price}</ListGroup.Item>
         <ListGroup.Item>Description: {product.description}</ListGroup.Item>
        </ListGroup>
        </Col>
        <Col md={3}>
        <Card >
            <ListGroup variant='flush'>
                <ListGroup.Item>
                    <Row>
                        <Col>Price:</Col>
                        <Col>
                        <strong>${product.price}</strong>
                        </Col>
                    </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                    <Row>
                        <Col>status:</Col>
                        <Col>
                        {product.countInStock>0?"In stock":"out of stock"}
                        </Col>
                    </Row>
                </ListGroup.Item>
            </ListGroup>
            <ListGroup.Item>
                <Button className="btn-block"type="button"disabled={product.countInStock===0} >
                    Add to Cart
                    </Button>
            </ListGroup.Item>
        </Card>
        </Col>
    </Row>
    </>
);
}
export default ProductScreen;