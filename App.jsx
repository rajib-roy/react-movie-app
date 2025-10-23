import React, { useState } from "react";
import "./App.css";

const products = [
  {
    id: 1,
    name: "MacBook Pro",
    price: 250000,
    image: "https://laptopmedia.com/wp-content/uploads/2024/12/5-26.jpg",
  },
  {
    id: 2,
    name: "I phone 16 Pro",
    price: 135000,
    image:
      "https://adminapi.applegadgetsbd.com/storage/media/large/iPhone-16-Plus---16-Pink-9850.jpg",
  },
  {
    id: 3,
    name: "HeadPhone",
    price: 5000,
    image: "https://m.media-amazon.com/images/I/610ub5kytVL.jpg",
  },
  {
    id: 4,
    name: "Apple Watch Series 10 ",
    price: 41500,
    image: "https://www.startech.com.bd/image/cache/catalog/smart-watch/apple/apple-watch-series-10/watch-series-10-jet-black-02-500x500.webp",
  },

];

export default function App() {
  let [cart, setCart] = useState([]);
  const addToCart = (product) => {
    const existing = cart.find(item => item.id === product.id);
    if(existing) {
      const updateCart = cart.map(item=>
        item.id === product.id ? {...item, qty:item.qty + 1} : item
      );
      setCart(updateCart);
    }else {
      setCart([...cart,{...product,qty:1}])
    }
  }

  const removeOneFromCart = (productId) =>  {
    const existing = cart.find(item => item.id === productId);
    if(existing.qty === 1) {
      setCart(cart.filter(item => item.id !==productId))
    } else {
      const updateCart = cart.map(item=>
        item.id === productId ? {...item, qty:item.qty -1} : item
      );
      setCart(updateCart)

    }
  }

  const removeAllFromCart = (productId) => {
    setCart(cart.filter(item => item.id !== productId))
  }

  const getTotal = () => {
    return cart.reduce((total,item) => total + item.price * item.qty, 0)
  }

  return (
    <>
      
      <div className="container">
        <h1>Add to Cart</h1>
        <h2>Products</h2>
        <div className="products">
          {products.map((product) => (
            <div key={product.id} className="product-card">
              <p>Product Id:{product.id}</p>
              <img src={product.image} alt={product.name} />

              <div>
                <h3>{product.name}</h3>
                <p>Price: {product.price}</p>
                <button onClick={() => addToCart(product)}>Add to Cart</button>
              </div>
            </div>
          ))}
        </div>
      </div>
      <h2>🛒 Cart </h2>
      {cart.length === 0 ? (
        <p className="empty-cart">Cart is Empty</p>
      ) : (
        <div className="cart">
          {cart.map((item) => (
            <div key={item.id} className="cart-item">
              <span>
                {item.name} - {item.price} * {item.qty}
              </span>
              <div className="cart-buttons">
                <button onClick={() => addToCart(item)}>+</button>
                <button onClick={() => removeOneFromCart(item.id)}>-</button>
                <button onClick={() => removeAllFromCart(item.id)}>❌</button>
              </div>
            </div>
          ))}
          <h3 className="h3">Total: ৳ {getTotal()}</h3>
        </div>
      )}
    </>
  );
}
