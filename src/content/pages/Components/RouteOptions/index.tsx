import { Helmet } from 'react-helmet-async';
import PageTitle from 'src/components/PageTitle';
import { useState } from 'react';

import PageTitleWrapper from 'src/components/PageTitleWrapper';
import { Container, Grid, Card, CardHeader, CardContent, Divider, Button, InputAdornment } from '@mui/material';
import Footer from 'src/components/Footer';

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';


const currenciesCiudad= [
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

const currenciesZone= [
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


function RouteOptions() {


  const [routeOptions, setrouteOptions] = useState({
    ciudad:'',
    zona:''
  })

  
  const onChangeFormulario = e => {
    setrouteOptions({
      ...routeOptions,
      [e.target.name]: e.target.value
    })
  }

  const submitrouteOptions = (e) => {
    // Se enviaria el cliente al back
    console.log(routeOptions)

    // aqui estaria la respuesta del back
    console.log("Preciono alguno de los dos botones");
  }

  


  return (
    <>
      <Helmet>
        <title>Opciones de Ruta - Components</title>
      </Helmet>
      <PageTitleWrapper>
        <PageTitle
          textButton="Inicio"
          heading="Opciones de Ruta"
          subHeading="Proceso Opciones de Ruta"
          docs="/overview" />
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
              <CardHeader title="Seleccione la ruta a editar y cree una nueva" />
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
                    submitrouteOptions
                  }
                > 
                  <div>
                    <TextField
                      id="outlined-select-currency"
                      select
                      label="Ciudad"
                      name='ciudad'
                      value={routeOptions.ciudad}
                      onChange={onChangeFormulario}
                      helperText="Por favor seleccione una ciudad"
                    >
                      {currenciesCiudad.map((option) => (
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
                      value={routeOptions.zona}
                      onChange={onChangeFormulario}
                      helperText="Por favor seleccione una zona"
                    >
                      {currenciesZone.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.label}
                        </MenuItem>
                      ))}
                    </TextField>
                    <div>
                      <Button 
                        sx={{ margin: 5, width: '25ch'}} 
                        variant="contained"
                        href='/crearRuta/pais'>
                        
                          Agregar Ruta
                      </Button>
                      <Button 
                        sx={{ margin: 5, width: '25ch'}} 
                        variant="contained" 
                        href = '/opcionesRuta/gestion_rutas/editar-ruta'>
                        
                        Editar Ruta
                      </Button>
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

export default RouteOptions;
