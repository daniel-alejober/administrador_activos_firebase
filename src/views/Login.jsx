import { useState } from "react";
import useAdmin from "../hooks/useAdmin";
import IconButton from "@mui/material/IconButton";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const { codeError, login } = useAdmin();
  const navigate = useNavigate();
  const [values, setValues] = useState({
    password: "",
    email: "",
    showPassword: false,
  });
  const [msg, setMsg] = useState("");

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (values.email === "" || values.password === "") {
      setMsg("Todos los campos son obligatorios!");
      setTimeout(() => {
        setMsg("");
      }, 2000);
      return;
    }

    login(values.email, values.password);
    setValues({
      password: "",
      email: "",
    });

    if (codeError === "auth/invalid-email") {
      setMsg("Ingresa un email valido.");
      setTimeout(() => {
        setMsg("");
      }, 2000);
      return;
    }
    if (codeError === "auth/user-not-found") {
      setMsg("Usuario no encontrado.");
      setTimeout(() => {
        setMsg("");
      }, 2000);
      return;
    }
    if (codeError === "auth/wrong-password") {
      setMsg("Contraseña equivocada.");
      setTimeout(() => {
        setMsg("");
      }, 2000);
      return;
    }
  };

  return (
    <Box
      sx={{
        width: "100%",
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        background: "#081627",
      }}
    >
      <button onClick={navigate("/report-ticket/1")}>Reporte</button>
      <h1 style={{ color: "#006db3", fontSize: "50px", textAlign: "center" }}>
        ADMINISTRADOR DE ACTIVOS
      </h1>
      {msg && (
        <Alert
          variant="outlined"
          severity="error"
          sx={{ marginBottom: "20px" }}
          children={msg}
        />
      )}
      <form
        onSubmit={handleSubmit}
        style={{ display: "flex", flexDirection: "column" }}
      >
        <TextField
          label="Email"
          id="outlined-start-adornment"
          sx={{
            m: 1,
            width: "25ch",
            input: { color: "#eaeff1" },
            label: { color: "#eaeff1" },
          }}
          value={values.email}
          onChange={handleChange("email")}
        />
        <FormControl sx={{ m: 1, width: "25ch" }} variant="outlined">
          <InputLabel
            htmlFor="outlined-adornment-password"
            error={values.error}
            sx={{ color: "#eaeff1" }}
          >
            Password
          </InputLabel>
          <OutlinedInput
            sx={{ color: "#eaeff1" }}
            id="outlined-adornment-password"
            type={values.showPassword ? "text" : "password"}
            value={values.password}
            onChange={handleChange("password")}
            error={values.error}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                  sx={{ color: "#eaeff1" }}
                >
                  {values.showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            label="Password"
          />
        </FormControl>
        <Button variant="contained" color="success" type="submit">
          Enviar
        </Button>
      </form>
    </Box>
  );
};

export default Login;
