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

const currenciesProductos = [
  {
    value: 1,
    label: 'tendidos',
  },
  {
    value: 2,
    label: 'cortinas',
  },
  {
    value: 3,
    label: 'sabanas',
  },
  {
    value: 4,
    label: 'tohallones',
  },
];


function ProductAdd() {

  const [currencyProductos, setCurrencyProductos] = useState(' ');

  const handleChangeProductos= (event) => {
    setCurrencyProductos(event.target.value);
  };

  const [value, setValue] = useState(30);

  const handleChange2 = (event, newValue) => {
    setValue(newValue);
  };


  return (
    <>
      <Helmet>
        <title>RegistroProductos - Components</title>
      </Helmet>
      <PageTitleWrapper>
        <PageTitle
          heading="registro producto"
          subHeading="Proceso para registrar un producto nuevo"
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
              <CardHeader title="Datos Producto" />
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
                      label="Nombre Producto"
                      color="success"
                      defaultValue=" "
                    />
                    <TextField
                      required
                      id="outlined-required"
                      label="Referencia Producto"
                      color="success"
                      defaultValue=" "
                    />
                    <TextField
                      required
                      id="outliend-required"
                      label="Descripción"
                      color='success'
                      defaultValue=" "
                    />
                     <TextField
                      required
                      id="outliend-number"
                      label="Largo"
                      color='success'
                      type="number"
                    />
                     <TextField
                      required
                      id="outliend-number"
                      label="Ancho"
                      color='success'
                      type="number"
                    />
                     
                     
                    <TextField
                      id="outlined-select-currency"
                      select
                      label="Categoria"
                      value={currencyProductos}
                      onChange={handleChangeProductos}
                      helperText="Por favor seleccione una categoria"
                    >
                      {currenciesProductos.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.label}
                        </MenuItem>
                      ))}
                    </TextField>
                    <div>
                      <FormControl component="fieldset">
                        <FormLabel component="legend">Estado Producto</FormLabel>
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

export default ProductAdd;
