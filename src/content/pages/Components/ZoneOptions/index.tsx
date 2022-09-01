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


const listZone= [
  {
    value: 1,
    label: 'UNO',
  },
  {
    value: 2,
    label: 'DOS',
  },
  {
    value: 3,
    label: 'TRES',
  },
  {
    value: 4,
    label: 'CUATRO',
  },
];


function ZoneOptions() {


  const [zoneOptions, setzoneOptions] = useState({
    zone:'',
    newZone:''
  })

  const[createZone, setcreateZone] = useState(false)

  const onChangeZone = e => {
    setcreateZone(
      !createZone
    )
  };

  const onChangeFormulario = e => {
    setzoneOptions({
      ...zoneOptions,
      [e.target.name]: e.target.value
    })
  };

  const submitcityOptions = (e) => {
    // Se enviaria el cliente al back
    console.log(zoneOptions)

    // aqui estaria la respuesta del back
    console.log("Zona seleccionada correctamente");
  }



  return (
    <>
      <Helmet>
        <title>Opciones de Zona - Components</title>
      </Helmet>
      <PageTitleWrapper>
        <PageTitle
          textButton="Inicio"
          heading="Crear nueva ruta"
          subHeading="Proceso Zona"
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
              <CardHeader title="Seleccione una zona o ingrese uno nueva" />
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
                            checked={createZone} 
                            onChange={onChangeZone} 
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
                        label="Zona"
                        name='zone'
                        color='success'
                        value={zoneOptions.zone}
                        onChange={onChangeFormulario}
                        disabled = {createZone}
                        helperText="Por favor seleccione una zona"
                      >
                        {listZone.map((option) => (
                          <MenuItem key={option.value} value={option.value}>
                            {option.label}
                          </MenuItem>
                        ))}
                      </TextField>
                          
                      <TextField
                        id="outlined-select"
                        required
                        label="Nueva Zona"
                        name='newZone'
                        color='success'
                        value={zoneOptions.newZone}
                        onChange={onChangeFormulario}
                        disabled = {!createZone}
                        helperText="Por favor ingrese la nueva zona"
                      />
                    <div>
                    <Button 
                        sx={{ margin: 5, width: '25ch'}} 
                        variant="contained"
                        href="/crearRuta/city"
                        >
                       
                          Atras
                          
                      </Button>
                      <Button 
                        sx={{ margin: 5, width: '25ch'}} 
                        variant="contained"
                        href="/crearRuta/district"
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

export default ZoneOptions;
