import { useState } from "react";
import { getItem, setItem } from "../services/localStorageFuncs";
import { BsFillCartDashFill } from "react-icons/bs";
import "../styles/cart.css";

const Cart = () => {
  const [data, setData] = useState(getItem("carrinhoYt") || []);
  const entrega = 0;
  const subTotal = data.reduce((acc, cur) => acc + cur.price, 0);

  const removeItem = (id) => {
    const arrFilter = data.filter((item) => item.id !== id);
    setData(arrFilter);
    setItem("carrinhoYt", arrFilter);
  };

  return (
    <div className="cart-container">
      <div className="cart-items">
        <h1 className="titulo">Your Cart</h1>
        <h5 className="total">Total {data.length} products</h5>
        {data.length > 0 ? (
          data.map((item) => (
            <div className="cart-item" key={item.id}>
              <h4 className="title">{item.title}</h4>
              <img src={item.thumbnail} alt="Product" />
              <div className="price-remove">
                <h4
                  style={{
                    fontFamily: "Arial",
                    fontSize: "18px",
                    color: "#ff0000",
                    fontWeight: "bold",
                    display: "flex",
                    alignItems: "center",
                    textShadow: "1px 1px 2px rgba(0, 0, 0, 0.3)",
                    marginLeft: "6.8vh",
                  }}
                >
                  R$ {item.price}
                </h4>
                <button onClick={() => removeItem(item.id)}>
                  <BsFillCartDashFill />
                  <span className="remove-text">Remove To Cart</span>
                </button>
              </div>
            </div>
          ))
        ) : (
          <p>No items in the cart</p>
        )}
      </div>
      <div className="cart-summary">
        <h2>RESUMO DO PEDIDO</h2>
        <div className="summary-item">
          <span>Subtotal dos produtos:</span>
          <span>R$ {subTotal}</span>
        </div>
        <div className="summary-item">
          <span>Entrega:</span>
          <span>R$ {entrega}</span>
        </div>
        <hr
          style={{
            marginTop: "2vh",
            marginBottom: "2vh",
          }}
        />
        <div className="summary-item">
          <span style={{ fontWeight: "bold" }}>Total</span>
          <span style={{ fontWeight: "bold" }}>R$ {subTotal + entrega}</span>
        </div>
        <button className="checkout-button">Finalizar Compra</button>
      </div>
    </div>
  );
};

export default Cart;
