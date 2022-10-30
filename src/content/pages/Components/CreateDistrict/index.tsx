import { Helmet } from "react-helmet-async";
import PageTitle from "src/components/PageTitle";
import { useState, useEffect } from "react";

import PageTitleWrapper from "src/components/PageTitleWrapper";
import {
  Container,
  Grid,
  Card,
  CardHeader,
  CardContent,
  Divider,
  Button,
} from "@mui/material";
import Footer from "src/components/Footer";

import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";

import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import clienteAxios from "src/config/axios";
import Swal from "sweetalert2";

import { useAuth0 } from "@auth0/auth0-react";

function CreateRuteOptions() {
  const { user, isAuthenticated, getAccessTokenSilently } = useAuth0();

  const [departament, setDepartament] = useState([]);
  const [region, setRegion] = useState([]);
  const [city, setCity] = useState([]);
  const [district, setDistrict] = useState([]);
  const [zone, setZone] = useState([]);
  const [country, setCountry] = useState([]);

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
    idPais: 0,
    idDepartamento: 0,
    idRegion: 0,
    idCiudad: 0,
    idZona: 0,
    idBarrio: 0,
    nombreBarrio: "",
  });

  const [errorValue, setErrorValue] = useState({
    idPais: false,
    idDepartamento: false,
    idRegion: false,
    idCiudad: false,
    idZona: false,
    idBarrio: false,
    nombreBarrio: false,
  });

  
  const [helperTextValue, sethelperTextValue] = useState({
    idPais: "",
    idDepartamento: "",
    idRegion: "",
    idCiudad: "",
    idZona: "",
    idBarrio: "",
    nombreBarrio: "",
  });

    const actualizarExistenciaError = () => {
      let errors = {
        idPais: false,
        idDepartamento: false,
        idRegion: false,
        idCiudad: false,
        idZona: false,
        idBarrio: false,
        nombreBarrio: false,
      }

      let errorText = {
        idPais: "",
        idDepartamento: "",
        idRegion: "",
        idCiudad: "",
        idZona: "",
        idBarrio: "",
        nombreBarrio: "",
      }

      if(CreateRuteOptions.idPais === 0){
        errors = {...errors, idPais: true};
        errorText = {...errorText, idPais: 'Campo Obligatorio'}
      }

      if(CreateRuteOptions.idDepartamento === 0){
        errors = {...errors, idDepartamento: true};
        errorText = {...errorText, idDepartamento: 'Campo Obligatorio'}
      }
      if(CreateRuteOptions.idRegion === 0){
        errors = {...errors, idRegion: true};
        errorText = {...errorText, idRegion: 'Campo Obligatorio'}
      }
      if(CreateRuteOptions.idCiudad === 0){
        errors = {...errors, idCiudad: true};
        errorText = {...errorText, idCiudad: 'Campo Obligatorio'}
      }
      if(CreateRuteOptions.idZona === 0){
        errors = {...errors, idZona: true};
        errorText = {...errorText, idZona: 'Campo Obligatorio'}
      }
      if(CreateRuteOptions.idBarrio === 0 && CreateRuteOptions.nombreBarrio.trim().length === 0 ){
        errors = {...errors, idBarrio: true};
        errors = {...errors, nombreBarrio: true};
        errorText = {...errorText, idBarrio: 'Seleccione un barrio o ingrese uno nuevo'}
        errorText = {...errorText, nombreBarrio: 'Selecciones un barrio o ingrese uno nuevo'}
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

        if (CreateRuteOptions.idCiudad != 0) {
          const response = await clienteAxios.get(
            `/api/v1/rutas/barrios/${CreateRuteOptions.idCiudad}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          setDistrict(await response.data);

          const responseZone = await clienteAxios.get(
            `/api/v1/rutas/zonas/${CreateRuteOptions.idCiudad}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          setZone(await responseZone.data);
        }
      } catch (error) {
        console.error(error);
      }
    })();
  }, [getAccessTokenSilently, CreateRuteOptions]);

  const [createDistrict, setcreateDistrict] = useState(false);

  const onChangeDistrict = (e) => {
    setcreateDistrict(!createDistrict);
  };

  const onChangeFormulario = (e, option) => {
    setCreateRuteOptions({
      ...CreateRuteOptions,
      [e.target.name]: e.target.value,
    });

    if(e.target.name !== 'idPais' && 
       e.target.name !== 'idDepartamento' && 
       e.target.name !== 'idRegion' &&
       e.target.name !== 'idCiudad' &&
       e.target.name !== 'idZona' &&
       e.target.name !== 'idBarrio'){
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

  const submitCreateRouteOptions = async (e) => {
    actualizarExistenciaError();

    if (
      !errorValue.idPais &&
      !errorValue.idDepartamento&&
      !errorValue.idRegion&&
      !errorValue.idCiudad&&
      !errorValue.idBarrio&&
      !errorValue.idZona&&
      !errorValue.nombreBarrio
    ){
      try {

        const token = await getAccessTokenSilently({
          audience: "htttps://cig/api",
          scope: "read:cig-admin",
        });
  
        const response = await clienteAxios.post(
          `/api/v1/barrios/asignar-zona`,
          CreateRuteOptions,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        // Mensaje de exito
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Ruta  registrada exitosamente.",
          showConfirmButton: false,
          timer: 1500,
        });
      } catch (error) {
        const mensaje = error.response.data.mensaje;
  
        // mensaje de error
        Swal.fire({
          icon: "error",
          title: "Error al crear la ruta",
          text: mensaje,
        });
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
          heading="Crear nuevo barrio"
          subHeading="Proceso para crear un nuevo barrio"
        />
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
              <CardHeader title="Asigna un nuevo barrio o cree uno nuevo para asignar a una ruta establecida" />
              <Divider />
              <CardContent>
                <Box
                  component="form"
                  sx={{
                    "& .MuiTextField-root": { m: 5, ml: 10, width: "35ch" },
                  }}
                  noValidate
                  autoComplete="off"
                >
                  <div>
                    <TextField
                      id="outlined-select"
                      select
                      error={errorValue.idPais}
                      helperText={helperTextValue.idPais}
                      label="Pais"
                      name="idPais"
                      color="success"
                      value={CreateRuteOptions.idPais}
                      onChange={(e) => {
                        onChangeFormulario(e, "country");
                      }}
                    >
                      {country.map((option) => (
                        <MenuItem key={option.id} value={option.id}>
                          {option.nombre}
                        </MenuItem>
                      ))}
                    </TextField>
                    <TextField
                      id="outlined-select"
                      select
                      error={errorValue.idDepartamento}                      
                      helperText={helperTextValue.idDepartamento}
                      label="Departamento"
                      name="idDepartamento"
                      color="success"
                      value={CreateRuteOptions.idDepartamento}
                      onChange={(e) => {
                        onChangeFormulario(e, "departament");
                      }}
                    >
                      {departament.map((option) => (
                        <MenuItem key={option.id} value={option.id}>
                          {option.nombre}
                        </MenuItem>
                      ))}
                    </TextField>
                    <TextField
                      id="outlined-select"
                      select
                      error={errorValue.idRegion}
                      helperText={helperTextValue.idRegion}
                      label="Region"
                      name="idRegion"
                      color="success"
                      value={CreateRuteOptions.idRegion}
                      onChange={(e) => {
                        onChangeFormulario(e, "region");
                      }}
                    >
                      {region.map((option) => (
                        <MenuItem key={option.id} value={option.id}>
                          {option.nombre}
                        </MenuItem>
                      ))}
                    </TextField>
                    <TextField
                      id="outlined-select"
                      select
                      error={errorValue.idCiudad}                      
                      helperText={helperTextValue.idCiudad}
                      label="Ciudad"
                      name="idCiudad"
                      color="success"
                      value={CreateRuteOptions.idCiudad}
                      onChange={(e) => {
                        onChangeFormulario(e, "city");
                      }}
                    >
                      {city.map((option) => (
                        <MenuItem key={option.id} value={option.id}>
                          {option.nombre}
                        </MenuItem>
                      ))}
                    </TextField>
                    <TextField
                      id="outlined-select"
                      select    
                      error={errorValue.idZona}                      
                      helperText={helperTextValue.idZona}
                      label="Zona"
                      name="idZona"
                      color="success"
                      value={CreateRuteOptions.idZona}
                      onChange={(e) => {
                        onChangeFormulario(e, "zone");
                      }}
                    >
                      {zone.map((option) => (
                        <MenuItem key={option.id} value={option.id}>
                          {option.nombre}
                        </MenuItem>
                      ))}
                    </TextField>
                    <div>
                      <FormControlLabel
                        control={
                          // <Switch checked={state.gilad} onChange={handleChange} name="gilad" />
                          <Switch
                            checked={createDistrict}
                            onChange={onChangeDistrict}
                            name="check"
                          />
                        }
                        label="Nuevo"
                      />
                      </div>
                      <div>
                        {
                          createDistrict ?
                          <TextField
                            id="outlined-select"
                            required
                            error={errorValue.nombreBarrio}
                            helperText={helperTextValue.nombreBarrio}
                            label="Nuevo Barrio"
                            name="nombreBarrio"
                            color="success"
                            value={CreateRuteOptions.nombreBarrio}
                            onChange={(e) => {
                              onChangeFormulario(e, "null");
                            }}
                            disabled={!createDistrict}
                          /> :
                          <TextField
                            id="outlined-select"
                            select
                            error={errorValue.idBarrio}
                            helperText={helperTextValue.idBarrio}
                            label="Barrio"
                            name="idBarrio"
                            color="success"
                            value={CreateRuteOptions.idBarrio}
                            onChange={(e) => {
                              onChangeFormulario(e, "barrio");
                            }}
                            disabled={createDistrict}
                          >
                            {district.map((option) => (
                              <MenuItem key={option.id} value={option.id}>
                                {option.nombre}
                              </MenuItem>
                            ))}
                          </TextField>
                        }                                            
                    </div>
                    <div>
                      <Button
                        sx={{ margin: 5, width: "25ch" }}
                        variant="contained"
                        href="/opcionesRuta/gestion_rutas/opciones-ruta"
                      >
                        Atras
                      </Button>
                      <Button
                        sx={{ margin: 5, width: "25ch" }}
                        variant="contained"
                        onClick={submitCreateRouteOptions}
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
