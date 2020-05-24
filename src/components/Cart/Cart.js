import React, { Fragment } from "react";
import { Button } from "react-bootstrap";
import { ReactComponent as CartEmpty } from "../../assets/svg/cart-empty.svg";
import { ReactComponent as CartFull } from "../../assets/svg/cart-full.svg";
import { ReactComponent as Close } from "../../assets/svg/close.svg";
import { ReactComponent as Garbage } from "../../assets/svg/garbage.svg";
import { STORAGE, BASE_PATH } from "../../utils/constants";
import {
  removeArrayDuplicates,
  countDuplicatesItemArray,
  removeItemArray,
} from "../../utils/arrayMath";

import "./Cart.scss";

const Cart = ({ productsCart, cargarProductos, products, loading }) => {
  const [cartOpen, setcartOpen] = React.useState(false);
  const [singleProductCart, setSingleProductCart] = React.useState([]);

  const [cartTotalPrice, setcartTotalPrice] = React.useState(0);
  // console.log('array de productos', products)

  // const allProductsId = removeArrayDuplicates(productsCart)
  // console.log('array duplicates remove', allProductsId)

  React.useEffect(() => {
    const productData = [];
    let totalPrice = 0;
    const allProductsId = removeArrayDuplicates(productsCart);
    //console.log('array total carrito', allProductsId)
    allProductsId.forEach((productId) => {
      const quantity = countDuplicatesItemArray(productId, productsCart);
      const productValue = {
        id: productId,
        quantity: quantity,
      };
      productData.push(productValue);
    });
    // console.log('array total carrito', productData) !loading &&
    // console.log('productos a recdorrer', products, productData)
    if (products) {
      products.forEach((product) => {
        productData.forEach((item) => {
          if (product.id === parseInt(item.id)) {
            const totalValue = product.price * item.quantity;
            totalPrice = totalPrice + totalValue;
          }
        });
      });
    }

    setcartTotalPrice(totalPrice);
  }, [productsCart, products]);

  React.useEffect(() => {
    const allProductsId = removeArrayDuplicates(productsCart);
    setSingleProductCart(allProductsId);
  }, [productsCart]);

  const openCart = () => {
    setcartOpen(true);
    // con el carrito abierto la web se bloquea para acceder a la web cerrar el carrito
    document.body.style.overflow = "hidden";
  };

  const emptyCart = () => {
    localStorage.removeItem(STORAGE);
    cargarProductos();
  };

  const closeCart = () => {
    setcartOpen(false);

    document.body.style.overflow = "scroll";
  };

  const incrementCount = (id) => {
    const arrayItemsCard = productsCart;
    arrayItemsCard.push(id);
    localStorage.setItem(STORAGE, arrayItemsCard);
    cargarProductos();
  };

  const descentCount = (id) => {
    const arrayItemsCard = productsCart;
    console.log("id", id);
    const result = removeItemArray(arrayItemsCard, id.toString());
    localStorage.setItem(STORAGE, result);
    cargarProductos();
  };

  const CartHeader = ({ closeCart, emptyCart }) => {
    return (
      <div className="cartHeader">
        <div>
          <Close onClick={closeCart}></Close>
          <h2>Mi Carrito</h2>
        </div>
        <Button variant="link" onClick={emptyCart}>
          Vaciar
          <Garbage></Garbage>
        </Button>
      </div>
    );
  };

  const CartFooter = (props) => {
    const { cartTotalPrice } = props;
    return (
      <div className="cart-content-footer">
        <div>
          <p>Totall aproximado:</p>
          {/**{cartTotalPrice.toFixed(2)} */}
          <p> {cartTotalPrice.toFixed(2)} €</p>
        </div>
        <Button>Tramitar pedido</Button>
      </div>
    );
  };

  const CartProducts = ({
    products,
    productsCart,
    itemId,
    loading,
    incrementCount,
    descentCount,
  }) => {
    // console.log("productos en mi cart", products, productsCart, itemId, loading);
    //  console.log("equals en mi cart", products, itemId);

    if (!loading && products) {
      return products.map((element, index) => {
        // console.log('repetidos', element.id, parseInt(itemId))
        if (element.id === parseInt(itemId)) {
          const quantity = productsCart.filter(
            (item) => parseInt(item) === element.id
          );
          //  console.log('quantity', quantity)
          return (
            <RenderProduct
              key={index}
              element={element}
              quantity={quantity}
              incrementCount={incrementCount}
              descentCount={descentCount}
            ></RenderProduct>
          );
        }
      });
    }
  };

  const RenderProduct = ({
    quantity,
    element,
    incrementCount,
    descentCount,
  }) => {
    return (
      <div className="cart-content-product">
        <img src={`${BASE_PATH}/${element.image}`} alt={element.name}></img>
        <div className="cart-content-product-info">
          <div>
            <h3>{element.name.substr(0, 25)}...</h3>
            <p>{element.price.toFixed(2)} €/ud</p>
          </div>
          <div>
            <p>En el carro: {quantity.length} ud</p>
          </div>
          <div>
            <button onClick={() => incrementCount(element.id)}>+</button>
            <button onClick={() => descentCount(element.id)}>-</button>
          </div>
        </div>
      </div>
    );
  };

  const widthCart = cartOpen ? 400 : 0;

  return (
    <Fragment>
      <Button variant="link" className="cart">
        {productsCart.length > 0 ? (
          <CartFull onClick={openCart}></CartFull>
        ) : (
          <CartEmpty onClick={openCart}></CartEmpty>
        )}
      </Button>

      <div className="cart-content" style={{ width: widthCart }}>
        <CartHeader closeCart={closeCart} emptyCart={emptyCart}></CartHeader>
      
          <div className="cart-content-products">
            {singleProductCart.map((itemId, index) => (
              <CartProducts
                key={index}
                products={products}
                productsCart={productsCart}
                loading={loading}
                itemId={itemId}
                incrementCount={incrementCount}
                descentCount={descentCount}
              ></CartProducts>
            ))}
          </div>
        
        <CartFooter cartTotalPrice={cartTotalPrice}></CartFooter>
      </div>
    </Fragment>
  );
};

export default Cart;
