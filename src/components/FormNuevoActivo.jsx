import React, { useState } from "react";
import useActivo from "../hooks/useActivo";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import dayjs from "dayjs";
import Alert from "@mui/material/Alert";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";

const FormNuevoActivo = () => {
  const { createNewAsset, assetRef, urlImg, setFile } = useActivo();
  let now = dayjs();
  const [msg, setMsg] = useState("");
  const [typeAlert, setTypeAlert] = useState("");

  const [nombreActivo, setNombreActivo] = useState("");
  const [fechaActivo, setFechaActivo] = useState(now);
  const [servicio, setServicio] = useState("");
  const [cantidad, setCantidad] = useState(1);
  const [precio, setPrecio] = useState(0);
  const serviciosLista = [
    { id: 1, nombre: "Pagina Web" },
    { id: 2, nombre: "Telefonia" },
    { id: 3, nombre: "Impresoras" },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();

    if ([nombreActivo, fechaActivo, servicio, cantidad, precio].includes("")) {
      setTypeAlert("error");
      setMsg("Todos los campos son obligatorios!");
      setTimeout(() => {
        setMsg("");
        setTypeAlert("");
      }, 2500);
      return;
    }

    if (precio <= 0) {
      setTypeAlert("error");
      setMsg("Ingresa un precio valido");
      setTimeout(() => {
        setMsg("");
        setTypeAlert("");
      }, 2500);
      return;
    }

    if (urlImg === "") {
      setTypeAlert("error");
      setMsg("No hay imagen valida");
      setTimeout(() => {
        setMsg("");
        setTypeAlert("");
      }, 2500);
      return;
    }

    const dateAsset = `${fechaActivo.$D}/${fechaActivo.$M + 1}/${
      fechaActivo.$y
    }`;

    const data = {
      nameAsset: nombreActivo,
      date: dateAsset,
      typeService: servicio,
      quantity: cantidad,
      urlImg: urlImg,
      price: precio,
    };
    createNewAsset(data);

    if (assetRef.id) {
      setFile("");
      setNombreActivo("");
      setFechaActivo(null);
      setServicio("");
      setCantidad(1);
      setTypeAlert("success");
      setMsg("Activo agregado correctamente");
      setTimeout(() => {
        setMsg("");
        setTypeAlert("");
      }, 2500);
      return;
    }
  };

  return (
    <Grid
      container
      direction="column"
      justifyContent="center"
      alignItems="center"
    >
      {msg && (
        <Alert
          variant="outlined"
          severity={typeAlert}
          sx={{ marginBottom: "20px" }}
          children={msg}
        />
      )}
      <form
        onSubmit={handleSubmit}
        style={{ display: "flex", flexDirection: "column" }}
      >
        <TextField
          label="Nombre Activo"
          id="outlined-start-adornment"
          size="small"
          sx={{
            width: "90%",
          }}
          value={nombreActivo}
          onChange={(e) => setNombreActivo(e.target.value)}
        />
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DesktopDatePicker
            label="Fecha"
            value={fechaActivo}
            onChange={(newValue) => {
              setFechaActivo(newValue);
            }}
            renderInput={(params) => (
              <TextField
                size="small"
                sx={{
                  width: "90%",
                  margin: "10px 0",
                }}
                {...params}
              />
            )}
          />
        </LocalizationProvider>
        <TextField
          id="outlined-select-currency"
          select
          label="Servicios"
          value={servicio}
          onChange={(e) => setServicio(e.target.value)}
          size="small"
          sx={{
            width: "90%",
            margin: "10px 0",
          }}
        >
          {serviciosLista.map((option) => (
            <MenuItem key={option.id} value={option.id}>
              {option.nombre}
            </MenuItem>
          ))}
        </TextField>

        <TextField
          size="small"
          sx={{
            width: "90%",
            margin: "10px 0",
          }}
          type="number"
          InputProps={{
            inputProps: {
              max: 100,
              min: 1,
            },
          }}
          label="Cantidad"
          value={cantidad}
          onChange={(e) => setCantidad(e.target.value)}
        />

        <FormControl>
          <InputLabel htmlFor="outlined-adornment-amount">Precio</InputLabel>
          <OutlinedInput
            InputProps={{
              inputProps: {
                min: 0,
              },
            }}
            size="small"
            sx={{
              width: "90%",
              margin: "10px 0",
            }}
            type="number"
            id="outlined-adornment-amount"
            value={precio}
            onChange={(e) => setPrecio(e.target.value)}
            startAdornment={<InputAdornment position="start">$</InputAdornment>}
            label="Cantidad"
          />
        </FormControl>

        <Button
          sx={{
            width: "50%",
            margin: "15px auto",
          }}
          size="small"
          variant="contained"
          color="success"
          type="submit"
        >
          Enviar
        </Button>
      </form>
    </Grid>
  );
};

export default FormNuevoActivo;
