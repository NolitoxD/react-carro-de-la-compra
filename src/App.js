import React from "react";

import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

import { urlApiProducts } from "./utils/constants";
import { STORAGE } from "./utils/constants";

import Products from "./components/Products";
import TopMenu from "./components/TopMenu";

function App() {
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);
  const [products, setProducts] = React.useState([]);

  // array con los productos del carrito
  const [productsCart, updateProductsCart] = React.useState([]);

  const cargarProductos = () => {
    const idsProducts = localStorage.getItem(STORAGE);

    if (idsProducts) {
      //convertirlo en array
      const idsProductsSplit = idsProducts.split(",");
      updateProductsCart(idsProductsSplit);
    } else {
      updateProductsCart([]);
    }
  };

  const agregarProducto = (id, name) => {
   // console.log("agregar producto", id, name);

    const idsProducts = productsCart;

    idsProducts.push(id);

    // console.log('array agreagar', idsProducts)

    updateProductsCart(idsProducts);

   // console.log("array agreagar", productsCart);

    // guardar en base de datos o localstorage(clave : valor)
    localStorage.setItem(STORAGE, productsCart);

    cargarProductos();
    // console.log('Producto añadido')
    toast.success(`${name} añadido al carrito correctamente`);
  };

  React.useEffect(() => {
    console.log("componente montado");
    axios
      .get(`${urlApiProducts}/helados`)
      .then((res) => (setProducts(res.data), setError("success")))
      .catch(setError("error"), setLoading(false));

    setLoading(false);

    cargarProductos();
  }, []);

  console.log("productos", products);

  return (
    <div className="App">
      <TopMenu
        loading={loading}
        products={products}
        productsCart={productsCart}
        cargarProductos={cargarProductos}
      ></TopMenu>

      <Products
        products={products}
        loading={loading}
        error={error}
        agregarProducto={agregarProducto}
      ></Products>

      <ToastContainer
        position="bottom-left"
        autoClose={4000}
        hideProgressBar
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnVisibilityChange={false}
        draggable
        pauseOnHover={false}
      ></ToastContainer>
    </div>
  );
}

export default App;
