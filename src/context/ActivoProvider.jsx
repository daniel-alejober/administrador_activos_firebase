import { createContext, useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebase/firebase";

const ActivoContext = createContext();

const ActivoProvider = ({ children }) => {
  const [headerNav, setHeaderNav] = useState(0);
  const [assetRef, setAssetRef] = useState({});

  const createNewAsset = async ({ nameAsset, date, typeService, quantity }) => {
    //* setDoc(doc(db, "cities", "LA"){}) -- setDoc() sirve para crear o sobreescribir un documento pero el mejor hacerlos por el metodo addDoc() ya que asi firebase te genera un id unico
    //*Parametros de la funcion doc(db, "nombreColleccion", "idUnico")
    //* 1.- conexion a la db
    //* 2.- nombre de la coleccion
    //* 3.- id unico

    try {
      const docRef = await addDoc(collection(db, "assets"), {
        nameAsset,
        date,
        typeService,
        quantity,
      });
      setAssetRef(docRef);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <ActivoContext.Provider
      value={{ headerNav, assetRef, setHeaderNav, createNewAsset }}
    >
      {children}
    </ActivoContext.Provider>
  );
};

export { ActivoProvider };
export default ActivoContext;
