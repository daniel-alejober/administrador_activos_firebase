import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./views/Login";
import Dashboard from "./views/Dashboard";
import NuevoActivo from "./views/NuevoActivo";
import { ProtectedRroutes } from "./ProtectedRroutes";
import { AdminProvider } from "../src/context/AdminProvider";
import { ActivoProvider } from "../src/context/ActivoProvider";

function App() {
  return (
    <BrowserRouter>
      <AdminProvider>
        <ActivoProvider>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route element={<ProtectedRroutes />}>
              <Route path="/" element={<Dashboard />} />
              <Route path="/newasset" element={<NuevoActivo />} />
            </Route>
          </Routes>
        </ActivoProvider>
      </AdminProvider>
    </BrowserRouter>
  );
}

export default App;
