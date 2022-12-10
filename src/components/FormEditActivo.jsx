import React, { useState } from "react";
import useActivo from "../hooks/useActivo";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import Alert from "@mui/material/Alert";
import { curpRegex, emailRegex, nombreRegex } from "../hooks/constantes";
import { scrollToTop } from "../hooks/scrollToTop";

const FormEditActivo = () => {
  const { dataAsset, urlImg, idAsset, editAssetById } = useActivo();
  const dateDb = dataAsset?.dateImplemen;
  const arrayDate = dateDb.split("/");
  const newDateDb = `${arrayDate[1]}/${arrayDate[0]}/${arrayDate[2]}`;

  const [msg, setMsg] = useState("");
  const [typeAlert, setTypeAlert] = useState("");
  const [tipoDispositivo, setTipoDispositivo] = useState(
    dataAsset?.tipoDispositivo
  );
  const [ubicacion, setUbicacion] = useState(dataAsset?.ubicacion);
  const [piso, setPiso] = useState(dataAsset?.piso);
  const [nombre, setNombre] = useState(dataAsset?.nombre);
  const [curp, setCurp] = useState(dataAsset?.curp);
  const [telefono, setTelefono] = useState(dataAsset?.telefono);
  const [perfilDispo, setPerfilDispo] = useState(dataAsset?.perfilDispo);
  const [noSerie, setNoSerie] = useState(dataAsset?.noSerie);
  const [ip, setIp] = useState(dataAsset?.ip);
  const [modelo, setModelo] = useState(dataAsset?.modelo);
  const [noResguardo, setNoResguardo] = useState(dataAsset?.noResguardo);
  const [fechaImplementacion, setFechaImplementacion] = useState(newDateDb);
  const [inmueble, setInmueble] = useState(dataAsset?.inmueble);
  const [puesto, setPuesto] = useState(dataAsset?.puesto);
  const [email, setEmail] = useState(dataAsset?.email);
  const [extension, setExtension] = useState(dataAsset?.extension);
  const [jefeDir, setJefeDir] = useState(dataAsset?.jefeDir);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      [
        tipoDispositivo,
        ubicacion,
        piso,
        nombre,
        curp,
        telefono,
        perfilDispo,
        noSerie,
        ip,
        modelo,
        noResguardo,
        fechaImplementacion,
        inmueble,
        puesto,
        email,
        extension,
        jefeDir,
      ].includes("")
    ) {
      setTypeAlert("error");
      setMsg("Todos los campos son obligatorios!");
      setTimeout(() => {
        setMsg("");
        setTypeAlert("");
      }, 2500);
      return;
    }

    if (!nombreRegex.test(nombre) || !nombreRegex.test(jefeDir)) {
      setTypeAlert("error");
      setMsg("El nombre ingresado no es valido.");
      setTimeout(() => {
        setMsg("");
        setTypeAlert("");
      }, 2500);
      return;
    }
    if (!curpRegex.test(curp)) {
      setTypeAlert("error");
      setMsg("CURP no valida.");
      setTimeout(() => {
        setMsg("");
        setTypeAlert("");
      }, 2500);
      return;
    }

    if (!emailRegex.test(email)) {
      setTypeAlert("error");
      setMsg("Email no valido.");
      setTimeout(() => {
        setMsg("");
        setTypeAlert("");
      }, 2500);
      return;
    }

    if (telefono.length !== 10) {
      setTypeAlert("error");
      setMsg("Número telefonico no valido.");
      setTimeout(() => {
        setMsg("");
        setTypeAlert("");
      }, 2500);
      return;
    }

    const dateAsset = `${fechaImplementacion.$D}/${
      fechaImplementacion.$M + 1
    }/${fechaImplementacion.$y}`;

    const arrayDateDb = newDateDb.split("/");
    const noEditDate = `${arrayDateDb[1]}/${arrayDateDb[0]}/${arrayDateDb[2]}`;

    const data = {
      dateImplemen:
        dateAsset === dataAsset?.dateImplemen ? noEditDate : dateAsset,
      urlImg: dataAsset?.urlImg ? dataAsset?.urlImg : urlImg,
      tipoDispositivo,
      ubicacion,
      piso,
      nombre,
      curp: curp.toUpperCase(),
      telefono,
      perfilDispo,
      noSerie,
      ip,
      modelo,
      noResguardo,
      inmueble,
      puesto,
      email,
      extension,
      jefeDir,
    };
    scrollToTop();
    const response = await editAssetById(idAsset, data);

    if (response) {
      setTypeAlert("success");
      setMsg("Ticket actualizado correctamente");
      setTimeout(() => {
        setMsg("");
        setTypeAlert("");
      }, 3000);
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
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr" }}>
          <TextField
            label="Tipo de Dispositivo"
            id="outlined-start-adornment"
            size="small"
            sx={{
              width: "90%",
              margin: "10px 0",
            }}
            value={tipoDispositivo}
            onChange={(e) => setTipoDispositivo(e.target.value)}
          />
          <TextField
            label="Ubicación"
            id="outlined-start-adornment"
            size="small"
            sx={{
              width: "90%",
              margin: "10px 0",
            }}
            value={ubicacion}
            onChange={(e) => setUbicacion(e.target.value)}
          />
          <TextField
            label="Piso"
            id="outlined-start-adornment"
            size="small"
            sx={{
              width: "90%",
              margin: "10px 0",
            }}
            type="number"
            inputProps={{
              maxLength: 3,
              min: 1,
            }}
            value={piso}
            onChange={(e) => setPiso(e.target.value)}
          />
          <TextField
            label="Nombre Solicitante"
            id="outlined-start-adornment"
            size="small"
            sx={{
              width: "90%",
              margin: "10px 0",
            }}
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
          />
          <TextField
            label="CURP"
            id="outlined-start-adornment"
            size="small"
            sx={{
              width: "90%",
              margin: "10px 0",
            }}
            value={curp}
            onChange={(e) => setCurp(e.target.value)}
          />
          <TextField
            label="Telefono"
            id="outlined-start-adornment"
            size="small"
            type="number"
            sx={{
              width: "90%",
              margin: "10px 0",
            }}
            value={telefono}
            onChange={(e) => setTelefono(e.target.value)}
          />
          <TextField
            label="Perfil del Dispositivo"
            id="outlined-start-adornment"
            size="small"
            sx={{
              width: "90%",
              margin: "10px 0",
            }}
            value={perfilDispo}
            onChange={(e) => setPerfilDispo(e.target.value)}
          />
          <TextField
            label="Numero de Serie"
            id="outlined-start-adornment"
            size="small"
            sx={{
              width: "90%",
              margin: "10px 0",
            }}
            value={noSerie}
            onChange={(e) => setNoSerie(e.target.value)}
          />
          <TextField
            label="IP"
            id="outlined-start-adornment"
            size="small"
            sx={{
              width: "90%",
              margin: "10px 0",
            }}
            value={ip}
            onChange={(e) => setIp(e.target.value)}
          />
          <TextField
            label="Modelo"
            id="outlined-start-adornment"
            size="small"
            sx={{
              width: "90%",
              margin: "10px 0",
            }}
            value={modelo}
            onChange={(e) => setModelo(e.target.value)}
          />
          <TextField
            label="Numero de Resguardo"
            id="outlined-start-adornment"
            size="small"
            sx={{
              width: "90%",
              margin: "10px 0",
            }}
            value={noResguardo}
            onChange={(e) => setNoResguardo(e.target.value)}
          />
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DesktopDatePicker
              label="Fecha de Implementacion"
              value={fechaImplementacion}
              onChange={(newValue) => {
                setFechaImplementacion(newValue);
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
            label="Inmueble"
            id="outlined-start-adornment"
            size="small"
            sx={{
              width: "90%",
              margin: "10px 0",
            }}
            value={inmueble}
            onChange={(e) => setInmueble(e.target.value)}
          />
          <TextField
            label="Puesto"
            id="outlined-start-adornment"
            size="small"
            sx={{
              width: "90%",
              margin: "10px 0",
            }}
            value={puesto}
            onChange={(e) => setPuesto(e.target.value)}
          />
          <TextField
            label="Email"
            id="outlined-start-adornment"
            size="small"
            sx={{
              width: "90%",
              margin: "10px 0",
            }}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            label="Extensión"
            id="outlined-start-adornment"
            size="small"
            type="number"
            sx={{
              width: "90%",
              margin: "10px 0",
            }}
            value={extension}
            onChange={(e) => setExtension(e.target.value)}
          />
          <TextField
            label="Jefe Directo"
            id="outlined-start-adornment"
            size="small"
            sx={{
              width: "90%",
              margin: "10px 0",
            }}
            value={jefeDir}
            onChange={(e) => setJefeDir(e.target.value)}
          />
        </div>
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

export default FormEditActivo;
