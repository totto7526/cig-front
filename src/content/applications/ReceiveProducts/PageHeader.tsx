import { Typography, Button, Grid } from '@mui/material';

import AddTwoToneIcon from '@mui/icons-material/AddTwoTone';

function PageHeader() {

  const user =
  {
    name:'',
    avatar:''
  };
  return (
    <Grid container justifyContent="space-between" alignItems="center">
      <Grid item>
        <Typography variant="h3" component="h3" gutterBottom>
          Recibir Productos
        </Typography>
        <Typography variant="subtitle2">
          {user.name}Recibir los productos a un empleado
        </Typography>
      </Grid>
      <Grid item>
        <Button
          sx={{ mt: { xs: 2, md: 0 } }}
          variant="contained"
          startIcon={<AddTwoToneIcon fontSize="small" />}
          href = '/seguimientoEmpleado/gestion_seguimiento/despachar-productos'
        >
          Despachar Productos
        </Button>
      </Grid>
    </Grid>
  );
}

export default PageHeader;
