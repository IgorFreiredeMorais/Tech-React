import { useState } from "react";
import { getItem, setItem } from "../services/localStorageFuncs";
import { BsFillCartDashFill } from "react-icons/bs";
import { FaBarcode } from "react-icons/fa";
import { BsFillCreditCard2FrontFill } from "react-icons/bs";
import { SlArrowLeft, SlArrowRight } from "react-icons/sl";
import InputMask from "react-input-mask";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import "../styles/cart.css";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "white",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const Cart = () => {
  const [data, setData] = useState(getItem("carrinhoYt") || []);
  const [cep, setCep] = useState("");
  const [bairro, setBairro] = useState("");
  const [cidade, setCidade] = useState("");
  const [rua, setRua] = useState("");
  const [custo, setCusto] = useState(0);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [paymentMethod, setPaymentMethod] = useState("");
  const [creditCard, setCreditCard] = useState("");
  const [cardholderName, setCardholderName] = useState("");
  const [expirationDate, setExpirationDate] = useState("");
  const [securityCode, setSecurityCode] = useState("");
  const [quantidades, setQuantidades] = useState({});
  const subTotal = data
    .reduce(
      (acc, cur) =>
        acc + cur.price * (quantidades[cur.id] || cur.quantity || 0),
      0
    )
    .toFixed(2);
  const total = (parseFloat(subTotal) + custo).toFixed(2);
  const isCreditCardSelected = paymentMethod === "creditCard";
  const isBoletoSelected = paymentMethod === "boleto";

  const removeItem = (id) => {
    const arrFilter = data.filter((item) => item.id !== id);
    setData(arrFilter);
    setItem("carrinhoYt", arrFilter);
  };

  const handlePaymentMethodChange = (method) => {
    setPaymentMethod(method);
  };

  const incrementarQuantidade = (id) => {
    setQuantidades((prevQuantidades) => ({
      ...prevQuantidades,
      [id]: (prevQuantidades[id] || 0) + 1,
    }));
  };

  const decrementarQuantidade = (id) => {
    setQuantidades((prevQuantidades) => ({
      ...prevQuantidades,
      [id]: (prevQuantidades[id] || 0) - 1,
    }));
  };

  const handlePaymentSubmit = (e) => {
    e.preventDefault();

    if (paymentMethod === "boleto") {
      // Gerar boleto PDF

      // Exemplo de toast de boleto gerado com sucesso
      toast.success("Boleto gerado com sucesso!");

      // Limpar campos
      setCardholderName("");
      setCreditCard("");
    } else if (paymentMethod === "creditCard") {
      // Lógica para processar pagamento com cartão de crédito

      // Exemplo de toast de pagamento confirmado com sucesso
      toast.success("Pagamento confirmado!");

      // Limpar campos
      setCreditCard("");
      setCardholderName("");
      setExpirationDate("");
      setSecurityCode("");
    }

    handleClose();
    setPaymentMethod("");
  };

  const checkCep = () => {
    const cepAtt = cep.replace(/\D/g, "");
    fetch(`https://viacep.com.br/ws/${cepAtt}/json/`)
      .then((res) => res.json())
      .then((data) => {
        setRua(data.logradouro);
        setBairro(data.bairro);
        setCidade(data.localidade);
        setCusto(50);
      });
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
                <h4 className="price">R$ {item.price}</h4>
                <span
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  Quant.
                </span>
                <div className="quantidade">
                  <SlArrowLeft
                    className={
                      (quantidades[item.id] || item.quantity) <= 1
                        ? "disabled"
                        : "seta"
                    }
                    onClick={() => {
                      if ((quantidades[item.id] || item.quantity) > 0) {
                        decrementarQuantidade(item.id);
                      }
                    }}
                  />
                  <h3>{quantidades[item.id] || item.quantity || 0}</h3>
                  <SlArrowRight
                    onClick={() => incrementarQuantidade(item.id)}
                    className="seta"
                  />
                </div>
                <button onClick={() => removeItem(item.id)}>
                  <BsFillCartDashFill />
                  <span className="remove-text">Remove To Cart</span>
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="vazio">O seu carrinho está vazio.</p>
        )}
      </div>
      <div className="cart-summary">
        <h2>RESUMO DO PEDIDO</h2>
        <div className="summary-item">
          <span>Subtotal dos produtos:</span>
          <span>R$ {subTotal}</span>
        </div>
        <div className="summary-item">
          <label htmlFor="cep">Cep:</label>
          <input
            type="text"
            name="cep"
            id="cep"
            defaultValue={cep}
            onChange={(e) => setCep(e.target.value)}
            onBlur={checkCep}
          />
        </div>
        <div className="summary-item">
          <label htmlFor="cidade">Cidade:</label>
          <input type="text" name="cidade" id="cidade" defaultValue={cidade} />
        </div>
        <div className="summary-item">
          <label htmlFor="cep">Rua:</label>
          <input type="text" name="rua" id="rua" defaultValue={rua} />
        </div>
        <div className="summary-item">
          <label htmlFor="bairro">Bairro:</label>
          <input type="text" name="bairro" id="bairro" defaultValue={bairro} />
        </div>
        <div className="summary-item">
          <span>Entrega:</span>
          <span>R$ {custo}</span>
        </div>
        <hr className="divider" />
        <div className="summary-item">
          <span className="total-label">Total:</span>
          <span className="total-price">R$ {total}</span>
        </div>

        <button className="checkout-button" onClick={handleOpen}>
          Finalizar Compra
        </button>

        <Modal open={open} onClose={handleClose}>
          <Box sx={style}>
            <h2 className="title-modal">Escolha a forma de pagamento</h2>
            <div className="payment-methods">
              <div
                className={`payment-method ${
                  paymentMethod === "creditCard" ? "active" : ""
                }`}
              >
                <input
                  type="radio"
                  name="paymentMethod"
                  id="creditCard"
                  value="creditCard"
                  checked={paymentMethod === "creditCard"}
                  onChange={() => handlePaymentMethodChange("creditCard")}
                />

                <label htmlFor="creditCard" className="credito">
                  <span>Cartão de Crédito</span>
                  <BsFillCreditCard2FrontFill className="payment-icon" />
                </label>
              </div>
              <div
                className={`payment-method ${
                  paymentMethod === "boleto" ? "active" : ""
                }`}
              >
                <input
                  type="radio"
                  name="paymentMethod"
                  id="boleto"
                  value="boleto"
                  checked={paymentMethod === "boleto"}
                  onChange={() => handlePaymentMethodChange("boleto")}
                />
                <label htmlFor="boleto" className="boleto">
                  <span>Boleto Bancário</span>
                  <FaBarcode className="payment-icon" />
                </label>
              </div>
            </div>

            {paymentMethod === "boleto" && (
              <div
                className={`boleto-form ${isBoletoSelected ? "show" : "hide"}`}
              >
                <h3>Boleto Bancário</h3>
                <p>Preencha seus dados para gerar o boleto:</p>
                <input
                  type="text"
                  placeholder="Nome"
                  value={cardholderName}
                  onChange={(e) => setCardholderName(e.target.value)}
                  required
                />
                <InputMask
                  type="text"
                  mask="999.999.999-99"
                  placeholder="CPF"
                  value={creditCard}
                  onChange={(e) => setCreditCard(e.target.value)}
                  required
                />
                <button
                  className="payment-button"
                  onClick={handlePaymentSubmit}
                >
                  Gerar Boleto
                </button>
              </div>
            )}
            {paymentMethod === "creditCard" && (
              <form
                onSubmit={handlePaymentSubmit}
                className={`credit-card-inputs ${
                  isCreditCardSelected ? "show" : "hide"
                }`}
              >
                <h3>Informações do Cartão de Crédito</h3>
                <div className="credit-card-inputs">
                  <label htmlFor="creditCardNumber">Número do Cartão:</label>
                  <input
                    type="text"
                    id="creditCardNumber"
                    value={creditCard}
                    onChange={(e) => setCreditCard(e.target.value)}
                    required
                  />

                  <label htmlFor="cardholderName">Nome do Titular:</label>
                  <input
                    type="text"
                    id="cardholderName"
                    value={cardholderName}
                    onChange={(e) => setCardholderName(e.target.value)}
                    required
                  />

                  <label htmlFor="expirationDate">Data de Expiração:</label>
                  <InputMask
                    mask="99/99"
                    type="text"
                    id="expirationDate"
                    value={expirationDate}
                    onChange={(e) => setExpirationDate(e.target.value)}
                    required
                  />

                  <label htmlFor="securityCode">Código de Segurança:</label>
                  <InputMask
                    mask="999"
                    type="text"
                    id="securityCode"
                    value={securityCode}
                    onChange={(e) => setSecurityCode(e.target.value)}
                    required
                  />
                </div>

                <button type="submit" className="checkout-button">
                  Confirmar Pagamento
                </button>
              </form>
            )}
          </Box>
        </Modal>

        {/* Toast Container */}
        <ToastContainer />
      </div>
    </div>
  );
};

export default Cart;
