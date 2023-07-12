import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/navbar";
import Login from "./pages/login";
import Store from "./pages/Store";
import Cart from "./pages/Cart";
import { useContext } from "react";
import { AuthProvider, AuthContext } from "./contexts/auth";
import PropTypes from "prop-types";

function App() {
  const Private = ({ children }) => {
    const { authenticated, loading } = useContext(AuthContext);

    if (loading) {
      return <div className="loading">Carregando...</div>;
    }

    if (!authenticated) {
      return <Navigate to="/" />;
    }
    return children;
  };

  Private.propTypes = {
    children: PropTypes.node.isRequired,
  };

  return (
    <>
      <AuthProvider>
        <Navbar />
        <Routes>
          <Route path="/" element={<Login />} />
          <Route
            path="Store"
            element={
              <Private>
                <Store />
              </Private>
            }
          />
          <Route
            path="Cart"
            element={
              <Private>
                <Cart />
              </Private>
            }
          />
        </Routes>
      </AuthProvider>
    </>
  );
}

export default App;
