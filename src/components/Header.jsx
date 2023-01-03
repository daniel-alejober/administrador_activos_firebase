import useActivo from "../hooks/useActivo";
import AppBar from "@mui/material/AppBar";
import Avatar from "@mui/material/Avatar";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

function Header() {
  const { headerNav } = useActivo();

  return (
    <>
      <AppBar color="primary" position="sticky" elevation={0}>
        <Toolbar>
          <Grid container spacing={1} alignItems="center">
            <Grid item xs />
            <Grid item>
              <IconButton color="inherit" sx={{ p: 0.5 }}>
                <Avatar
                  src="https://firebasestorage.googleapis.com/v0/b/administrador-activos.appspot.com/o/WhatsApp%20Image%202023-01-02%20at%209.38.12%20PM.jpeg?alt=media&token=db52e559-cc3c-452e-982d-f08b32281f41"
                  alt="My Avatar"
                />
              </IconButton>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
      <AppBar
        component="div"
        color="primary"
        position="static"
        elevation={0}
        sx={{ zIndex: 0 }}
      >
        <Toolbar>
          <Grid container alignItems="center" spacing={1}>
            <Grid item xs>
              <Typography color="inherit" variant="h5" component="h1">
                DashBoard
              </Typography>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
      <AppBar
        component="div"
        position="static"
        elevation={0}
        sx={{ zIndex: 0 }}
      >
        <Tabs value={headerNav} textColor="inherit">
          <Tab label="Inventario" />
          <Tab label="Nuevo Ticket" />
          <Tab label="Actualizar Ticket" />
        </Tabs>
      </AppBar>
    </>
  );
}

export default Header;
