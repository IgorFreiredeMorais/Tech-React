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
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const schema = yup.object().shape({
  email: yup.string().email("Email inválido").required("Campo obrigatório"),
  password: yup
    .string()
    .required("Campo obrigatório")
    .min(4, "Mínimo de 4 caracteres"),
});

function Login() {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const [darkMode, setDarkMode] = useState(false);
  const [type, setType] = useState("password");

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const handleToggle = () => {
    setType((prevType) => (prevType === "password" ? "text" : "password"));
  };

  const { login } = useContext(AuthContext);

  const handleLogin = (data) => {
    const { email, password } = data;
    login(email, password);
  };

  return (
    <main id="container">
      <form
        id="login_form"
        className={darkMode ? "dark" : ""}
        onSubmit={handleSubmit(handleLogin)}
      >
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
            </label>
            <div className="input-field">
              <EmailIcon className={darkMode ? "white-icon" : "black-icon"} />
              <Controller
                name="email"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <input
                    type="email"
                    id="email"
                    {...field}
                    autoComplete="off"
                  />
                )}
              />
            </div>
            {errors.email && (
              <span className="error-message">{errors.email.message}</span>
            )}
          </div>

          <div className="input-box">
            <label
              htmlFor="password"
              className={darkMode ? "white-icon" : "black-icon"}
            >
              Password
            </label>
            <div className="input-field">
              <KeyIcon className={darkMode ? "white-icon" : "black-icon"} />
              <Controller
                name="password"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <input type={type} id="password" {...field} />
                )}
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
            {errors.password && (
              <span className="error-message">{errors.password.message}</span>
            )}
          </div>
        </div>

        <button type="submit" id="login_button">
          Sign In
        </button>
      </form>
    </main>
  );
}

export default Login;
