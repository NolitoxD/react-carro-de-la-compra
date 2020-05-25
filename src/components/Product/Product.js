import React from "react";
import { Card, Col, Button } from "react-bootstrap";

import {BASE_PATH} from '../../utils/constants';

import "./Product.scss";

const Product = ({ product, agregarProducto}) => {
  const { id, name, image, extraInfo, price } = product;

  return (
    <div>
      <Col xs={3} className="product">
        <Card className='card'>
          <Card.Img className='image' variant="top" src={`${BASE_PATH}/${image}`} ></Card.Img>
          <Card.Body>
            <Card.Title>{name}</Card.Title>
            <Card.Text>{extraInfo}</Card.Text>
            <Card.Text>{price.toFixed(2)} €/ud</Card.Text>
            <Button onClick={() => agregarProducto(id, name)}>Añadir al carrito</Button>
          </Card.Body>
        </Card>
      </Col>
    </div>
  );
};

export default Product;
