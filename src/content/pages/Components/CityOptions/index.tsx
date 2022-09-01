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


const listCity= [
  {
    value: 1,
    label: 'Retiro',
  },
  {
    value: 2,
    label: 'Guarne',
  },
  {
    value: 3,
    label: 'Medellin',
  },
  {
    value: 4,
    label: 'Marinilla',
  },
  {
    value: 5,
    label: 'Santuario',
  },
];


function CityOptions() {


  const [cityOptions, setcityOptions] = useState({
    city:'',
    newCity:''
  })

  const[createCity, setcreateCity] = useState(false)

  const onChangeCity = e => {
    setcreateCity(
      !createCity
    )
  };

  const onChangeFormulario = e => {
    setcityOptions({
      ...cityOptions,
      [e.target.name]: e.target.value
    })
  };

  const submitcityOptions = (e) => {
    // Se enviaria el cliente al back
    console.log(cityOptions)

    // aqui estaria la respuesta del back
    console.log("Ciudad seleccionada correctamente");
  }



  return (
    <>
      <Helmet>
        <title>Opciones de Ciudad - Components</title>
      </Helmet>
      <PageTitleWrapper>
        <PageTitle
          textButton="Inicio"
          heading="Crear nueva ruta"
          subHeading="Proceso Ciudad"
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
              <CardHeader title="Seleccione una ciudad o ingrese uno nuevo" />
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
                    submitcityOptions
                  }
                > 
                 <div>
                      <FormControlLabel
                        control={
                          // <Switch checked={state.gilad} onChange={handleChange} name="gilad" />
                          <Switch 
                            checked={createCity} 
                            onChange={onChangeCity} 
                            name= "check"
                          />
                        }
                        label="Nuevo"
                      />
                  </div>
                  <div>
                      <TextField
                        id="outlined-select"
                        select
                        label="Ciudad"
                        name='city'
                        color='success'
                        value={cityOptions.city}
                        onChange={onChangeFormulario}
                        disabled = {createCity}
                        helperText="Por favor seleccione una ciudad"
                      >
                        {listCity.map((option) => (
                          <MenuItem key={option.value} value={option.value}>
                            {option.label}
                          </MenuItem>
                        ))}
                      </TextField>
                          
                      <TextField
                        id="outlined-select"
                        required
                        label="Nueva Ciudad"
                        name='newCity'
                        color='success'
                        value={cityOptions.newCity}
                        onChange={onChangeFormulario}
                        disabled = {!createCity}
                        helperText="Por favor ingrese la nueva ciudad"
                      />
                    <div>
                    <Button 
                        sx={{ margin: 5, width: '25ch'}} 
                        variant="contained"
                        href="/crearRuta/region"
                        >
                       
                          Atras
                          
                      </Button>
                      <Button 
                        sx={{ margin: 5, width: '25ch'}} 
                        variant="contained"
                        href="/crearRuta/zone"
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

export default CityOptions;
