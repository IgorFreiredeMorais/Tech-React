import { useState, useEffect } from "react";
import { BsFillCartCheckFill, BsFillCartPlusFill } from "react-icons/bs";
import { getItem, setItem } from "../services/localStorageFuncs";
import "../styles/store.css";

export const Store = () => {
  const [data, setData] = useState([]);
  const [cart, setCart] = useState(getItem("carrinhoYt") || []);
  const [searchValue, setSearchValue] = useState("");

  const fetchApi = async (searchTerm, setData) => {
    const url = `https://api.mercadolibre.com/sites/MLB/search?category=MLB1051&q=${encodeURIComponent(
      searchTerm
    )}`;
    const response = await fetch(url);
    const objJson = await response.json();
    setData(objJson.results);
  };

  useEffect(() => {
    fetchApi(searchValue, setData);
  }, [searchValue]);

  useEffect(() => {
    const fetchApi = async () => {
      const url =
        "https://api.mercadolibre.com/sites/MLB/search?category=MLB1051&";
      const response = await fetch(url);
      const objJson = await response.json();
      setData(objJson.results);
    };
    fetchApi();
  }, []);

  const handleClick = (obj) => {
    const element = cart.find((e) => e.id === obj.id);
    if (element) {
      const arrFilter = cart.filter((e) => e.id !== obj.id);
      setCart(arrFilter);
      setItem("carrinhoYt", arrFilter);
    } else {
      const updatedCart = [...cart, { ...obj, quantity: 1 }];
      setCart(updatedCart);
      setItem("carrinhoYt", updatedCart);
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
      <div className="search-container">
        <input
          type="text"
          placeholder="Search..."
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          className="search-input"
        />
        <button
          className="search-button"
          onClick={() => fetchApi(searchValue, setData)}
        >
          Search
        </button>
      </div>
      <div className="store-container">
        {data.map((e) => (
          <div className="store-item" key={e.id}>
            <h4 className="title">{e.title}</h4>
            <img src={e.thumbnail} alt="Imagem do celular" />
            <h4
              style={{
                fontFamily: "Arial",
                fontSize: "18px",
                color: "#ff0000",
                fontWeight: "bold",
                display: "flex",
                alignItems: "center",
                textShadow: "1px 1px 2px rgba(0, 0, 0, 0.3)",
              }}
            >
              <span style={{ marginRight: "5px" }}>R$</span> {e.price}
            </h4>
            {cart.some((itemCart) => itemCart.id === e.id) ? (
              <button
                className="add-to-cart-btn added"
                onClick={() => handleClick(e)}
              >
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
          </div>
        ))}
      </div>
    </div>
  );
};

export default Store;
