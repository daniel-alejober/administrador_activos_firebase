import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Box from "@mui/material/Box";
import { db } from "../firebase/firebase";
import { doc, getDoc } from "firebase/firestore";
import "./Reporte.css";

const ReporteQr = () => {
  const { id } = useParams();

  const [dataAsset, setDataAsset] = useState({});

  useEffect(() => {
    getAssetById();
  }, []);

  const getAssetById = async () => {
    try {
      const docRef = doc(db, "assets", id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setDataAsset(docSnap.data());
        console.log(docSnap.data());
      }
    } catch (error) {
      console.log(data);
    }
  };

  return (
    <Box
      sx={{
        width: "100%",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        background: "#081627",
      }}
    >
      <div>
        <h1 className="titulo">{`Reporte Ticket ${id}`}</h1>
        <div className="containerInfo">
          <div className="info">
            <h2
              style={{
                color: "#6fa1b9",
                fontSize: "20px",
                textAlign: "center",
              }}
            >
              Datos Solicitante
            </h2>
            <p
              style={{
                color: "#e5e9eb",
              }}
            >
              Nombre Solicitante:
              <span style={{ fontWeight: "bolder" }}> {dataAsset?.nombre}</span>
            </p>
            <p
              style={{
                color: "#e5e9eb",
              }}
            >
              CURP:
              <span style={{ fontWeight: "bolder" }}> {dataAsset?.curp}</span>
            </p>
            <p
              style={{
                color: "#e5e9eb",
              }}
            >
              Email:
              <span style={{ fontWeight: "bolder" }}> {dataAsset?.email}</span>
            </p>
            <p
              style={{
                color: "#e5e9eb",
              }}
            >
              Telefono:
              <span style={{ fontWeight: "bolder" }}>
                {" "}
                {dataAsset?.telefono}
              </span>
            </p>
            <p
              style={{
                color: "#e5e9eb",
              }}
            >
              Extensión:
              <span style={{ fontWeight: "bolder" }}>
                {" "}
                {dataAsset?.extension}
              </span>
            </p>
            <p
              style={{
                color: "#e5e9eb",
              }}
            >
              Puesto:
              <span style={{ fontWeight: "bolder" }}> {dataAsset?.puesto}</span>
            </p>
            <p
              style={{
                color: "#e5e9eb",
              }}
            >
              Jefe Directo:
              <span style={{ fontWeight: "bolder" }}>
                {" "}
                {dataAsset?.jefeDir}
              </span>
            </p>
          </div>
          <div className="info">
            <h2
              style={{
                color: "#6fa1b9",
                fontSize: "20px",
                textAlign: "center",
              }}
            >
              Datos Activo
            </h2>
            <p
              style={{
                color: "#e5e9eb",
              }}
            >
              Perfil Dispositivo:
              <span style={{ fontWeight: "bolder" }}>
                {" "}
                {dataAsset?.perfilDispo}
              </span>
            </p>
            <p
              style={{
                color: "#e5e9eb",
              }}
            >
              Tipo de Dispositivo:
              <span style={{ fontWeight: "bolder" }}>
                {" "}
                {dataAsset?.tipoDispositivo}
              </span>
            </p>
            <p
              style={{
                color: "#e5e9eb",
              }}
            >
              Modelo:
              <span style={{ fontWeight: "bolder" }}> {dataAsset?.modelo}</span>
            </p>
            <p
              style={{
                color: "#e5e9eb",
              }}
            >
              Numero de Serie:
              <span style={{ fontWeight: "bolder" }}>
                {" "}
                {dataAsset?.noSerie}
              </span>
            </p>
            <p
              style={{
                color: "#e5e9eb",
              }}
            >
              Numero de Resguardo:
              <span style={{ fontWeight: "bolder" }}>
                {" "}
                {dataAsset?.noResguardo}
              </span>
            </p>
            <p
              style={{
                color: "#e5e9eb",
              }}
            >
              Fecha Implementación:
              <span style={{ fontWeight: "bolder" }}>
                {" "}
                {dataAsset?.dateImplemen}
              </span>
            </p>
            <p
              style={{
                color: "#e5e9eb",
              }}
            >
              Inmueble:
              <span style={{ fontWeight: "bolder" }}>
                {" "}
                {dataAsset?.inmueble}
              </span>
            </p>
          </div>
        </div>
      </div>
    </Box>
  );
};

export default ReporteQr;
