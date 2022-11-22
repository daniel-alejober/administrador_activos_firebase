import React, { useState } from "react";
import useActivo from "../hooks/useActivo";
import { uid } from "../hooks/uid";
import { storage } from "../firebase/firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import CircularProgress from "@mui/material/CircularProgress";
import IconButton from "@mui/material/IconButton";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert";

const ImagenNuevoActivo = () => {
  const { setUrlImg, file, setFile } = useActivo();
  const [uploadImg, setUploadImg] = useState(false);
  const [msg, setMsg] = useState("");
  const [typeAlert, setTypeAlert] = useState("");

  const saveImg = () => {
    const name = uid();
    const storageRef = ref(storage, name);
    const uploadTask = uploadBytesResumable(storageRef, file);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        setUploadImg(true);
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        switch (snapshot.state) {
          case "paused":
            console.log("Upload is paused");
            break;
          case "running":
            console.log("Upload is running");
            break;
          default:
            break;
        }
      },
      (error) => {
        console.log(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setUrlImg(downloadURL);
          setUploadImg(false);
          if (downloadURL) {
            setTypeAlert("success");
            setMsg("Imagen validada correctamente");
            setTimeout(() => {
              setMsg("");
              setTypeAlert("");
            }, 2500);
            return;
          }
        });
      }
    );
  };

  return (
    <Grid
      container
      direction="column"
      justifyContent="center"
      alignItems="center"
    >
      <img
        style={{
          width: "200px",
          height: "200px",
          borderRadius: "50%",
          objectFit: "cover",
        }}
        src={
          file
            ? URL.createObjectURL(file)
            : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
        }
        alt="activo"
      />
      <IconButton color="primary" aria-label="upload picture" component="label">
        <input
          hidden
          accept="image/*"
          type="file"
          onChange={(e) => setFile(e.target.files[0])}
        />
        <PhotoCamera />
      </IconButton>
      {file && uploadImg === false ? (
        <Button
          sx={{
            width: "50%",
            margin: "15px auto",
          }}
          size="small"
          variant="contained"
          color="success"
          onClick={saveImg}
        >
          Validar Imagen
        </Button>
      ) : null}
      {file && uploadImg ? <CircularProgress /> : null}
      {msg && (
        <Alert
          severity={typeAlert}
          sx={{ marginBottom: "20px" }}
          children={msg}
        />
      )}
    </Grid>
  );
};

export default ImagenNuevoActivo;
