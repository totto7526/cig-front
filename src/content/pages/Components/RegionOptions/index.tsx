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


const listRegion= [
  {
    value: 1,
    label: 'Caribe',
  },
  {
    value: 2,
    label: 'Andina',
  },
  {
    value: 3,
    label: 'Pacifica',
  },
  {
    value: 4,
    label: 'Amazonia',
  },
];


function RegionOptions() {


  const [regionOptions, setregionOptions] = useState({
    region:'',
    newRegion:''
  })

  const[createRegion, setcreateRegion] = useState(false)

  const onChangeRegion = e => {
    setcreateRegion(
      !createRegion
    )
  };

  const onChangeFormulario = e => {
    setregionOptions({
      ...regionOptions,
      [e.target.name]: e.target.value
    })
  };

  const submitrouteOptions = (e) => {
    // Se enviaria el cliente al back
    console.log(regionOptions)

    // aqui estaria la respuesta del back
    console.log("Region seleccionado correctamente");
  }



  return (
    <>
      <Helmet>
        <title>Opciones de Region - Components</title>
      </Helmet>
      <PageTitleWrapper>
        <PageTitle
          textButton="Inicio"
          heading="Crear nueva ruta"
          subHeading="Proceso Region"
          docs="/dashboards/cards" />
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
              <CardHeader title="Seleccione una region o ingrese uno nuevo" />
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
                            checked={createRegion} 
                            onChange={onChangeRegion} 
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
                        label="Region"
                        name='region'
                        color='success'
                        value={regionOptions.region}
                        onChange={onChangeFormulario}
                        disabled = {createRegion}
                        helperText="Por favor seleccione una region"
                      >
                        {listRegion.map((option) => (
                          <MenuItem key={option.value} value={option.value}>
                            {option.label}
                          </MenuItem>
                        ))}
                      </TextField>
                          
                      <TextField
                        id="outlined-select"
                        required
                        label="Nueva Region"
                        name='newRegion'
                        color='success'
                        value={regionOptions.newRegion}
                        onChange={onChangeFormulario}
                        disabled = {!createRegion}
                        helperText="Por favor ingrese la nueva region"
                      />
                    <div>
                    <Button 
                        sx={{ margin: 5, width: '25ch'}} 
                        variant="contained"
                        href="/crearRuta/departamento"
                        >
                       
                          Atras
                          
                      </Button>
                      <Button 
                        sx={{ margin: 5, width: '25ch'}} 
                        variant="contained"
                        href="/crearRuta/city"
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

export default RegionOptions;
