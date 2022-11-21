import React from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import ImagenNuevoActivo from "../components/ImagenNuevoActivo";
import FormNuevoActivo from "../components/FormNuevoActivo";

const NuevoActivo = () => {
  return (
    <Box sx={{ width: "100%" }}>
      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        <Grid item xs={6}>
          <ImagenNuevoActivo />
        </Grid>
        <Grid item xs={6}>
          <FormNuevoActivo />
        </Grid>
      </Grid>
    </Box>
  );
};

export default NuevoActivo;
