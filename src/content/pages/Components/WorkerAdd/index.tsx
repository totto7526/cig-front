import { Helmet } from 'react-helmet-async';
import PageTitle from 'src/components/PageTitle';
import { useState } from 'react';

import PageTitleWrapper from 'src/components/PageTitleWrapper';
import { Container, Grid, Card, CardHeader, CardContent, Divider } from '@mui/material';
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

const currencies = [
  {
    value: 'USD',
    label: '$',
  },
  {
    value: 'EUR',
    label: '€',
  },
  {
    value: 'BTC',
    label: '฿',
  },
  {
    value: 'JPY',
    label: '¥',
  },
];

function WorkerAdd() {

  const [currency, setCurrency] = useState('EUR');

  const handleChange = (event) => {
    setCurrency(event.target.value);
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
                      type="number"
                    />
                    <TextField
                      id="outlined-number"
                      label="Telefono"
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
                      required
                      id="outliend-required"
                      label="Barrio"
                      color='success'
                      defaultValue=" "
                    />
                    <TextField
                      required
                      id="outliend-required"
                      label="Ciudad"
                      color='success'
                      defaultValue=" "
                    />
                    <TextField
                      required
                      id="outliend-required"
                      label="Region"
                      color='success'
                      defaultValue=" "
                    />
                    <TextField
                      required
                      id="outliend-required"
                      label="Departamento"
                      color='success'
                      defaultValue=" "
                    />
                    <TextField
                      required
                      id="outliend-required"
                      label="Pais"
                      color='success'
                      defaultValue=" "
                    />
                    <TextField
                      required
                      id="outliend-required"
                      label="Username"
                      color='success'
                      defaultValue=" "
                    />                    
                    <TextField
                        id="outlined-password-input"
                        label="Password"
                        type="password"
                        color='success'
                        autoComplete="current-password"
                    />
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
