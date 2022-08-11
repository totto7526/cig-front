import { Helmet } from 'react-helmet-async';
import PageTitle from 'src/components/PageTitle';
import { useState } from 'react';

import PageTitleWrapper from 'src/components/PageTitleWrapper';
import { Container, Grid, Card, CardHeader, CardContent, Divider, Button } from '@mui/material';
import Footer from 'src/components/Footer';

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import { pink } from '@mui/material/colors';
import Checkbox from '@mui/material/Checkbox';

import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

import Stack from '@mui/material/Stack';
import Slider from '@mui/material/Slider';
import VolumeDown from '@mui/icons-material/VolumeDown';
import VolumeUp from '@mui/icons-material/VolumeUp';

import Switch from '@mui/material/Switch';

const label = { inputProps: { 'aria-label': 'Switch demo' } };

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

const currenciesBarrio = [
  {
    value: 1,
    label: 'manrique',
  },
  {
    value: 2,
    label: 'porvenir',
  },
  {
    value: 3,
    label: 'diamante',
  },
  {
    value: 4,
    label: 'plan60',
  },
];

const currenciesParentesco = [
  {
    value: 1,
    label: 'Mama',
  },
  {
    value: 2,
    label: 'Papa',
  },
  {
    value: 3,
    label: 'herman@',
  },
  {
    value: 4,
    label: 'Ti@',
  },
  {
    value: 5,
    label:'Prim@'
  },
  {
    value:6,
    label: 'Sobrin@'
  },
  {
    value:7,
    label: 'Amig@'
  },
];

