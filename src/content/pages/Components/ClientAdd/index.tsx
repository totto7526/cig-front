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

import clienteAxios from "src/config/axios";
import Swal from "sweetalert2";

import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";

const label = { inputProps: { "aria-label": "Switch demo" } };

function ClientAdd() {
  let navigate = useNavigate();

  const { user, isAuthenticated, getAccessTokenSilently } = useAuth0();

  const [neighborhood, setNeighborhood] = useState([]);

  const callNeighborhood = async (token) => {
    const response = await clienteAxios.get("/api/v1/barrios", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    setNeighborhood(await response.data);
  };

  const [relationship, setRelationship] = useState([]);

  const callRelationship = async (token) => {
    const response = await clienteAxios.get("/api/v1/parentescos", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    setRelationship(await response.data);
  };

  useEffect(() => {
    (async () => {
      try {
        const token = await getAccessTokenSilently({
          audience: "htttps://cig/api",
          scope: "read:cig-vendedor read:cig-cobrador",
        });
        callRelationship(token);
        callNeighborhood(token);
      } catch (e) {
        console.error(e);
      }
    })();
  }, []);

  const [cliente, setCliente] = useState({
    identificacion: "",
    primerNombre: "",
    segundoNombre: "",
    primerApellido: "",
    segundoApellido: "",
    direccion: "",
    telefono: "",
    cupo: "",
    idBarrio: 0,
    nombreReferencia1: "",
    telefonoReferencia1: "",
    idParentescoReferencia1: 0,
    nombreReferencia2: "",
    telefonoReferencia2: "",
    idParentescoReferencia2: 0,
  });

  const [errorValue, setErrorValue] = useState({
    identificacion: false,
    primerNombre: false,
    segundoNombre: false,
    primerApellido: false,
    segundoApellido: false,
    direccion: false,
    telefono: false,
    cupo: false,
    nombreReferencia1: false,
    telefonoReferencia1: false,
    nombreReferencia2: false,
    telefonoReferencia2: false,
  });

  const [helperTextValue, sethelperTextValue] = useState({
    identificacion: "",
    primerNombre: "",
    segundoNombre: "",
    primerApellido: "",
    segundoApellido: "",
    direccion: "",
    telefono: "",
    cupo: "",
    nombreReferencia1: "",
    telefonoReferencia1: "",
    nombreReferencia2: "",
    telefonoReferencia2: "",
  });

  const actualizarExistenciaError = () => {
    let errors = {
      identificacion: false,
      primerNombre: false,
      segundoNombre: false,
      primerApellido: false,
      segundoApellido: false,
      direccion: false,
      telefono: false,
      cupo: false,
      nombreReferencia1: false,
      telefonoReferencia1: false,
      nombreReferencia2: false,
      telefonoReferencia2: false
    }

    let errorText = {
      identificacion: "",
      primerNombre: "",
      segundoNombre: "",
      primerApellido: "",
      segundoApellido: "",
      direccion: "",
      telefono: "",
      cupo: "",
      nombreReferencia1: "",
      telefonoReferencia1: "",
      nombreReferencia2: "",
      telefonoReferencia2: ""
    }

    if (cliente.identificacion.trim().length === 0 || cliente.identificacion.trim().length > 10) {
      errors = {...errors, identificacion: true};
      errorText = {...errorText, identificacion: 'Campo obligatorio y longitud debe ser menor a 10'}
    }
    if (cliente.primerNombre.trim().length === 0) {
      errors = {...errors, primerNombre: true};
      errorText = {...errorText, primerNombre: 'Campo obligatorio'}
    }
    if (cliente.primerApellido.trim().length === 0) {
      errors = {...errors, primerApellido: true};
      errorText = {...errorText, primerApellido: 'Campo obligatorio'}
    }
    if (cliente.segundoApellido.trim().length === 0) {
      errors = {...errors, segundoApellido: true};
      errorText = {...errorText, segundoApellido: 'Campo obligatorio'}
    }
    if (cliente.direccion.trim().length === 0) {
      errors = {...errors, direccion: true};
      errorText = {...errorText, direccion: 'Campo obligatorio'}
    }
    if (cliente.telefono.trim().length === 0) {
      errors = {...errors, telefono: true};
      errorText = {...errorText, telefono: 'Campo obligatorio'}
    }
    if (cliente.cupo.trim().length === 0) {
      errors = {...errors, cupo: true};
      errorText = {...errorText, cupo: 'Campo obligatorio'}
    }
    if (cliente.nombreReferencia1.trim().length === 0) {
      errors = {...errors, nombreReferencia1: true};
      errorText = {...errorText, nombreReferencia1: 'Campo obligatorio'}
    }
    if (cliente.telefonoReferencia1.trim().length === 0) {
      errors = {...errors, telefonoReferencia1: true};
      errorText = {...errorText, telefonoReferencia1: 'Campo obligatorio'}
    }
    if (cliente.nombreReferencia2.trim().length === 0) {
      errors = {...errors, nombreReferencia2: true};
      errorText = {...errorText, nombreReferencia2: 'Campo obligatorio'}
    }
    if (cliente.telefonoReferencia2.trim().length === 0) {
      errors = {...errors, telefonoReferencia2: true};
      errorText = {...errorText, telefonoReferencia2: 'Campo obligatorio'}
    }

    setErrorValue(errors);
    sethelperTextValue(errorText);
  };

  const onChangeFormulario = (e) => {
    setCliente({
      ...cliente,
      [e.target.name]: e.target.value,
    });

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
  };

  const submitCrearCliente = async (e) => {
    // Se enviaria el cliente al back
    actualizarExistenciaError();

    if (
      !errorValue.identificacion  &&
      !errorValue.primerNombre &&
      !errorValue.segundoNombre &&
      !errorValue.primerApellido &&
      !errorValue.segundoApellido &&
      !errorValue.direccion &&
      !errorValue.telefono &&
      !errorValue.cupo &&
      !errorValue.nombreReferencia1 &&
      !errorValue.nombreReferencia2 &&
      !errorValue.telefonoReferencia1 &&
      !errorValue.telefonoReferencia2
    ) {
      try {
        const token = await getAccessTokenSilently({
          audience: "htttps://cig/api",
          scope: "read:cig-vendedor read:cig-cobrador",
        });
        const response = await clienteAxios.post(
          "/api/v1/clientes/cliente",
          cliente,
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
          title: "Cliente registrado exitosamente.",
          showConfirmButton: false,
          timer: 1500,
        });
        navigate("/clientes/gestion_clientes/editar-clientes", {
          replace: true,
        });
      } catch (error) {
        const mensaje = error.response.data.mensaje;

        // mensaje de error
        Swal.fire({
          icon: "error",
          title: "Error al crear el cliente",
          text: mensaje,
        });
        console.log(error);
      }
    }
  };

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
          docs="/dashboards/cards"
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
              <CardHeader title="Datos Personales" />
              <Divider />
              <CardContent>
                <Box
                  component="form"
                  sx={{
                    "& .MuiTextField-root": { m: 6, width: "25ch" },
                  }}
                  noValidate
                  autoComplete="off"
                >
                  <div>
                    <TextField
                      id="outlined-number"
                      error={errorValue.identificacion}
                      helperText={helperTextValue.identificacion}
                      label="Numero Identificación"
                      color="success"
                      type="number"
                      name="identificacion"
                      value={cliente.identificacion}
                      onChange={onChangeFormulario}
                    />
                    <TextField
                      required
                      id="outlined-required"
                      label="Primer nombre"
                      error={errorValue.primerNombre}
                      helperText={helperTextValue.primerNombre}
                      color="success"
                      defaultValue=" "
                      name="primerNombre"
                      value={cliente.primerNombre}
                      onChange={onChangeFormulario}
                    />
                    <TextField
                      required
                      id="outlined-required"
                      label="Segundo Nombre"
                      color="success"
                      defaultValue=" "
                      name="segundoNombre"
                      value={cliente.segundoNombre}
                      onChange={onChangeFormulario}
                    />
                    <TextField
                      required
                      id="outliend-required"
                      label="Primer Apellido"
                      error={errorValue.primerApellido}
                      helperText={helperTextValue.primerApellido}
                      color="success"
                      defaultValue=" "
                      name="primerApellido"
                      value={cliente.primerApellido}
                      onChange={onChangeFormulario}
                    />
                    <TextField
                      required
                      id="outliend-required"
                      label="Segundo Apellido"
                      error={errorValue.segundoApellido}
                      helperText={helperTextValue.segundoApellido}
                      color="success"
                      defaultValue=" "
                      name="segundoApellido"
                      value={cliente.segundoApellido}
                      onChange={onChangeFormulario}
                    />

                    <TextField
                      id="outlined-number"
                      label="Dirección"
                      error={errorValue.direccion}
                      helperText={helperTextValue.direccion}
                      type="text"
                      color="success"
                      name="direccion"
                      value={cliente.direccion}
                      onChange={onChangeFormulario}
                    />

                    <TextField
                      id="outlined-number"
                      label="Telefono"
                      error={errorValue.telefono}
                      helperText={helperTextValue.telefono}
                      type="text"
                      color="success"
                      name="telefono"
                      value={cliente.telefono}
                      onChange={onChangeFormulario}
                    />

                    <TextField
                      required
                      id="outliend-number"
                      label="Cupo"
                      error={errorValue.cupo}
                      helperText={helperTextValue.cupo}
                      color="success"
                      defaultValue="150000"
                      name="cupo"
                      value={cliente.cupo}
                      onChange={onChangeFormulario}
                    />

                    <TextField
                      id="outlined-select"
                      select
                      label="Barrio"
                      color="success"
                      value={cliente.idBarrio}
                      name="idBarrio"
                      onChange={onChangeFormulario}
                      helperText="Por favor seleccione un barrio"
                    >
                      {neighborhood.map((option) => (
                        <MenuItem key={option.id} value={option.id}>
                          {option.nombre}
                        </MenuItem>
                      ))}
                    </TextField>
                  </div>
                  <CardHeader title="Datos referencias" />
                  <Divider />
                  <div>
                    <TextField
                      required
                      id="outlined-required"
                      label="Nombre Completo"
                      error={errorValue.nombreReferencia1}
                      helperText={helperTextValue.nombreReferencia1}
                      color="success"
                      name="nombreReferencia1"
                      value={cliente.nombreReferencia1}
                      onChange={onChangeFormulario}
                    />
                    <TextField
                      id="outlined-required"
                      label="Telefono"
                      error={errorValue.telefonoReferencia1}
                      helperText={helperTextValue.telefonoReferencia1}
                      type="text"
                      color="success"
                      name="telefonoReferencia1"
                      defaultValue=" "
                      value={cliente.telefonoReferencia1}
                      onChange={onChangeFormulario}
                    />
                    <TextField
                      id="outlined-select"
                      select
                      label="parentesco"
                      color="success"
                      type="text"
                      name="idParentescoReferencia1"
                      value={cliente.idParentescoReferencia1}
                      onChange={onChangeFormulario}
                      helperText="Por favor seleccione un parentesco"
                    >
                      {relationship.map((option) => (
                        <MenuItem key={option.id} value={option.id}>
                          {option.nombre}
                        </MenuItem>
                      ))}
                    </TextField>

                    <TextField
                      required
                      id="outlined-required"
                      label="Nombre Completo"
                      error={errorValue.nombreReferencia2}
                      helperText={helperTextValue.nombreReferencia2}
                      type="text"
                      color="success"
                      defaultValue=" "
                      name="nombreReferencia2"
                      value={cliente.nombreReferencia2}
                      onChange={onChangeFormulario}
                    />
                    <TextField
                      id="outlined-number"
                      label="Telefono"
                      error={errorValue.telefonoReferencia2}
                      helperText={helperTextValue.telefonoReferencia2}
                      type="text"
                      color="success"
                      name="telefonoReferencia2"
                      value={cliente.telefonoReferencia2}
                      onChange={onChangeFormulario}
                    />
                    <TextField
                      id="outlined-select"
                      select
                      label="parentesco"
                      color="success"
                      name="idParentescoReferencia2"
                      value={cliente.idParentescoReferencia2}
                      onChange={onChangeFormulario}
                      helperText="Por favor seleccione un parentesco"
                    >
                      {relationship.map((option) => (
                        <MenuItem key={option.id} value={option.id}>
                          {option.nombre}
                        </MenuItem>
                      ))}
                    </TextField>
                    <div>
                      <Button
                        sx={{ margin: 1 }}
                        variant="contained"
                        onClick={submitCrearCliente}
                      >
                        GUARDAR
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

export default ClientAdd;
