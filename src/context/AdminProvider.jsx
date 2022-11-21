import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/firebase";

const AdminContext = createContext();

const AdminProvider = ({ children }) => {
  const navigate = useNavigate();
  const [userAuth, setUserAuth] = useState({});
  const [codeError, setCodeError] = useState("");

  const login = async (email, password) => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      setUserAuth(userCredential.user);
      if (userAuth.accessToken) {
        localStorage.setItem("user", JSON.stringify(userAuth));
        navigate("/");
      }
    } catch (error) {
      setCodeError(error.code);
    }
  };

  return (
    <AdminContext.Provider value={{ userAuth, codeError, login }}>
      {children}
    </AdminContext.Provider>
  );
};

export { AdminProvider };
export default AdminContext;
