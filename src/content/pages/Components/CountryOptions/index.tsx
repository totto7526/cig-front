import { Helmet } from 'react-helmet-async';
import PageTitle from 'src/components/PageTitle';
import { useState } from 'react';

import PageTitleWrapper from 'src/components/PageTitleWrapper';
import { Container, Grid, Card, CardHeader, CardContent, Divider, Button} from '@mui/material';
import Footer from 'src/components/Footer';

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';


import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import { create } from '@mui/material/styles/createTransitions';


const currenciesCountry= [
  {
    value: 1,
    label: 'Colombia',
  },
  {
    value: 2,
    label: 'Argentina',
  },
  {
    value: 3,
    label: 'Brazil',
  },
  {
    value: 4,
    label: 'Venezuela',
  },
];


function CountryOptions() {


  const [countryOptions, setcountryOptions] = useState({
    country:'',
    newCountry:''
  })

  const[createCountry, setcreateCountry] = useState(false)

  const onChangeCountry = e => {
    setcreateCountry(
      !createCountry
    )
  };

  const onChangeFormulario = e => {
    setcountryOptions({
      ...countryOptions,
      [e.target.name]: e.target.value
    })
  };

  const submitrouteOptions = (e) => {
    // Se enviaria el cliente al back
    console.log(countryOptions)

    // aqui estaria la respuesta del back
    console.log("Pais seleccionado correctamente");
  }


  

  


  return (
    <>
      <Helmet>
        <title>Opciones de Pais - Components</title>
      </Helmet>
      <PageTitleWrapper>
        <PageTitle
          textButton="Inicio"
          heading="Crear nueva ruta"
          subHeading="Proceso Pais"
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
              <CardHeader title="Seleccione un pais o ingrese uno nuevo" />
              <Divider />
              <CardContent>
                <Box
                  component="form"
                  sx={{
                    '& .MuiTextField-root': { m:5, ml:10, width: '35ch' },
                  }}
                  noValidate
                  autoComplete="off"
                  onClick={
                    submitrouteOptions
                  }
                > 
                 <div>
                      <FormControlLabel
                        control={
                          // <Switch checked={state.gilad} onChange={handleChange} name="gilad" />
                          <Switch 
                            checked={createCountry} 
                            onChange={onChangeCountry} 
                            name= "check"
                          />
                        }
                        label="Nuevo"
                      />
                  </div>
                  <div>
                      <TextField
                        id="outlined-select-currency"
                        select
                        label="Pais"
                        name='country'
                        color='success'
                        value={countryOptions.country}
                        onChange={onChangeFormulario}
                        disabled = {createCountry}
                        helperText="Por favor seleccione un pais"
                      >
                        {currenciesCountry.map((option) => (
                          <MenuItem key={option.value} value={option.value}>
                            {option.label}
                          </MenuItem>
                        ))}
                      </TextField>
                          
                      <TextField
                        id="outlined-select-currency"
                        required
                        label="Nuevo Pais"
                        name='newCountry'
                        color='success'
                        value={countryOptions.newCountry}
                        onChange={onChangeFormulario}
                        disabled = {!createCountry}
                        helperText="Por favor ingrese el nuevo pais"
                      />
                    <div>
                    <Button 
                        sx={{ margin: 5, width: '25ch'}} 
                        variant="contained"
                        href="/opcionesRuta/gestion_rutas/opciones-ruta"
                        >
                       
                          Atras
                          
                      </Button>
                      <Button 
                        sx={{ margin: 5, width: '25ch'}} 
                        variant="contained"
                        href="/crearRuta/departamento"
                        >
                       
                          Siguiente
                          
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

export default CountryOptions;
