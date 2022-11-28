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
  const [rowsServices, setRowsServices] = useState([]);
  const [serviceId, setServiceId] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [nameService, setNameService] = useState("");
  const [dataService, setDataService] = useState({});

  const handleOpen = () => {
    setNameService("");
    setOpenModal(true);
  };

  const createNewAsset = async ({
    nameAsset,
    date,
    typeService,
    quantity,
    urlImg,
    price,
  }) => {
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
        urlImg,
        price,
      });
      setAssetRef(docRef);
    } catch (error) {
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
        setDataAsset();
      }
    } catch (error) {
      console.log(data);
    }
  };

  const editAssetById = async (id, data) => {
    try {
      const docRef = doc(db, "assets", id);

      await setDoc(docRef, {
        nameAsset: data?.nameAsset,
        date: data?.date,
        typeService: data?.typeService,
        quantity: data?.quantity,
        urlImg: data?.urlImg,
        price: data?.price,
      });
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  const getServices = async () => {
    setLoading(true);
    let list = [];
    try {
      const querySnapshot = await getDocs(collection(db, "services"));
      querySnapshot.forEach((doc) => {
        let data = doc.data();
        data.id = doc.id;
        list.push(data);
      });
      setRowsServices(list);

      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const getServiceById = async (id) => {
    setServiceId(id);
    try {
      const docRef = doc(db, "services", id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setDataService(docSnap.data());
      }
    } catch (error) {
      console.log(data);
    }
  };

  const editService = async (id) => {
    await getServiceById(id);
    handleOpen();
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
        rowsServices,
        serviceId,
        openModal,
        nameService,
        dataService,
        getAssets,
        setFile,
        setUrlImg,
        setHeaderNav,
        createNewAsset,
        getAssetById,
        editAssetById,
        getServices,
        editService,
        handleOpen,
        setOpenModal,
        setNameService,
        setDataService,
      }}
    >
      {children}
    </ActivoContext.Provider>
  );
};

export { ActivoProvider };
export default ActivoContext;
