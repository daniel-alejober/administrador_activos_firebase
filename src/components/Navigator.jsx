import { useNavigate } from "react-router-dom";
import useActivo from "../hooks/useActivo";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Box from "@mui/material/Box";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import HomeIcon from "@mui/icons-material/Home";
import PeopleIcon from "@mui/icons-material/People";
import LogoutIcon from "@mui/icons-material/Logout";
import DesignServicesIcon from "@mui/icons-material/DesignServices";
import InventoryIcon from "@mui/icons-material/Inventory";
import WorkHistoryIcon from "@mui/icons-material/WorkHistory";

const categories = [
  {
    id: "Build",
    children: [
      { id: "Servicios", icon: <DesignServicesIcon /> },
      { id: "Personal", icon: <PeopleIcon /> },
      { id: "Inventario", icon: <InventoryIcon /> },
      { id: "Trabajos", icon: <WorkHistoryIcon /> },
    ],
  },
  {
    id: "Opciones",
    children: [{ id: "Cerrar Sesión", icon: <LogoutIcon /> }],
  },
];

const item = {
  py: "2px",
  px: 3,
  color: "rgba(255, 255, 255, 0.7)",
  "&:hover, &:focus": {
    bgcolor: "rgba(255, 255, 255, 0.08)",
  },
};

const itemCategory = {
  boxShadow: "0 -1px 0 rgb(255,255,255,0.1) inset",
  py: 1.5,
  px: 3,
};

export default function Navigator(props) {
  const { setHeaderNav } = useActivo();
  const navigate = useNavigate();
  const { ...other } = props;

  const home = () => {
    setHeaderNav(0);
    navigate("/");
  };

  return (
    <Drawer variant="permanent" {...other}>
      <List disablePadding>
        <ListItem
          sx={{ ...item, ...itemCategory, fontSize: 22, color: "#fff" }}
        >
          Inventario
        </ListItem>
        <ListItem sx={{ ...item, ...itemCategory }} onClick={home}>
          <ListItemButton>
            <ListItemIcon>
              <HomeIcon />
            </ListItemIcon>
            <ListItemText>Home</ListItemText>
          </ListItemButton>
        </ListItem>
        {categories.map(({ id, children }) => (
          <Box key={id} sx={{ bgcolor: "#101F33" }}>
            <ListItem sx={{ py: 2, px: 3 }}>
              <ListItemText sx={{ color: "#fff" }}>{id}</ListItemText>
            </ListItem>
            {children.map(({ id: childId, icon, active }) => (
              <ListItem disablePadding key={childId}>
                <ListItemButton selected={active} sx={item}>
                  <ListItemIcon>{icon}</ListItemIcon>
                  <ListItemText>{childId}</ListItemText>
                </ListItemButton>
              </ListItem>
            ))}

            <Divider sx={{ mt: 2 }} />
          </Box>
        ))}
      </List>
    </Drawer>
  );
}
