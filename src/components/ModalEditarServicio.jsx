import React, { useState } from "react";
import { db } from "../firebase/firebase";
import { doc, setDoc } from "firebase/firestore";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Alert from "@mui/material/Alert";

export default function ModalEditarServicio({
  openModal,
  setOpenModal,
  dataService,
  serviceId,
  getServices,
  setDataService,
}) {
  const [msg, setMsg] = useState("");
  const [typeAlert, setTypeAlert] = useState("");
  const [editNameService, setEditNameService] = useState(dataService?.service);
  const regexOnlyLetters = /^[a-zA-Z\s]*$/;

  const handleClose = () => {
    setOpenModal(false);
    setDataService({});
  };

  const editService = async (service) => {
    let exito = false;
    try {
      const docRef = doc(db, "services", serviceId);
      await setDoc(docRef, {
        service,
      });
      exito = true;
      return exito;
    } catch (error) {
      console.log(error);
      exito = true;
      return exito;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (editNameService === "") {
      setTypeAlert("error");
      setMsg("El campo de servicio es obligatorio");
      setTimeout(() => {
        setMsg("");
        setTypeAlert("");
      }, 2500);
      return;
    }

    if (!regexOnlyLetters.test(editNameService)) {
      setTypeAlert("error");
      setMsg("Solo esta permitido usar letras");
      setEditNameService("");
      setTimeout(() => {
        setMsg("");
        setTypeAlert("");
      }, 2500);
      return;
    }
    const service = editNameService;
    const exito = await editService(service);

    if (exito) {
      getServices();
      setTypeAlert("success");
      setMsg("Servicio Actualizado Correctamente");
      setEditNameService("");
      setTimeout(() => {
        setMsg("");
        setTypeAlert("");
        handleClose();
      }, 2000);
    }
    if (!exito) {
      setTypeAlert("console.error();");
      setMsg("Error en el servidor");
      setEditNameService("");
      setTimeout(() => {
        setMsg("");
        setTypeAlert("");
        handleClose();
      }, 2000);
    }
  };

  return (
    <div>
      <Dialog open={openModal} onClose={handleClose}>
        <DialogTitle
          style={{
            color: "#006db3",
            textAlign: "center",
            fontWeight: "bolder",
          }}
        >
          Editar Servicio
        </DialogTitle>
        <form onSubmit={handleSubmit}>
          {msg && (
            <Alert
              variant="outlined"
              severity={typeAlert}
              sx={{
                margin: "0 15px",
              }}
              children={msg}
            />
          )}
          <DialogContent>
            <DialogContentText
              style={{
                color: "#081627",
                textAlign: "center",
                fontWeight: "bold",
              }}
            >
              Ingresa el nombre del servicio, evita utilizar numeros o
              caracteres espereciales.
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Servicio"
              type="text"
              fullWidth
              variant="standard"
              value={editNameService}
              onChange={(e) => setEditNameService(e.target.value)}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="error">
              Cancelar
            </Button>
            <Button color="success" type="submit">
              Actualizar
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
}
