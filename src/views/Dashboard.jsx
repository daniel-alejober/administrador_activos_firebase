import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
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
import TableAssets from "../components/TableAssets";
import CircularProgress from "@mui/material/CircularProgress";
import { filterByTerm } from "../hooks/filterByTerm";

export default function Dashboard() {
  const navigate = useNavigate();

  const { setHeaderNav, rows, loading, getAssets, setRows } = useActivo();
  const [solicitante, setSolicitante] = useState("");

  useEffect(() => {
    getAssets();
  }, []);

  const toNewAsset = () => {
    setHeaderNav(1);
    navigate("/newticket");
  };

  const buscar = (e) => {
    if (e.key === "Enter") {
      setRows(filterByTerm(solicitante, rows));
      setSolicitante("");
    }
  };

  return (
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
                placeholder="Buscar por solicitante"
                InputProps={{
                  disableUnderline: true,
                  sx: { fontSize: "default" },
                }}
                variant="standard"
                onKeyDown={buscar}
                value={solicitante}
                onChange={(e) => setSolicitante(e.target.value)}
              />
            </Grid>
            <Grid item>
              <Tooltip title="Reload" onClick={getAssets}>
                <IconButton>
                  <RefreshIcon color="inherit" sx={{ display: "block" }} />
                </IconButton>
              </Tooltip>
              <Button variant="contained" sx={{ mr: 1 }} onClick={toNewAsset}>
                Nuevo Activo
              </Button>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
      {loading ? (
        <CircularProgress />
      ) : rows.length ? (
        <TableAssets rows={rows} />
      ) : (
        <Typography
          sx={{ my: 5, mx: 2, fontWeight: "Bold" }}
          color="#a10a0acf"
          align="center"
        >
          No hay activos agregados
        </Typography>
      )}
    </Paper>
  );
}
