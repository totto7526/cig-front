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

  const [currencyCiudad, setCurrencyCiudad] = useState(' ');
  const [currencyBarrio, setCurrencyBarrio] = useState(' ');
  const [currencyParentescoUno, setCurrencyParentescoUno] = useState(' ');
  const [currencyParentescoDos, setCurrencyParentescoDos] = useState(' ');

  const handleChangeCiudad = (event) => {
    setCurrencyCiudad(event.target.value);
  };

  const handleChangeBarrio = (event) => {
    setCurrencyBarrio(event.target.value);
  };

  const handleChangeParentescoUno = (event) => {
    setCurrencyParentescoUno(event.target.value);
  };

  const handleChangeParentescoDos = (event) => {
    setCurrencyParentescoDos(event.target.value);
  };

  const [value, setValue] = useState(30);

  const handleChange2 = (event, newValue) => {
    setValue(newValue);
  };


  return (
    <>
      <Helmet>
        <title>RegistroCliente - Components</title>
      </Helmet>
      <PageTitleWrapper>
        <PageTitle
          heading="registro cliente"
          subHeading="Proceso para registrar un cliente nuevo"
          docs="https://material-ui.com/components/text-fields/" />
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
              <Divider />
              <CardContent>
                <Box
                  component="form"
                  sx={{
                    '& .MuiTextField-root': { m: 6, width: '25ch' },
                  }}
                  noValidate
                  autoComplete="off"
                >
                  <div>
                    <TextField
                      required
                      id="outlined-required"
                      label="Primer Nombre"
                      color="success"
                      defaultValue=" "
                    />
                    <TextField
                      required
                      id="outlined-required"
                      label="Segundo Nombre"
                      color="success"
                      defaultValue=" "
                    />
                    <TextField
                      required
                      id="outliend-required"
                      label="Primer Apellido"
                      color='success'
                      defaultValue=" "
                    />
                     <TextField
                      required
                      id="outliend-required"
                      label="Segundo Apellido"
                      color='success'
                      defaultValue=" "
                    />
                     <TextField
                      id="outlined-number"
                      label="Numero Identificación"
                      type="number"
                    />
                    <TextField
                      id="outlined-number"
                      label="Telefono"
                      type="number"
                    />
                    <TextField
                      id="outlined-select-currency"
                      select
                      label="Ciudad"
                      value={currencyCiudad}
                      onChange={handleChangeCiudad}
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
                      value={currencyBarrio}
                      onChange={handleChangeBarrio}
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
                    />
                    <div>
                      <FormControl component="fieldset">
                        <FormLabel component="legend">Estado Cliente</FormLabel>
                          <RadioGroup row aria-label="Estado Cliente" name="row-radio-buttons-group" defaultValue={"Activo"}>
                            <FormControlLabel value="Activo" control={<Radio />} label="Activo" />
                            <FormControlLabel value="Inactivo" control={<Radio />} label="Inactivo" />
                            <FormControlLabel value="other" control={<Radio />} label="Other" />
                          </RadioGroup>
                        </FormControl>
                    </div>
                    <div>
                      <Button sx={{ margin: 1 }} variant="contained">GUARDAR</Button>
                    </div>
                  </div>
                </Box>
              </CardContent>
            </Card>
            <Grid item xs={12}>
            <Card>
              <CardHeader title="Datos referencias" />
              <Divider />
                <CardContent>
                  <Box
                    component="form"
                    sx={{
                      '& .MuiTextField-root': { m: 5, width: '25ch' },
                    }}
                    noValidate
                    autoComplete="off"
                  >
                  <div>
                    <TextField
                        required
                        id="outlined-required"
                        label="Nombre Completo"
                        color="success"
                        defaultValue=" "
                    />
                    <TextField
                        id="outlined-number-reference1"
                        label="Telefono"
                        type="number"
                      />
                    <TextField
                      id="outlined-select-currency"
                      select
                      label="parentesco"
                      value={currencyParentescoUno}
                      onChange={handleChangeParentescoUno}
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
                    />
                    <TextField
                      id="outlined-number"
                      label="Telefono"
                      type="number"
                    />
                    <TextField
                      id="outlined-select-currency"
                      select
                      label="parentesco"
                      value={currencyParentescoDos}
                      onChange={handleChangeParentescoDos}
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
        </Grid>
      </Container>
      <Footer />
    </>
  );
}

export default ClientAdd;
