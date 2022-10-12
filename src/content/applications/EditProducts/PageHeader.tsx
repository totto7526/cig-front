import { Typography, Button, Grid } from '@mui/material';

import AddTwoToneIcon from '@mui/icons-material/AddTwoTone';

function PageHeader() {

  const user =
  {
    name: '',
    avatar: ''
  };
  return (
    <Grid container justifyContent="space-between" alignItems="center">
      <Grid item>
        <Typography variant="h3" component="h3" gutterBottom>
          Editar Producto
        </Typography>
        <Typography variant="subtitle2">
          {user.name}Proceso para editar un producto o eliminarlo
        </Typography>
      </Grid>
      <Grid item>
        <Button
          sx={{ mt: { xs: 2, md: 0 } }}
          variant="contained"
          startIcon={<AddTwoToneIcon fontSize="small" />}
          href="/productos/gestion_productos/agregar-productos"
        >
          Crear producto
        </Button>
      </Grid>
    </Grid>
  );
}

export default PageHeader;
