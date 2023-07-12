import { useState, useEffect } from "react";
import { BsFillCartCheckFill, BsFillCartPlusFill } from "react-icons/bs";
import { getItem, setItem } from "../services/localStorageFuncs";
import "../styles/store.css";

export const Store = () => {
  const [data, setData] = useState([]);
  const [cart, setCart] = useState(getItem("carrinhoYt") || []);

  useEffect(() => {
    const fetchApi = async () => {
      const url = "https://api.mercadolibre.com/sites/MLB/search?q=celular";
      const response = await fetch(url);
      const objJson = await response.json();
      setData(objJson.results);
    };
    fetchApi();
  }, []);

  const handleClick = (obj) => {
    const element = cart.find((e) => e.id == obj.id);
    if (element) {
      const arrFilter = cart.filter((e) => e.id != obj.id);
      setCart(arrFilter);
      setItem("carrinhoYt", arrFilter);
    } else {
      setCart([...cart, obj]);
      setItem("carrinhoYt", [...cart, obj]);
    }
  };

  return (
    <div>
      <h1
        style={{
          textAlign: "center",
          fontSize: "50px",
          margin: "20px 0",
        }}
      >
        Store
      </h1>
      <div className="store-container">
        {data.map((e) => (
          <div className="store-item" key={e.id}>
            <h4 className="title">{e.title}</h4>
            <img src={e.thumbnail} alt="Imagem do celular" />
            <h4
              style={{
                fontFamily: "Arial",
                fontSize: "18px",
                color: "#ff0000", // ou qualquer outra cor que desejar
                fontWeight: "bold",
                display: "flex",
                alignItems: "center",
                textShadow: "1px 1px 2px rgba(0, 0, 0, 0.3)",
              }}
            >
              <span style={{ marginRight: "5px" }}>R$</span> {e.price}
            </h4>
            <button
              onClick={() => handleClick(e)}
              className={`add-to-cart-btn ${
                cart.some((itemCart) => itemCart.id === e.id)
                  ? "added"
                  : "store-item"
              }`}
            >
              {cart.some((itemCart) => itemCart.id == e.id) ? (
                <button className="add-to-cart-btn added">
                  <BsFillCartCheckFill />
                  <span>Added to Cart</span>
                </button>
              ) : (
                <button
                  className="add-to-cart-btn"
                  onClick={() => handleClick(e)}
                >
                  <BsFillCartPlusFill />
                  <span>Add to Cart</span>
                </button>
              )}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Store;
