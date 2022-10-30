import { Typography, Button, Grid } from '@mui/material';

import AddTwoToneIcon from '@mui/icons-material/AddTwoTone';

function PageHeader() {


  return (
    <Grid container justifyContent="space-between" alignItems="center">
      <Grid item>
        <Typography variant="h3" component="h3" gutterBottom>
          Editar Cliente
        </Typography>
        <Typography variant="subtitle2">
          Proceso para editar clientes
        </Typography>
      </Grid>
      <Grid item>
        <Button
          sx={{ mt: { xs: 2, md: 0 } }}
          variant="contained"
          startIcon={<AddTwoToneIcon fontSize="small" />}
          href="/clientes/gestion_clientes/agregar-clientes"
        >
          Crear cliente
        </Button>
      </Grid>
    </Grid>
  );
}

export default PageHeader;
