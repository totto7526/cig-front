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


const currenciesDistrict= [
  {
    value: 1,
    label: 'Centro',
  },
  {
    value: 2,
    label: 'Acacias',
  },
  {
    value: 3,
    label: 'Porvenir',
  },
  {
    value: 4,
    label: 'Salida Marinilla',
  },
];


function DistrictOptions() {


  const [districtOptions, setdistrictOptions] = useState({
    district:'',
    newDistrict:''
  })

  const[createDistrict, setcreateDistrict] = useState(false)

  const onChangeDistrict = e => {
    setcreateDistrict(
      !createDistrict
    )
  };

  const onChangeFormulario = e => {
    setdistrictOptions({
      ...districtOptions,
      [e.target.name]: e.target.value
    })
  };

  const submitcityOptions = (e) => {
    // Se enviaria el cliente al back
    console.log(districtOptions)

    // aqui estaria la respuesta del back
    console.log("Barrio seleccionado correctamente");
  }



  return (
    <>
      <Helmet>
        <title>Opciones de Barrio - Components</title>
      </Helmet>
      <PageTitleWrapper>
        <PageTitle
          textButton="Inicio"
          heading="Crear nueva ruta"
          subHeading="Proceso Barrio"
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
              <CardHeader title="Seleccione un barrio o ingrese uno nuevo" />
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
                            checked={createDistrict} 
                            onChange={onChangeDistrict} 
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
                        label="Barrio"
                        name='district'
                        color='success'
                        value={districtOptions.district}
                        onChange={onChangeFormulario}
                        disabled = {createDistrict}
                        helperText="Por favor seleccione un barrio"
                      >
                        {currenciesDistrict.map((option) => (
                          <MenuItem key={option.value} value={option.value}>
                            {option.label}
                          </MenuItem>
                        ))}
                      </TextField>
                          
                      <TextField
                        id="outlined-select-currency"
                        required
                        label="Nuevo Barrio "
                        name='newDistrict'
                        color='success'
                        value={districtOptions.newDistrict}
                        onChange={onChangeFormulario}
                        disabled = {!createDistrict}
                        helperText="Por favor ingrese el nuevo barrio"
                      />
                    <div>
                    <Button 
                        sx={{ margin: 5, width: '25ch'}} 
                        variant="contained"
                        href="/crearRuta/zone"
                        >
                       
                          Atras
                          
                      </Button>
                      <Button 
                        sx={{ margin: 5, width: '25ch'}} 
                        variant="contained"
                        href="/opcionesRuta/gestion_rutas/opciones-ruta"
                        >
                       
                          Guardar
                          
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

export default DistrictOptions;
