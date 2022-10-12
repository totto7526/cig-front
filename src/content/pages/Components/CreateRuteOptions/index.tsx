import { Helmet } from 'react-helmet-async';
import PageTitle from 'src/components/PageTitle';
import { useState, useEffect} from 'react';

import PageTitleWrapper from 'src/components/PageTitleWrapper';
import { Container, Grid, Card, CardHeader, CardContent, Divider, Button} from '@mui/material';
import Footer from 'src/components/Footer';

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';


import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import clienteAxios from  'src/config/axios';
import Swal from 'sweetalert2';

import { useAuth0 } from '@auth0/auth0-react';


function CreateRuteOptions() {

  const { user, isAuthenticated, getAccessTokenSilently } = useAuth0();

  const [country, setCountry] = useState([ ])

  const [departament, setDepartament] = useState([ ])
  const [region, setRegion] = useState([ ])
  const [city, setCity] = useState([])

  useEffect(() => {
    (async () => {
      try {
        const token = await getAccessTokenSilently({
          audience: "htttps://cig/api",
          scope: "read:cig-vendedor read:cig-cobrador",
        });
        const response = await clienteAxios.get("/api/v1/rutas/paises", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setCountry(response.data);
      } catch (e) {
        console.error(e);
      }
    })();
  }, []);

  const [CreateRuteOptions, setCreateRuteOptions] = useState({
    idPais:0,
    nombrePais:'',
    idDepartamento:0,
    nombreDepartamento:'',
    idRegion:0,
    nombreRegion:'',
    idCiudad:0,
    nombreCiudad:'',
    nombreZona:'',
  })

  useEffect(() => {
    (async () => {
      try {
        const token = await getAccessTokenSilently({
          audience: "htttps://cig/api",
          scope: "read:cig-vendedor read:cig-cobrador",
        });

        if (CreateRuteOptions.idPais != 0) {
          const response = await clienteAxios.get(
            `/api/v1/rutas/departamentos/${CreateRuteOptions.idPais}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          setDepartament(await response.data);
        }

        if (CreateRuteOptions.idDepartamento != 0) {
          const response = await clienteAxios.get(
            `/api/v1/rutas/regiones/${CreateRuteOptions.idDepartamento}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          setRegion(await response.data);
        }

        if (CreateRuteOptions.idRegion != 0) {
          const response = await clienteAxios.get(
            `/api/v1/rutas/ciudades/${CreateRuteOptions.idRegion}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          setCity(await response.data);
        }
      } catch (error) {
        console.error(error);
      }

    })();
  }, [getAccessTokenSilently, CreateRuteOptions]);

  const[createCountry, setcreateCountry] = useState(false)
  const[createDepartament, setcreateDepartament] = useState(false)
  const[createRegion, setcreateRegion] = useState(false)
  const[createCity, setcreateCity] = useState(false)


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

  const onChangeFormulario = (e, option) => {
    setCreateRuteOptions({
      ...CreateRuteOptions,
      [e.target.name]: e.target.value
    })
  };

  const submitCreateRouteOptions = async(e) => {
    try{
      const token = await getAccessTokenSilently({
        audience: "htttps://cig/api",
        scope: "read:cig-admin",
      });

      const response = await clienteAxios.post(
        `/api/v1/rutas/ruta`,
        CreateRuteOptions,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      // Mensaje de exito
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Ruta  registrada exitosamente.',
        showConfirmButton: false,
        timer: 1500
      })
    }catch(error){
      const mensaje = error.response.data.mensaje;
      // mensaje de error
      Swal.fire({
        icon: 'error',
        title: 'Error al crear la ruta',
        text: mensaje
     })
      console.log(error);
    }
  }



  return (
    <>
      <Helmet>
        <title>Opciones de Ruta Nueva - Components</title>
      </Helmet>
      <PageTitleWrapper>
        <PageTitle
          heading="Crear nueva ruta"
          subHeading="Proceso Crear Ruta Nueva" />
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
                        name='idPais'
                        color='success'
                        value={CreateRuteOptions.idPais}
                        onChange={e => {onChangeFormulario(e,"country")}}
                        disabled = {createCountry}
                        helperText="Por favor seleccione un pais"
                      >
                        {country.map((option) => (
                          <MenuItem key={option.id} value={option.id}>
                            {option.nombre}
                          </MenuItem>
                        ))}
                      </TextField>
                          
                      <TextField
                        id="outlined-select"
                        required
                        label="Nuevo Pais"
                        name='nombrePais'
                        color='success'
                        value={CreateRuteOptions.nombrePais}
                        onChange={e => {onChangeFormulario(e,"null")}}
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
                        name='idDepartamento'
                        color='success'
                        value={CreateRuteOptions.idDepartamento}
                        onChange={e => {onChangeFormulario(e,"departament")}}
                        disabled = {createDepartament}
                        helperText="Por favor seleccione un departamento"
                      >
                        {departament.map((option) => (
                          <MenuItem key={option.id} value={option.id}>
                            {option.nombre}
                          </MenuItem>
                        ))}
                      </TextField>
                          
                      <TextField
                        id="outlined-select"
                        required
                        label="Nuevo Departamento"
                        name='nombreDepartamento'
                        color='success'
                        value={CreateRuteOptions.nombreDepartamento}
                        onChange={e => {onChangeFormulario(e,"null")}}
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
                        name='idRegion'
                        color='success'
                        value={CreateRuteOptions.idRegion}
                        onChange={e => {onChangeFormulario(e,"region")}}
                        disabled = {createRegion}
                        helperText="Por favor seleccione una region"
                      >
                        {region.map((option) => (
                          <MenuItem key={option.id} value={option.id}>
                            {option.nombre}
                          </MenuItem>
                        ))}
                      </TextField>
                          
                      <TextField
                        id="outlined-select"
                        required
                        label="Nueva Region"
                        name='nombreRegion'
                        color='success'
                        value={CreateRuteOptions.nombreRegion}
                        onChange={e => {onChangeFormulario(e,"null")}}
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
                        name='idCiudad'
                        color='success'
                        value={CreateRuteOptions.idCiudad}
                        onChange={e => {onChangeFormulario(e,"city")}}
                        disabled = {createCity}
                        helperText="Por favor seleccione una ciudad"
                      >
                        {city.map((option) => (
                          <MenuItem key={option.id} value={option.id}>
                            {option.nombre}
                          </MenuItem>
                        ))}
                      </TextField>
                          
                      <TextField
                        id="outlined-select"
                        required
                        label="Nueva Ciudad"
                        name='nombreCiudad'
                        color='success'
                        value={CreateRuteOptions.nombreCiudad}
                        onChange={e => {onChangeFormulario(e,"null")}}
                        disabled = {!createCity}
                        helperText="Por favor ingrese la nueva ciudad"
                      />
                    </div>
                  <div>    
                      <TextField
                        id="outlined-select"
                        required
                        label="Nueva Zona"
                        name='nombreZona'
                        color='success'
                        value={CreateRuteOptions.nombreZona}
                        onChange={e => {onChangeFormulario(e,"null")}}
                        helperText="Por favor ingrese la nueva zona"
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
                        onClick={
                          submitCreateRouteOptions
                        }
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
