import React from "react";
import { Container, Row } from "react-bootstrap";

import "./Products.scss";
import Loading from "../Loading/Loading";
import Product from "../Product/Product";

const Products = ({ products, loading, error, agregarProducto}) => {
  console.log("props productos", products, loading, error);

  return (
    <Container>
      <Row>
        {loading || !products
          ? (<Loading></Loading>)
          : (products.map((product, index) => (
           
            <Product product={product} key={product.id} agregarProducto={agregarProducto}></Product>
             
          )
            ))}
      </Row>
    </Container>
  );
};

export default Products;
