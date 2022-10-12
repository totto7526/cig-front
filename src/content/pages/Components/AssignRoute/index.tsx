import { Helmet } from 'react-helmet-async';
import PageTitle from 'src/components/PageTitle';
import { useState } from 'react';

import PageTitleWrapper from 'src/components/PageTitleWrapper';
import { Container, Grid, Card, CardHeader, CardContent, Divider, Button, InputAdornment } from '@mui/material';
import Footer from 'src/components/Footer';

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';



import AccountCircle from '@mui/icons-material/AccountCircle';


const label = { inputProps: { 'aria-label': 'Switch demo' } };

const listEmpleados = [
  {
    value: 1,
    label: 'Pepito Rodrigues',
  },
  {
    value: 2,
    label: 'Juana Maria',
  },
  {
    value: 2,
    label: 'Roberto carlos',
  },
  {
    value:3,
    label:'   ',
  },
];
const listCiudad= [
  {
    value: 1,
    label: 'Rionegro',
  },
  {
    value: 2,
    label: 'Marinilla',
  },
  {
    value: 3,
    label: 'Medellin',
  },
  {
    value: 4,
    label: 'Santuario',
  },
];

const listZone= [
  {
    value: 1,
    label: '1',
  },
  {
    value: 2,
    label:'2',
  },
  {
    value:3,
    label:'3',
  },
];


function AssignRoute() {


  const [asignarRuta, setAsignarRuta] = useState({
    empleado:'',
    ciudad:'',
    zona:''
  })

  
  const onChangeFormulario = e => {
    setAsignarRuta({
      ...asignarRuta,
      [e.target.name]: e.target.value
    })
  }

  const submitAsignarRuta = (e) => {
    // Se enviaria el cliente al back
    console.log(asignarRuta)

    // aqui estaria la respuesta del back
    console.log("Se ha asignado la ruta exitosamente");
  }



  


  return (
    <>
      <Helmet>
        <title>AsiganrRuta - Components</title>
      </Helmet>
      <PageTitleWrapper>
        <PageTitle
          heading="Asignar ruta"
          subHeading="Proceso para asignar una ruta" />
      </PageTitleWrapper>
      <Container maxWidth="lg">
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="stretch"
          spacing={3}
        >
          <Grid item xs={12}>
            <Card>
              <CardHeader title="Complete los campos para asignar la ruta" />
              <Divider />
              <CardContent>
                <Box
                  component="form"
                  sx={{
                    '& .MuiTextField-root': { m:5, width: '35ch' },
                  }}
                  noValidate
                  autoComplete="off"
                  onClick={
                    submitAsignarRuta
                  }
                >
                <div>
                  <TextField
                      id="outlined-select-currency"
                      select
                      label="Empleado"
                      name='empleado'
                      color='success'
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <AccountCircle />
                         </InputAdornment>
                        ),
                      }}
                      defaultValue=' '
                      value={asignarRuta.empleado}
                      onChange={onChangeFormulario}
                      helperText="Por favor seleccione un empleado"
                    >
                      {listEmpleados.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.label}
                        </MenuItem>
                      ))}
                    </TextField>
                  </div> 
                  <div>
                    <TextField
                      id="outlined-select-currency"
                      select
                      label="Ciudad"
                      name='ciudad'
                      value={asignarRuta.ciudad}
                      onChange={onChangeFormulario}
                      helperText="Por favor seleccione una ciudad"
                    >
                      {listCiudad.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.label}
                        </MenuItem>
                      ))}
                    </TextField>
                        
                    <TextField
                      id="outlined-select-currency"
                      select
                      label="Zona"
                      name='zona'
                      value={asignarRuta.zona}
                      onChange={onChangeFormulario}
                      helperText="Por favor seleccione una zona"
                    >
                      {listZone.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.label}
                        </MenuItem>
                      ))}
                    </TextField>
                    <div>
                      <Button sx={{ margin: 5, width: '25ch'}} variant="contained">Asignar</Button>
                    </div>
                  </div>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </>
  );
}

export default AssignRoute;
