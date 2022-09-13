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

const label = { inputProps: { "aria-label": "Switch demo" } };

function ClientAdd() {

  const { user, isAuthenticated, getAccessTokenSilently } = useAuth0();

  const [neighborhood, setNeighborhood] = useState([]);

  const callNeighborhood = async (token) => {
    const response = await clienteAxios.get('/api/v1/barrios', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    setNeighborhood( await response.data);
  };

  const [relationship, setRelationship] = useState([]);

  const callRelationship = async (token) => {
    const response = await clienteAxios.get('/api/v1/parentescos', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    setRelationship(await response.data);
  };

  useEffect(() => {
    (async () => {
      try {
        const token = await getAccessTokenSilently({
          audience: 'htttps://cig/api',
          scope: 'read:cig-vendedor read:cig-cobrador',
        });
        callRelationship(token);
        callNeighborhood(token);
      } catch (e) {
        console.error(e);
      }
    })();
  }, [])

  const [cliente, setCliente] = useState({
    identificacion: " ",
    primerNombre: " ",
    segundoNombre: " ",
    primerApellido: " ",
    segundoApellido: " ",
    direccion: " ",
    telefono: " ",
    cupo: " ",
    idBarrio: 0,
    nombreReferencia1: " ",
    telefonoReferencia1: " ",
    idParentescoReferencia1: 0,
    nombreReferencia2: " ",
    telefonoReferencia2: " ",
    idParentescoReferencia2: 0,
  });

  const onChangeFormulario = (e) => {
    setCliente({
      ...cliente,
      [e.target.name]: e.target.value,
    });
  };

  const submitCrearCliente = async (e) => {
    // Se enviaria el cliente al back
    try {
      const token = await getAccessTokenSilently({
        audience: 'htttps://cig/api',
        scope: 'read:cig-vendedor read:cig-cobrador',
      });
      const response = await clienteAxios.post("/api/v1/clientes/cliente", cliente, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      // Mensaje de exito
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Cliente registrado exitosamente.",
        showConfirmButton: false,
        timer: 1500,
      });
      console.log("Se ha creado el cliente exitosamente");
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
          docs="/overview"
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
                      color="success"
                      defaultValue=" "
                      name="segundoApellido"
                      value={cliente.segundoApellido}
                      onChange={onChangeFormulario}
                    />

                    <TextField
                      id="outlined-number"
                      label="Dirección"
                      type="text"
                      color="success"
                      name="direccion"
                      value={cliente.direccion}
                      onChange={onChangeFormulario}
                    />

                    <TextField
                      id="outlined-number"
                      label="Telefono"
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
                      color="success"
                      name="nombreReferencia1"
                      value={cliente.nombreReferencia1}
                      onChange={onChangeFormulario}
                    />
                    <TextField
                      id="outlined-required"
                      label="Telefono"
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
