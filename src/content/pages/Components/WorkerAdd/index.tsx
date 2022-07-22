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

function WorkerAdd() {

  const [currencyBarrio, setCurrencyBarrio] = useState(' ');

  const handleChangeBarrio= (event) => {
    setCurrencyBarrio(event.target.value);
  };

  const [value, setValue] = useState(30);

  const handleChange2 = (event, newValue) => {
    setValue(newValue);
  };


  return (
    <>
      <Helmet>
        <title>RegistroEmpleado - Components</title>
      </Helmet>
      <PageTitleWrapper>
        <PageTitle
          heading="registro empleado"
          subHeading="Proceso para registrar un empleado nuevo"
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
                      color='success'
                      type="number"
                    />
                    <TextField
                      id="outlined-number"
                      label="Telefono"
                      color='success'
                      type="number"
                    />
                    <TextField
                      required
                      id="outliend-required"
                      label="Dirección"
                      color='success'
                      defaultValue=" "
                    />
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
                    <div>
                      <FormControl component="fieldset">
                        <FormLabel component="legend">Estado Empleado</FormLabel>
                          <RadioGroup row aria-label="Estado Empleado" name="row-radio-buttons-group"defaultValue={"Activo"}>
                            <FormControlLabel value="Activo" control={<Radio />} label="Activo" />
                            <FormControlLabel value="Inactivo" control={<Radio />} label="Inactivo" />
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
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </>
  );
}

export default WorkerAdd;
