import { useContext } from "react";
import ActivoContext from "../context/ActivoProvider";

const useActivo = () => {
  return useContext(ActivoContext);
};

export default useActivo;
