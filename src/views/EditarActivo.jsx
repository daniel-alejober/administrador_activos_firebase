import React from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import ImagenEditActivo from "../components/ImagenEditActivo";
import FormEditActivo from "../components/FormEditActivo";

const EditarActivo = () => {
  return (
    <Box sx={{ width: "100%" }}>
      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        <Grid item xs={6}>
          <ImagenEditActivo />
        </Grid>
        <Grid item xs={6}>
          <FormEditActivo />
        </Grid>
      </Grid>
    </Box>
  );
};

export default EditarActivo;
