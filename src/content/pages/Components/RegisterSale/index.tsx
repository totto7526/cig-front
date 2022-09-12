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

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

import Paper from "@mui/material/Paper";

import clienteAxios from "src/config/axios";
import Swal from "sweetalert2";

import { useAuth0 } from "@auth0/auth0-react";

const label = { inputProps: { "aria-label": "Switch demo" } };

function RegisterSale() {
  const { user, isAuthenticated, getAccessTokenSilently } = useAuth0();

  const [listTrabajador, setListTrabajador] = useState([]);
  const [listFormaPago, setListFormaPago] = useState([]);
  const [listModalidad, setListModalidad] = useState([]);
  const [listProducto, setListProduct] = useState([]);

  const callTrabajadores = async (token) => {
    const response = await clienteAxios.get("/api/v1/trabajadores", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    setListTrabajador(await response.data);
  };
  const callFormaPago = async (token) => {
    const response = await clienteAxios.get("/api/v1/fomas-pago", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    setListFormaPago(await response.data);
  };
  const callModalidad = async (token) => {
    const response = await clienteAxios.get("/api/v1/modalidades", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    setListModalidad(await response.data);
  };

  const callProductos = async (token) => {
    const response = await clienteAxios.get("/api/v1/productos", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    setListProduct(await response.data);
  };

  useEffect(() => {
    (async () => {
      try {
        const token = await getAccessTokenSilently({
          audience: "htttps://cig/api",
          scope: "read:cig-vendedor read:cig-cobrador",
        });
        console.log(token);

        callTrabajadores(token);
        callFormaPago(token);
        callModalidad(token);
        callProductos(token);
      } catch (e) {
        console.error(e);
      }
    })();
  }, []);

  const [identificacion, setIdentificacion] = useState("");
  const [details, setDetails] = useState([]);
  const [idProducto, setIdProducto] = useState(0);
  const [cantidad, setCantidad] = useState(0);
  const [descuento, setDescuento] = useState(0);
  const [justificacion, setJustificacion] = useState("");

  const [register, setRegister] = useState({
    idTrabajador: 0,
    idCliente: 0,
    idFormaPago: 0,
    idModalidad: 0,
    cuotaInicial: 0,
    detallesVenta: [],
  });

  const onChangeFormulario = (e) => {
    setRegister({
      ...register,
      [e.target.name]: e.target.value,
    });
  };

  const submitCrearDetalles = (idP, ca, da, just) => {
    let newdetail = {
      idProducto: idP,
      cantidad: ca,
      descuentoAdicional: da,
      justificacion: just,
    };

    setDetails([...details, newdetail]);
    console.log(details);
  };

  const submitCrearVenta = async (e) => {
    //LLamado cliente por identificación
    const token = await getAccessTokenSilently({
      audience: "htttps://cig/api",
      scope: "read:cig-vendedor",
    });
    console.log(token);

    const response = await clienteAxios.get("/api/v1/clientes/cliente", {
      params: { identificacion: identificacion },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    register.idCliente = response.data.id;
    register.detallesVenta = details;

    //Se enviaria el cliente al back
    try {
      console.log(register);
      const name =
        response.data.persona.primerNombre +
        " " +
        response.data.persona.segundoNombre +
        " " +
        response.data.persona.primerApellido;

      await Swal.fire({
        title: `La venta se realizara a ${name}`,
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#30d667",
        cancelButtonColor: "#d33",
        confirmButtonText: "Confirmar",
      }).then(async (result) => {
        if (result.isConfirmed) {
          const response = await clienteAxios.post(
            "/api/v1/ventas/crear",
            register,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
        }
      });
      // Mensaje de exito
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Venta registrada exitosamente.",
        showConfirmButton: false,
        timer: 1500,
      });
      console.log("Se ha creado la venta exitosamente");
    } catch (error) {
      const mensaje = error.response.data.mensaje;

      // mensaje de error
      Swal.fire({
        icon: "error",
        title: "Error al registrar la venta",
        text: mensaje,
      });
      console.log(error);
    }
  };

  return (
    <>
      <Helmet>
        <title>RegistroVenta - Components</title>
      </Helmet>
      <PageTitleWrapper>
        <PageTitle
          textButton="Inicio"
          heading="Registro Venta"
          subHeading="Proceso para registrar una venta"
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
              <CardHeader title="Datos Venta" />
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
                      id="outlined-select"
                      select
                      label="Empleado"
                      name="idTrabajador"
                      value={register.idTrabajador}
                      onChange={onChangeFormulario}
                      helperText="Por favor seleccione el empleado"
                    >
                      {listTrabajador.map((option) => (
                        <MenuItem key={option.id} value={option.id}>
                          {option.persona.primerNombre +
                            " " +
                            option.persona.primerApellido}
                        </MenuItem>
                      ))}
                    </TextField>

                    <TextField
                      id="outlined-select"
                      required
                      label="Ingrese la cedula del cliente"
                      name="identificacion"
                      color="success"
                      value={identificacion}
                      onChange={(e) => setIdentificacion(e.target.value)}
                      helperText="Por favor ingrese el numero de cedula del cliente"
                    />
                    <TextField
                      id="outlined-select-currency"
                      select
                      label="Forma Pago"
                      name="idFormaPago"
                      value={register.idFormaPago}
                      onChange={onChangeFormulario}
                      helperText="Por favor seleccione la forma de pago"
                    >
                      {listFormaPago.map((option) => (
                        <MenuItem key={option.id} value={option.id}>
                          {option.nombre}
                        </MenuItem>
                      ))}
                    </TextField>
                    <TextField
                      id="outlined-select-currency"
                      select
                      label="Modalidad"
                      name="idModalidad"
                      value={register.idModalidad}
                      onChange={onChangeFormulario}
                      helperText="Por favor seleccione la modalidad"
                    >
                      {listModalidad.map((option) => (
                        <MenuItem key={option.id} value={option.id}>
                          {option.nombre}
                        </MenuItem>
                      ))}
                    </TextField>

                    <TextField
                      id="outlined-number"
                      label="Cuota Inicial"
                      color="success"
                      name="cuotaInicial"
                      value={register.cuotaInicial}
                      onChange={onChangeFormulario}
                    />

                    <TextField
                      id="outlined-select-currency"
                      select
                      label="Producto"
                      name="idProducto"
                      value={idProducto}
                      onChange={(e) => setIdProducto(parseInt(e.target.value))}
                      helperText="Por favor seleccione un producto"
                    >
                      {listProducto.map((option) => (
                        <MenuItem key={option.id} value={option.id}>
                          {option.nombre}
                        </MenuItem>
                      ))}
                    </TextField>

                    <TextField
                      id="outlined-number"
                      label="Cantidad"
                      type="number"
                      color="success"
                      name="cantidad"
                      value={cantidad}
                      onChange={(e) => setCantidad(parseInt(e.target.value))}
                    />

                    <TextField
                      id="outlined-number"
                      label="Descuento"
                      type="number"
                      color="success"
                      name="descuento"
                      value={descuento}
                      onChange={(e) => setDescuento(parseInt(e.target.value))}
                    />
                    <TextField
                      id="outlined-required"
                      label="Descripcion Descuento"
                      color="success"
                      name="justificacion"
                      value={justificacion}
                      onChange={(e) => setJustificacion(e.target.value)}
                    />
                    <div>
                      <Button
                        sx={{ margin: 1 }}
                        variant="contained"
                        onClick={submitCrearVenta}
                      >
                        GUARDAR
                      </Button>
                      <Button
                        sx={{ margin: 1 }}
                        variant="contained"
                        onClick={(e) =>
                          submitCrearDetalles(
                            idProducto,
                            cantidad,
                            descuento,
                            justificacion
                          )
                        }
                      >
                        AÑADIR DETALLES
                      </Button>
                    </div>

                    <div>
                      <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                          <TableHead>
                            <TableRow>
                              <TableCell>Producto</TableCell>
                              <TableCell>Cantidad</TableCell>
                              <TableCell>Descuento</TableCell>
                              <TableCell>Justificacion</TableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {details.map((row) => (
                              <TableRow
                                key={row.idProducto}
                                sx={{
                                  "&:last-child td, &:last-child th": {
                                    border: 0,
                                  },
                                }}
                              >
                                <TableCell>{row.idProducto}</TableCell>
                                <TableCell>{row.cantidad}</TableCell>
                                <TableCell>{row.descuentoAdicional}</TableCell>
                                <TableCell align="left">
                                  {row.justificacion}
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </TableContainer>
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

export default RegisterSale;
