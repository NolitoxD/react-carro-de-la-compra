import React from "react";
import { Navbar, Container, Nav } from "react-bootstrap";

import { ReactComponent as Logo } from "../../assets/svg/logo.svg";

import "./TopMenus.scss";

import Cart from "../Cart/Cart";

const TopMenu = ({productsCart, cargarProductos, products, loading}) => {
 
  const BrandNav = () => {
    return (
      <Navbar.Brand>
        <Logo></Logo>
        <h2>La casa de los helados</h2>
      </Navbar.Brand>
    );
  };
{

/**
 * 
 * const MenuNav = () => {
    return (
      <Nav className="mr-auto">
        <Nav.Link href="#">Aperirivos</Nav.Link>
        <Nav.Link href="#">Helados</Nav.Link>
        <Nav.Link href="#">Mascotas</Nav.Link>
      </Nav>
    );
  };
 */

}
  


  return (
    <Navbar bg="dark" variant="dark" className="top-menu">
      <Container>
        <BrandNav></BrandNav>
        {/**Menu 
        <MenuNav></MenuNav>
        */}
        {/**Carrito */}
        <Cart 
        loading={loading}
        products={products}
        productsCart={productsCart}
        cargarProductos={cargarProductos}
        ></Cart>
      </Container>
    </Navbar>
  );
};

export default TopMenu;
