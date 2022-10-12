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
          Despachar Productos
        </Typography>
        <Typography variant="subtitle2">
          {user.name} Entrega de productos a un empleado
        </Typography>
      </Grid>
    </Grid>
  );
}

export default PageHeader;
