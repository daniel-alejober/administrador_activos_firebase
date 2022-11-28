import { useEffect } from "react";
import useActivo from "../hooks/useActivo";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import RefreshIcon from "@mui/icons-material/Refresh";
import CircularProgress from "@mui/material/CircularProgress";
import ModalNuevoServicio from "../components/ModalNuevoServicio";
import ModalEditarServicio from "../components/ModalEditarServicio";
import TableServices from "../components/TableServices";

const Servicios = () => {
  const {
    rowsServices,
    loading,
    getServices,
    openModal,
    setOpenModal,
    nameService,
    setNameService,
    handleOpen,
    dataService,
    serviceId,
    setDataService,
  } = useActivo();

  useEffect(() => {
    getServices();
  }, []);

  return (
    <>
      <h1 style={{ color: "#006db3", fontSize: "30px", textAlign: "center" }}>
        SERVICIOS
      </h1>
      <Paper sx={{ maxWidth: 936, margin: "auto", overflow: "hidden" }}>
        <AppBar
          position="static"
          color="default"
          elevation={0}
          sx={{ borderBottom: "1px solid #0000001e" }}
        >
          <Toolbar>
            <Grid container spacing={2} alignItems="center">
              <Grid item>
                <SearchIcon color="inherit" sx={{ display: "block" }} />
              </Grid>
              <Grid item xs>
                <TextField
                  fullWidth
                  placeholder="Buscar"
                  InputProps={{
                    disableUnderline: true,
                    sx: { fontSize: "default" },
                  }}
                  variant="standard"
                />
              </Grid>
              <Grid item>
                <Button variant="contained" sx={{ mr: 1 }} onClick={handleOpen}>
                  Agregar Servicio
                </Button>
                <Tooltip title="Reload">
                  <IconButton>
                    <RefreshIcon color="inherit" sx={{ display: "block" }} />
                  </IconButton>
                </Tooltip>
              </Grid>
            </Grid>
          </Toolbar>
        </AppBar>
        {loading ? (
          <CircularProgress />
        ) : rowsServices.length ? (
          <TableServices rows={rowsServices} />
        ) : (
          <Typography
            sx={{ my: 5, mx: 2, fontWeight: "Bold" }}
            color="#a10a0acf"
            align="center"
          >
            No hay servicios agregados
          </Typography>
        )}
      </Paper>
      {Object.keys(dataService).length ? (
        <ModalEditarServicio
          openModal={openModal}
          setOpenModal={setOpenModal}
          dataService={dataService}
          serviceId={serviceId}
          getServices={getServices}
          setDataService={setDataService}
        />
      ) : (
        <ModalNuevoServicio
          openModal={openModal}
          setOpenModal={setOpenModal}
          nameService={nameService}
          setNameService={setNameService}
          getServices={getServices}
        />
      )}
    </>
  );
};

export default Servicios;
