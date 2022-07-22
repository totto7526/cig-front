import { Typography, Button, Grid } from '@mui/material';

import AddTwoToneIcon from '@mui/icons-material/AddTwoTone';

function PageHeader() {

  const user =
  {
    name: 'Jose Luis Castro',
    avatar: '/static/images/avatars/3.jpg'
  };
  return (
    <Grid container justifyContent="space-between" alignItems="center">
      <Grid item>
        <Typography variant="h3" component="h3" gutterBottom>
          Despachar Productos
        </Typography>
        <Typography variant="subtitle2">
          {user.name}, Aca podras despacharle los productos a un empleado
        </Typography>
      </Grid>
      <Grid item>
        <Button
          sx={{ mt: { xs: 2, md: 0 } }}
          variant="contained"
          startIcon={<AddTwoToneIcon fontSize="small" />}
          //LINKEAR LA DIRECCION HASTA CREAR CLIENTE
        >
          Despachar Productos
        </Button>
      </Grid>
    </Grid>
  );
}

export default PageHeader;