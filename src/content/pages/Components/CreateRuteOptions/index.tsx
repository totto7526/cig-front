import { Helmet } from 'react-helmet-async';
import PageTitle from 'src/components/PageTitle';
import { useState, useEffect} from 'react';

import PageTitleWrapper from 'src/components/PageTitleWrapper';
import { Container, Grid, Card, CardHeader, CardContent, Divider, Button} from '@mui/material';
import Footer from 'src/components/Footer';

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import { useTheme } from '@emotion/react';

import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import clienteAxios from  'src/config/axios';
import Swal from 'sweetalert2';

import { useAuth0 } from '@auth0/auth0-react';


function CreateRuteOptions() {


  const theme = useTheme();
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
  });
  
  const [errorValue, setErrorValue] = useState({
    idPais:false,
    nombrePais:false,
    idDepartamento:false,
    nombreDepartamento:false,
    idRegion:false,
    nombreRegion:false,
    idCiudad:false,
    nombreCiudad:false,
    nombreZona:false,
  });

  const [helperTextValue, sethelperTextValue] = useState({
    idPais:"",
    nombrePais:"",
    idDepartamento:"",
    nombreDepartamento:"",
    idRegion:"",
    nombreRegion:"",
    idCiudad:"",
    nombreCiudad:"",
    nombreZona:"",
  });

  const actualizarExistenciaError = () => {
    let errors = {
      idPais:false,
      nombrePais:false,
      idDepartamento:false,
      nombreDepartamento:false,
      idRegion:false,
      nombreRegion:false,
      idCiudad:false,
      nombreCiudad:false,
      nombreZona:false,
    }

    let errorText = {
      idPais:"",
      nombrePais:"",
      idDepartamento:"",
      nombreDepartamento:"",
      idRegion:"",
      nombreRegion:"",
      idCiudad:"",
      nombreCiudad:"",
      nombreZona:"",
    }

    
    if (CreateRuteOptions.idPais == 0 && CreateRuteOptions.nombrePais.trim().length === 0) {
      errors = {...errors, idPais: true};
      errors = {...errors, nombrePais: true};
      errorText = {...errorText, idPais: '¡Debe seleccionar un país o crear uno nuevo!'}
      errorText = {...errorText, nombrePais: '¡Debe seleccionar un país o crear uno nuevo!' }
    }

    if (CreateRuteOptions.idDepartamento == 0 && CreateRuteOptions.nombreDepartamento.trim().length === 0) {
      errors = {...errors, idDepartamento: true};
      errors = {...errors, nombreDepartamento: true};
      errorText = {...errorText, idDepartamento: '¡Debe seleccionar un departamento o crear uno nuevo!'}
      errorText = {...errorText, nombreDepartamento: '¡Debe seleccionar un departamento o crear uno nuevo!'}
    }
    if (CreateRuteOptions.idRegion == 0 && CreateRuteOptions.nombreRegion.trim().length === 0) {
      errors = {...errors, idRegion: true};
      errors = {...errors, nombreRegion: true};
      errorText = {...errorText, idRegion: '¡Debe seleccionar una región o crear uno nueva!'}
      errorText = {...errorText, nombreRegion: '¡Debe seleccionar una región o crear uno nueva!'}
    }
    if (CreateRuteOptions.idCiudad == 0 && CreateRuteOptions.nombreCiudad.trim().length === 0) {
      errors = {...errors, idCiudad: true};
      errors = {...errors, nombreCiudad: true};
      errorText = {...errorText, idCiudad: '¡Debe seleccionar una ciudad o crear uno nueva!'}
      errorText = {...errorText, nombreCiudad: '¡Debe seleccionar una ciudad o crear uno nueva!'}
    }
    if (CreateRuteOptions.nombreZona.trim().length === 0) {
      errors = {...errors, nombreZona: true};
      errorText = {...errorText, nombreZona: '¡Debe ingresar el numero de la nueva zona!'}
    }

    setErrorValue(errors);
    sethelperTextValue(errorText);
  };


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

    if(e.target.name !== 'idPais' && 
       e.target.name !== 'idDepartamento' && 
       e.target.name !== 'idRegion' &&
       e.target.name !== 'idCiudad'){
      if (e.target.value.trim().length === 0) {
        setErrorValue({
          ...errorValue,
          [e.target.name]: true,
        });
  
        sethelperTextValue({
          ...helperTextValue,
          [e.target.name]: "Campo obligatorio",
        });
      } else {
        setErrorValue({
          ...errorValue,
          [e.target.name]: false,
        });
  
        sethelperTextValue({
          ...helperTextValue,
          [e.target.name]: "",
        });
      }
    }
  };

  const submitCreateRouteOptions = async(e) => {

    actualizarExistenciaError();

    if (
      !errorValue.idPais &&
      !errorValue.nombrePais &&
      !errorValue.idDepartamento&&
      !errorValue.nombreDepartamento &&
      !errorValue.idRegion&&
      !errorValue.nombreRegion &&
      !errorValue.idCiudad&&
      !errorValue.nombreCiudad &&
      !errorValue.nombreZona
    ){
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
  };



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
                    {
                      createCountry ? 
                      <TextField
                        id="outlined-select"
                        required
                        error={errorValue.nombrePais}
                        helperText={helperTextValue.nombrePais}
                        label="Nuevo Pais"
                        name='nombrePais'
                        color='success'
                        value={CreateRuteOptions.nombrePais}
                        onChange={e => {onChangeFormulario(e,"null")}}
                        disabled = {!createCountry}
                      /> :
                      <TextField
                        id="outlined-select"
                        select
                        error={errorValue.idPais}
                        helperText={helperTextValue.idPais}
                        label="Pais"
                        name='idPais'
                        color='success'
                        value={CreateRuteOptions.idPais}
                        onChange={e => {onChangeFormulario(e,"country")}}
                        disabled = {createCountry}
                      >
                        {country.map((option) => (
                          <MenuItem key={option.id} value={option.id}>
                            {option.nombre}
                          </MenuItem>
                        ))}
                      </TextField>
                    }                        
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
                    {
                      createDepartament ?
                      <TextField
                        id="outlined-select"
                        required
                        error={errorValue.nombreDepartamento}                        
                        helperText={helperTextValue.nombreDepartamento}
                        label="Nuevo Departamento"
                        name='nombreDepartamento'
                        color='success'
                        value={CreateRuteOptions.nombreDepartamento}
                        onChange={e => {onChangeFormulario(e,"null")}}
                        disabled = {!createDepartament}
                      /> :
                      <TextField
                        id="outlined-select"
                        select
                        error={errorValue.idDepartamento}
                        helperText={helperTextValue.idDepartamento}
                        label="Departamento"
                        name='idDepartamento'
                        color='success'
                        value={CreateRuteOptions.idDepartamento}
                        onChange={e => {onChangeFormulario(e,"departament")}}
                        disabled = {createDepartament}
                      >
                        {departament.map((option) => (
                          <MenuItem key={option.id} value={option.id}>
                            {option.nombre}
                          </MenuItem>
                        ))}
                     </TextField> 
                    }
                                                                     
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
                    {
                      createRegion ?
                      <TextField
                        id="outlined-select"
                        required
                        error={errorValue.nombreRegion}                  
                        helperText={helperTextValue.nombreRegion}
                        label="Nueva Region"
                        name='nombreRegion'
                        color='success'
                        value={CreateRuteOptions.nombreRegion}
                        onChange={e => {onChangeFormulario(e,"null")}}
                        disabled = {!createRegion}
                      />: 
                      <TextField
                          id="outlined-select"
                          select
                          error={errorValue.idRegion}
                          helperText={helperTextValue.idRegion}
                          label="Region"
                          name='idRegion'
                          color='success'
                          value={CreateRuteOptions.idRegion}
                          onChange={e => {onChangeFormulario(e,"region")}}
                          disabled = {createRegion}
                        >
                          {region.map((option) => (
                            <MenuItem key={option.id} value={option.id}>
                              {option.nombre}
                            </MenuItem>
                          ))}
                      </TextField>
                    }                                                                      
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
                    {
                      createCity ?
                      <TextField
                        id="outlined-select"
                        required
                        error={errorValue.nombreCiudad}
                        helperText={helperTextValue.nombreCiudad}
                        label="Nueva Ciudad"
                        name='nombreCiudad'
                        color='success'
                        value={CreateRuteOptions.nombreCiudad}
                        onChange={e => {onChangeFormulario(e,"null")}}
                        disabled = {!createCity}
                      /> : 
                      <TextField
                            id="outlined-select"
                            select
                            error={errorValue.idCiudad}
                            helperText={helperTextValue.idCiudad}
                            label="Ciudad"
                            name='idCiudad'
                            color='success'
                            value={CreateRuteOptions.idCiudad}
                            onChange={e => {onChangeFormulario(e,"city")}}
                            disabled = {createCity}
                          >
                            {city.map((option) => (
                              <MenuItem key={option.id} value={option.id}>
                                {option.nombre}
                              </MenuItem>
                            ))}
                        </TextField>
                        }                                                                     
                    </div>
                  <div>    
                      <TextField
                        id="outlined-select"
                        required
                        error={errorValue.nombreZona}
                        helperText={helperTextValue.nombreZona}
                        label="Nueva Zona"
                        name='nombreZona'
                        color='success'
                        value={CreateRuteOptions.nombreZona}
                        onChange={e => {onChangeFormulario(e,"null")}}
                      />
                    </div>
                    <Button 
                        sx={{ margin: 5,  backgroundColor: 'red'}}
                        variant="contained"
                        href="/dashboards/cards"
                        >
                          Cancelar
                      </Button>
                      <Button 
                        sx={{ margin: 5, width: '25ch'}} 
                        variant="contained"
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
