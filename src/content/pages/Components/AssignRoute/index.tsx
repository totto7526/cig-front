import { Helmet } from 'react-helmet-async';
import PageTitle from 'src/components/PageTitle';
import { useState } from 'react';

import PageTitleWrapper from 'src/components/PageTitleWrapper';
import { Container, Grid, Card, CardHeader, CardContent, Divider, Button, InputAdornment } from '@mui/material';
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
import AccountCircle from '@mui/icons-material/AccountCircle';


const label = { inputProps: { 'aria-label': 'Switch demo' } };

const currenciesEmpleados = [
  {
    value: 1,
    label: 'Pepito Rodrigues',
  },
  {
    value: 2,
    label: 'Juana Maria',
  },
  {
    value:3,
    label:'   ',
  },
];
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

const currenciesZone= [
  {
    value: 1,
    label: '1',
  },
  {
    value: 2,
    label:'2',
  },
  {
    value:3,
    label:'3',
  },
];


function AssignRoute() {

  const [currencyCiudad, setCurrencyCiudad] = useState(' ');
  const [currencyEmpleados, setCurrencyEmpleados] = useState(' ');
  const [currencyZone, setCurrencyZone]= useState(' ');

  const handleChangeEmpleados= (event) => {
    setCurrencyEmpleados(event.target.value);
  };
  const handleChangeCiudad = (event) => {
    setCurrencyCiudad(event.target.value);
  };
  const handleChangeZone = (event) => {
    setCurrencyZone(event.target.value);
  }

  


  return (
    <>
      <Helmet>
        <title>AsiganrRuta - Components</title>
      </Helmet>
      <PageTitleWrapper>
        <PageTitle
          heading="Asignar ruta"
          subHeading="Proceso para asignar una ruta a un empleado"
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
              <CardHeader title="Complete los campos para asignar la ruta" />
              <Divider />
              <CardContent>
                <Box
                  component="form"
                  sx={{
                    '& .MuiTextField-root': { m:5, width: '35ch' },
                  }}
                  noValidate
                  autoComplete="off"
                >
                <div>
                  <TextField
                      id="outlined-select-currency"
                      select
                      label="Empleado"
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <AccountCircle />
                         </InputAdornment>
                        ),
                      }}
                      defaultValue=' '
                      value={currencyEmpleados}
                      onChange={handleChangeEmpleados}
                      helperText="Por favor seleccione un empleado"
                    >
                      {currenciesEmpleados.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.label}
                        </MenuItem>
                      ))}
                    </TextField>
                  </div>
                </Box>
                <Box
                  component="form"
                  sx={{
                    '& .MuiTextField-root': { m:5, width: '25ch' },
                  }}
                  noValidate
                  autoComplete="off"
                >  
                  <div>
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
                      label="Zona"
                      value={currencyZone}
                      onChange={handleChangeZone}
                      helperText="Por favor seleccione una zona"
                    >
                      {currenciesZone.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.label}
                        </MenuItem>
                      ))}
                    </TextField>
                    <div>
                      <Button sx={{ margin: 5, width: '25ch'}} variant="contained">Asignar</Button>
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

export default AssignRoute;
