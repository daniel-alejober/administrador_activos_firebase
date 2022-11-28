import React, { useState } from "react";
import { db } from "../firebase/firebase";
import { collection, addDoc } from "firebase/firestore";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Alert from "@mui/material/Alert";

export default function ModalNuevoServicio({
  openModal,
  setOpenModal,
  nameService,
  setNameService,
  getServices,
}) {
  const [msg, setMsg] = useState("");
  const [typeAlert, setTypeAlert] = useState("");
  const regexOnlyLetters = /^[a-zA-Z\s]*$/;

  const handleClose = () => {
    setOpenModal(false);
  };

  const createNewService = async (service) => {
    try {
      const docRef = await addDoc(collection(db, "services"), { service });
      return docRef;
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (nameService === "") {
      setTypeAlert("error");
      setMsg("El campo de servicio es obligatorio");
      setTimeout(() => {
        setMsg("");
        setTypeAlert("");
      }, 2500);
      return;
    }

    if (!regexOnlyLetters.test(nameService)) {
      setTypeAlert("error");
      setMsg("Solo esta permitido usar letras");
      setNameService("");
      setTimeout(() => {
        setMsg("");
        setTypeAlert("");
      }, 2500);
      return;
    }
    const service = nameService;
    const docRef = await createNewService(service);

    if (docRef.id) {
      getServices();
      setTypeAlert("success");
      setMsg("Servicio Agregado Correctamente");
      setNameService("");
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
          Nuevo Servicio
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
              value={nameService}
              onChange={(e) => setNameService(e.target.value)}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="error">
              Cancelar
            </Button>
            <Button color="success" type="submit">
              Agregar
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
}
