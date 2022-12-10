import { createContext, useState } from "react";
import {
  collection,
  addDoc,
  getDocs,
  doc,
  getDoc,
  setDoc,
} from "firebase/firestore";
import { db } from "../firebase/firebase";
import { useNavigate } from "react-router-dom";

const ActivoContext = createContext();

const ActivoProvider = ({ children }) => {
  const navigate = useNavigate();
  const [headerNav, setHeaderNav] = useState(0);
  const [assetRef, setAssetRef] = useState({});
  const [file, setFile] = useState("");
  const [urlImg, setUrlImg] = useState("");
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(false);
  const [dataAsset, setDataAsset] = useState({});
  const [idAsset, setIdAsset] = useState("");

  const createNewAsset = async ({
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
    dateImplemen,
    inmueble,
    puesto,
    email,
    extension,
    jefeDir,
    urlImg,
  }) => {
    //* setDoc(doc(db, "cities", "LA"){}) -- setDoc() sirve para crear o sobreescribir un documento pero el mejor hacerlos por el metodo addDoc() ya que asi firebase te genera un id unico
    //*Parametros de la funcion doc(db, "nombreColleccion", "idUnico")
    //* 1.- conexion a la db
    //* 2.- nombre de la coleccion
    //* 3.- id unico
    let response;
    try {
      const docRef = await addDoc(collection(db, "assets"), {
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
        dateImplemen,
        inmueble,
        puesto,
        email,
        extension,
        jefeDir,
        urlImg,
      });
      setAssetRef(docRef);
      response = true;
      return response;
    } catch (error) {
      response = false;
      console.log(error);
    }
  };

  const getAssets = async () => {
    setLoading(true);
    let list = [];
    try {
      const querySnapshot = await getDocs(collection(db, "assets"));
      querySnapshot.forEach((doc) => {
        let data = doc.data();
        data.id = doc.id;
        list.push(data);
      });
      setRows(list);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const getAssetById = async (id) => {
    setIdAsset(id);
    try {
      const docRef = doc(db, "assets", id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setDataAsset(docSnap.data());
      }
    } catch (error) {
      console.log(data);
    }
  };

  const editAssetById = async (
    id,
    {
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
      dateImplemen,
      inmueble,
      puesto,
      email,
      extension,
      jefeDir,
      urlImg,
    }
  ) => {
    let response;
    try {
      const docRef = doc(db, "assets", id);

      await setDoc(docRef, {
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
        dateImplemen,
        inmueble,
        puesto,
        email,
        extension,
        jefeDir,
        urlImg,
      });
      response = true;
      return response;
    } catch (error) {
      response = false;
      console.log(error);
    }
  };

  return (
    <ActivoContext.Provider
      value={{
        headerNav,
        assetRef,
        urlImg,
        file,
        rows,
        loading,
        dataAsset,
        idAsset,
        getAssets,
        setFile,
        setUrlImg,
        setHeaderNav,
        createNewAsset,
        getAssetById,
        editAssetById,
        setRows,
      }}
    >
      {children}
    </ActivoContext.Provider>
  );
};

export { ActivoProvider };
export default ActivoContext;
