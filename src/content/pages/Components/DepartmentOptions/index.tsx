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


function DepartamentOptions() {


  const [departamentOptions, setdepartamentOptions] = useState({
    departament:'',
    newDepartament:''
  })

  const[createDepartament, setcreateDepartament] = useState(false)

  const onChangeDepartament = e => {
    setcreateDepartament(
      !createDepartament
    )
  };

  const onChangeFormulario = e => {
    setdepartamentOptions({
      ...departamentOptions,
      [e.target.name]: e.target.value
    })
  };

  const submitrouteOptions = (e) => {
    // Se enviaria el cliente al back
    console.log(departamentOptions)

    // aqui estaria la respuesta del back
    console.log("Departamento seleccionado correctamente");
  }



  return (
    <>
      <Helmet>
        <title>Opciones de Departamento - Components</title>
      </Helmet>
      <PageTitleWrapper>
        <PageTitle
          textButton="Inicio"
          heading="Crear nueva ruta"
          subHeading="Proceso Departamento"
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
                        value={departamentOptions.departament}
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
                        value={departamentOptions.newDepartament}
                        onChange={onChangeFormulario}
                        disabled = {!createDepartament}
                        helperText="Por favor ingrese el nuevo departamento"
                      />
                    <div>
                    <Button 
                        sx={{ margin: 5, width: '25ch'}} 
                        variant="contained"
                        href="/crearRuta/pais"
                        >
                       
                          Atras
                          
                      </Button>
                      <Button 
                        sx={{ margin: 5, width: '25ch'}} 
                        variant="contained"
                        href="/crearRuta/region"
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

export default DepartamentOptions;