function ClientAdd() {
  // const [value, setValue] = useState(30);


  const [cliente, setCliente] = useState({
    primerNombre: '',
    segundoNombre: '',
    primerApellido: '',
    segundoApellido: '',
    numeroIdentificacion: '',
    telefono: '',
    ciudad: '',
    barrio: '',
    cupo: '',
    estado:''
  })

  const onChangeFormulario = e => {
    setCliente({
      ...cliente,
      [e.target.name]: e.target.value
    })
  }


  const submitCrearCliente = (e) => {
    // Se enviaria el cliente al back
    console.log(cliente)
    console.log(referencia)

    // aqui estaria la respuesta del back
    console.log("Se ha creado el cliente exitosamente");
    console.log("Referencia creada con exito");
  }

const [referencia, setReferencia] = useState({
  nombreCompleto: '',
  telefono:'',
  parentesco:'',
  nombreCompletoS:' ',
  telefonoS:' ',
  parentescoS:' '
})

const onChangeFormularioReferencia = e => {
  setReferencia({
    ...referencia,
    [e.target.name]: e.target.value
  })
}




  
  
  return (
    <>
      <Helmet>
        <title>RegistroCliente - Components</title>
      </Helmet>
      <PageTitleWrapper>
        <PageTitle
          textButton="Inicio"
          heading="Registro cliente"
          subHeading="Proceso para registrar un cliente nuevo"
          docs='/overview'/>
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
              <CardHeader title="Datos Personales" />
              <Divider/>
              <CardContent>
                <Box
                  component="form"
                  sx={{
                    '& .MuiTextField-root': { m: 6, width: '25ch' },
                  }}
                  noValidate
                  autoComplete="off"
                  onClick={
                    submitCrearCliente
                  }
                >
                  <div>
                    <TextField
                      required
                      id="outlined-required"
                      label='Primer nombre'
                      color="success"
                      defaultValue=" "
                      name='primerNombre'
                      value={cliente.primerNombre}
                      onChange={onChangeFormulario}
                    />
                    <TextField
                      required
                      id="outlined-required"
                      label="Segundo Nombre"
                      color="success"
                      defaultValue=" "
                      name='segundoNombre'
                      value={cliente.segundoNombre}
                      onChange={onChangeFormulario}
                    />
                    <TextField
                      required
                      id="outliend-required"
                      label="Primer Apellido"
                      color='success'
                      defaultValue=" "
                      name='primerApellido'
                      value={cliente.primerApellido}
                      onChange={onChangeFormulario}
                    />
                     <TextField
                      required
                      id="outliend-required"
                      label="Segundo Apellido"
                      color='success'
                      defaultValue=" "
                      name='segundoApellido'
                      value={cliente.segundoApellido}
                      onChange={onChangeFormulario}
                    />
                     <TextField
                      id="outlined-number"
                      label="Numero Identificación"
                      color='success'
                      type="number"
                      name='numeroIdentificacion'
                      value={cliente.numeroIdentificacion}
                      onChange={onChangeFormulario}
                    />
                    <TextField
                      id="outlined-number"
                      label="Telefono"
                      type="number"
                      color='success'
                      name='telefono'
                      value={cliente.telefono}
                      onChange={onChangeFormulario}
                    />
                    <TextField
                      id="outlined-select-currency"
                      select
                      label="Ciudad"
                      color='success'
                      value={cliente.ciudad}
                      name='ciudad'
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
                      label="Barrio"
                      color='success'
                      value={cliente.barrio}
                      name='barrio'
                      onChange={onChangeFormulario}
                      helperText="Por favor seleccione un barrio"
                    >
                      {currenciesBarrio.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.label}
                        </MenuItem>
                      ))}
                    </TextField>
                    <TextField
                      required
                      id="outliend-number"
                      label="Cupo"
                      color='success'
                      defaultValue="150000"
                      name='cupo'
                      value={cliente.cupo}
                      onChange={onChangeFormulario}
                    />
                    <div>
                      <FormControl component="fieldset">
                        <FormLabel component="legend">Estado Cliente</FormLabel>
                          <RadioGroup
                            row aria-label="Estado Cliente"
                            name="estado"
                            value={cliente.estado}
                            onChange={onChangeFormulario}
                            >
                            <FormControlLabel value="Activo" control={<Radio />} label="Activo" />
                            <FormControlLabel value="Inactivo" control={<Radio />} label="Inactivo" />
                          </RadioGroup>
                        </FormControl>
                    </div>
                    <div>
                      <Button sx={{ margin: 1 }} variant="contained">GUARDAR</Button>
                    </div>
                  </div>
              <CardHeader title="Datos referencias" />
                <Divider />
                  <div>
                    <TextField
                        required
                        id="outlined-required"
                        label="Nombre Completo"
                        color="success"
                        name="nombreCompleto"
                        defaultValue=" "
                        value={referencia.nombreCompleto}
                        onChange={onChangeFormularioReferencia}
                    />
                    <TextField
                        id="outlined-number-reference1"
                        label="Telefono"
                        type="number"
                        color="success"
                        name="telefono"
                        defaultValue =" "
                        value={referencia.telefono}
                        onChange={onChangeFormularioReferencia}
                      />
                    <TextField
                      id="outlined-select-currency"
                      select
                      label="parentesco"
                      color='success'
                      name="parentesco"
                      value={referencia.parentesco}
                      onChange={onChangeFormularioReferencia}
                      helperText="Por favor seleccione un parentesco">
                      {currenciesParentesco.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.label}
                        </MenuItem>
                      ))}
                    </TextField>

                    <TextField
                      required
                      id="outlined-required"
                      label="Nombre Completo"
                      color="success"
                      defaultValue=" "
                      name='nombreCompletoS'
                      value={referencia.nombreCompletoS}
                      onChange={onChangeFormularioReferencia}
                    />
                    <TextField
                      id="outlined-number"
                      label="Telefono"
                      type="number"
                      color='success'
                      name='telefonoS'
                      value={referencia.telefonoS}
                      onChange={onChangeFormularioReferencia}
                    />
                    <TextField
                      id="outlined-select-currency"
                      select
                      label="parentesco"
                      color='success'
                      name='parentescoS'
                      value={referencia.parentescoS}
                      onChange={onChangeFormularioReferencia}
                      helperText="Por favor seleccione un parentesco">
                      {currenciesParentesco.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.label}
                        </MenuItem>
                      ))}
                    </TextField>
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

export default ClientAdd;
