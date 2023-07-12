import "../styles/login.css";
import { useState, useContext } from "react";
import { AuthContext } from "../contexts/auth";
import GoogleIcon from "@mui/icons-material/Google";
import FacebookIcon from "@mui/icons-material/Facebook";
import GitHubIcon from "@mui/icons-material/GitHub";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import EmailIcon from "@mui/icons-material/Email";
import KeyIcon from "@mui/icons-material/Key";
import IconButton from "@mui/material/IconButton";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import VisibilityIcon from "@mui/icons-material/Visibility";

function Login() {
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };
  const { login } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [type, setType] = useState("password");

  const handleToggle = () => {
    if (type === "password") {
      setType("text");
    } else {
      setType("password");
    }
  };

  const handleLogin = () => {
    login(email, password);
  };

  return (
    <main id="container">
      <form id="login_form" className={darkMode ? "dark" : ""}>
        <div id="form_header">
          <h1>Login</h1>
          <IconButton onClick={toggleDarkMode}>
            {darkMode ? (
              <LightModeIcon
                style={{
                  color: "white",
                }}
              />
            ) : (
              <DarkModeIcon
                style={{
                  color: "black",
                }}
              />
            )}
          </IconButton>
        </div>

        <div id="social_media">
          <a href="/">
            <FacebookIcon className={darkMode ? "white-icon" : "black-icon"} />
          </a>

          <a href="/">
            <GoogleIcon className={darkMode ? "white-icon" : "black-icon"} />
          </a>

          <a href="/">
            <GitHubIcon className={darkMode ? "white-icon" : "black-icon"} />
          </a>
        </div>

        <div id="inputs">
          <div className="input-box">
            <label
              htmlFor="email"
              className={darkMode ? "white-icon" : "black-icon"}
            >
              Email
              <div
                className="input-field"
                style={{
                  marginBottom: "4vh",
                }}
              >
                <EmailIcon className={darkMode ? "white-icon" : "black-icon"} />
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={email}
                  autoComplete="off"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </label>
          </div>

          <div className="input-box">
            <label
              htmlFor="password"
              className={darkMode ? "white-icon" : "black-icon"}
            >
              Password
              <div className="input-field">
                <KeyIcon className={darkMode ? "white-icon" : "black-icon"} />
                <input
                  type={type}
                  id="password"
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button type="button" onClick={handleToggle}>
                  {type === "password" ? (
                    <VisibilityIcon
                      className={darkMode ? "white-icon" : "black-icon"}
                    />
                  ) : (
                    <VisibilityOffIcon
                      className={darkMode ? "white-icon" : "black-icon"}
                    />
                  )}
                </button>
              </div>
            </label>

            <div id="forgot_password">
              <a href="#"></a>
            </div>
          </div>
        </div>

        <button type="button" id="login_button" onClick={handleLogin}>
          Sign In
        </button>
      </form>
    </main>
  );
}

export default Login;
