import React from "react";
import { useNavigate } from "react-router-dom";
import useActivo from "../hooks/useActivo";
import { doc, deleteDoc } from "firebase/firestore";
import { db } from "../firebase/firebase";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import EditIcon from "@mui/icons-material/Edit";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import CircularProgress from "@mui/material/CircularProgress";

const TableAssets = ({ rows }) => {
  const { getAssets, loading, setHeaderNav, getAssetById } = useActivo();
  const navigate = useNavigate();

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: "#101F33",
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    "&:last-child td, &:last-child th": {
      border: 0,
    },
  }));

  const deleteAsset = async (id) => {
    try {
      await deleteDoc(doc(db, "assets", id));
      await getAssets();
    } catch (error) {
      console.log(error);
    }
  };

  const toEdit = async (id) => {
    await getAssetById(id);
    setHeaderNav(2);
    navigate("/editasset");
  };

  return loading ? (
    <CircularProgress />
  ) : (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell align="center">Imagen</StyledTableCell>
            <StyledTableCell align="center">Nombre</StyledTableCell>
            <StyledTableCell align="center">Servicio</StyledTableCell>
            <StyledTableCell align="center">Cantidad</StyledTableCell>
            <StyledTableCell align="center">Costo</StyledTableCell>
            <StyledTableCell align="center">Fecha</StyledTableCell>
            <StyledTableCell align="center">Acciones</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <StyledTableRow key={row.id}>
              <StyledTableCell component="th" scope="row" align="center">
                <img
                  style={{
                    width: "50px",
                    height: "50px",
                    borderRadius: "50%",
                    objectFit: "cover",
                  }}
                  src={row?.urlImg}
                  alt="activo"
                />
              </StyledTableCell>
              <StyledTableCell align="center">{row?.nameAsset}</StyledTableCell>
              <StyledTableCell align="center">
                {row?.typeService}
              </StyledTableCell>
              <StyledTableCell align="center">{row?.quantity}</StyledTableCell>
              <StyledTableCell align="center">
                ${row?.price * row?.quantity}
              </StyledTableCell>
              <StyledTableCell align="center">{row?.date}</StyledTableCell>
              <StyledTableCell align="center">
                <IconButton
                  aria-label="edit"
                  color="info"
                  onClick={() => toEdit(row.id)}
                >
                  <EditIcon />
                </IconButton>
                <IconButton
                  aria-label="delete"
                  color="error"
                  onClick={() => deleteAsset(row.id)}
                >
                  <DeleteIcon />
                </IconButton>
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TableAssets;
