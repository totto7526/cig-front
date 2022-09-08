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


const listCountry= [
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


const listDepartament= [
  {
    value: 1,
    label: 'Antioquia',
  },
  {
    value: 2,
    label: 'Valle del Cauca',
  },
  {
    value: 3,
    label: 'Pasto',
  },
  {
    value: 4,
    label: 'Meta',
  },
];


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
const listDistrict= [
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


function CreateRuteOptions() {


  const [CreateRuteOptions, setCreateRuteOptions] = useState({
    country:'',
    newCountry:'',
    departament:'',
    newDepartament:'',
    region:'',
    newRegion:'',
    city:'',
    newCity:'',
    zone:'',
    newZone:'',
    district:'',
    newDistrict:''
  })

  const[createCountry, setcreateCountry] = useState(false)
  const[createDepartament, setcreateDepartament] = useState(false)
  const[createRegion, setcreateRegion] = useState(false)
  const[createCity, setcreateCity] = useState(false)
  const[createZone, setcreateZone] = useState(false)
  const[createDistrict, setcreateDistrict] = useState(false)

  const onChangeDistrict = e => {
    setcreateDistrict(
      !createDistrict
    )
  };

  const onChangeZone = e => {
    setcreateZone(
      !createZone
    )
  };

  const onChangeCountry = e => {
    setcreateCountry(
      !createCountry
    )
  };
  const onChangeDepartament = e => {
    setcreateDepartament(
      !createDepartament
    )
  };

  const onChangeRegion = e => {
    setcreateRegion(
      !createRegion
    )
  };

  const onChangeCity = e => {
    setcreateCity(
      !createCity
    )
  };

  const onChangeFormulario = e => {
    setCreateRuteOptions({
      ...CreateRuteOptions,
      [e.target.name]: e.target.value
    })
  };

  const submitCreateRouteOptions = (e) => {
    // Se enviaria el cliente al back
    console.log(CreateRuteOptions)

    // aqui estaria la respuesta del back
    console.log("Pais seleccionado correctamente");
  }


  

  


  return (
    <>
      <Helmet>
        <title>Opciones de Ruta Nueva - Components</title>
      </Helmet>
      <PageTitleWrapper>
        <PageTitle
          textButton="Inicio"
          heading="Crear nueva ruta"
          subHeading="Proceso Crear Ruta Nueva"
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
              <CardHeader title="Complete los datos necesarios para crear la nueva ruta" />
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
                    submitCreateRouteOptions
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
                        id="outlined-select"
                        select
                        label="Pais"
                        name='country'
                        color='success'
                        value={CreateRuteOptions.country}
                        onChange={onChangeFormulario}
                        disabled = {createCountry}
                        helperText="Por favor seleccione un pais"
                      >
                        {listCountry.map((option) => (
                          <MenuItem key={option.value} value={option.value}>
                            {option.label}
                          </MenuItem>
                        ))}
                      </TextField>
                          
                      <TextField
                        id="outlined-select"
                        required
                        label="Nuevo Pais"
                        name='newCountry'
                        color='success'
                        value={CreateRuteOptions.newCountry}
                        onChange={onChangeFormulario}
                        disabled = {!createCountry}
                        helperText="Por favor ingrese el nuevo pais"
                      />
                    <div>
                    <div>
                      <FormControlLabel
                        control={
                          // <Switch checked={state.gilad} onChange={handleChange} name="gilad" />
                          <Switch 
                            checked={createDepartament} 
                            onChange={onChangeDepartament} 
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
                        label="Departamento"
                        name='departament'
                        color='success'
                        value={CreateRuteOptions.departament}
                        onChange={onChangeFormulario}
                        disabled = {createDepartament}
                        helperText="Por favor seleccione un departamento"
                      >
                        {listDepartament.map((option) => (
                          <MenuItem key={option.value} value={option.value}>
                            {option.label}
                          </MenuItem>
                        ))}
                      </TextField>
                          
                      <TextField
                        id="outlined-select"
                        required
                        label="Nuevo Departamento"
                        name='newDepartament'
                        color='success'
                        value={CreateRuteOptions.newDepartament}
                        onChange={onChangeFormulario}
                        disabled = {!createDepartament}
                        helperText="Por favor ingrese el nuevo departamento"
                      />
                  </div>
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
                        value={CreateRuteOptions.region}
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
                        value={CreateRuteOptions.newRegion}
                        onChange={onChangeFormulario}
                        disabled = {!createRegion}
                        helperText="Por favor ingrese la nueva region"
                      />
                  </div>
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
                        value={CreateRuteOptions.city}
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
                        value={CreateRuteOptions.newCity}
                        onChange={onChangeFormulario}
                        disabled = {!createCity}
                        helperText="Por favor ingrese la nueva ciudad"
                      />
                    </div>
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
                        value={CreateRuteOptions.zone}
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
                        value={CreateRuteOptions.newZone}
                        onChange={onChangeFormulario}
                        disabled = {!createZone}
                        helperText="Por favor ingrese la nueva zona"
                      />
                    </div>
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
                        id="outlined-select"
                        select
                        label="Barrio"
                        name='district'
                        color='success'
                        value={CreateRuteOptions.district}
                        onChange={onChangeFormulario}
                        disabled = {createDistrict}
                        helperText="Por favor seleccione un barrio"
                      >
                        {listDistrict.map((option) => (
                          <MenuItem key={option.value} value={option.value}>
                            {option.label}
                          </MenuItem>
                        ))}
                      </TextField>
                          
                      <TextField
                        id="outlined-select"
                        required
                        label="Nuevo Barrio "
                        name='newDistrict'
                        color='success'
                        value={CreateRuteOptions.newDistrict}
                        onChange={onChangeFormulario}
                        disabled = {!createDistrict}
                        helperText="Por favor ingrese el nuevo barrio"
                      />
                    </div>
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
                        href="/opcionesRuta/gestion_rutas/opciones-ruta"
                        >
                       
                          Guardar Ruta
                          
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

export default CreateRuteOptions;
