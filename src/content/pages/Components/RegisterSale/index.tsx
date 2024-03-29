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
  Tooltip,
  IconButton,
  useTheme,
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
import DeleteTwoToneIcon from "@mui/icons-material/DeleteTwoTone";

import Paper from "@mui/material/Paper";

import clienteAxios from "src/config/axios";
import Swal from "sweetalert2";

import { useAuth0 } from "@auth0/auth0-react";

const label = { inputProps: { "aria-label": "Switch demo" } };

function RegisterSale() {
  const { user, isAuthenticated, getAccessTokenSilently } = useAuth0();
  const theme = useTheme();

  const [listFormaPago, setListFormaPago] = useState([]);
  const [listModalidad, setListModalidad] = useState([]);
  const [listProducto, setListProduct] = useState([]);

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

  const [identificacion, setIdentificacion] = useState("");
  const [details, setDetails] = useState([]);
  const [idProducto, setIdProducto] = useState(0);
  const [cantidad, setCantidad] = useState(1);
  const [descuento, setDescuento] = useState(0);
  const [justificacion, setJustificacion] = useState("");
  const [precioProducto, setPrecioProducto] = useState(0);
  const [puedeAgregar, setPuedeAgregar] = useState(0);
  const [valorTotalVenta, setValorTotalVenta] = useState(0);

  const [register, setRegister] = useState({
    idTrabajador: 0,
    idCliente: 0,
    idFormaPago: 0,
    idModalidad: 0,
    cuotaInicial: 0,
    detallesVenta: [],
  });

  const [errorValue, setErrorValue] = useState({
    identificacion: false,
    cantidad: false,
    descuento: false,
    justificacion: false,
  });

  const [helperTextValue, sethelperTextValue] = useState({
    identificacion: "",
    cantidad: "",
    descuento: "",
    justificacion: "",
  });

  useEffect(() => {
    (async () => {
      try {
        const token = await getAccessTokenSilently({
          audience: "htttps://cig/api",
          scope: "read:cig-vendedor read:cig-cobrador",
        });

        callFormaPago(token);
        callModalidad(token);
        callProductos(token);
      } catch (e) {
        console.error(e);
      }
    })();
  }, []);

  useEffect(() => {
    (async () => {
      try {
        const token = await getAccessTokenSilently({
          audience: "htttps://cig/api",
          scope: "read:cig-vendedor read:cig-cobrador",
        });

        if (idProducto !== 0 && register.idModalidad !== 0) {
          const response = await clienteAxios.get(
            `/api/v1/precios/producto/${idProducto}/modalidad/${register.idModalidad}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          setPrecioProducto(response.data.valor);
        }
      } catch (e) {
        console.error(e);
      }
    })();
  }, [idProducto, register.idModalidad]);

  const actualizarExistenciaError = () => {
    let errors = {
      identificacion: false,
      cantidad: false,
      descuento: false,
      justificacion: false,
    };

    let errorText = {
      identificacion: "",
      cantidad: "",
      descuento: "",
      justificacion: "",
    };

    if (
      identificacion.trim().length === 0 ||
      identificacion.trim().length > 10
    ) {
      errors = { ...errors, identificacion: true };
      errorText = {
        ...errorText,
        identificacion: "Campo obligatorio y longitud debe ser menor a 10",
      };
    }
    if (cantidad === 0 || cantidad < 0) {
      errors = { ...errors, cantidad: true };
      errorText = {
        ...errorText,
        cantidad: "Campo obligatorio y el valor debe ser mayor a cero",
      };
    }
    if (descuento < 0) {
      errors = { ...errors, descuento: true };
      errorText = {
        ...errorText,
        descuento: "Campo obligatorio y el valor debe ser mayor a cero",
      };
    }
    if (justificacion.trim().length === 0) {
      errors = { ...errors, justificacion: true };
      errorText = { ...errorText, justificacion: "Campo obligatorio" };
    }
    setErrorValue(errors);
    sethelperTextValue(errorText);
  };

  const onChangeFormulario = (e) => {
    setRegister({
      ...register,
      [e.target.name]: e.target.value,
    });

    if (
      e.target.name !== "idFormaPago" &&
      e.target.name !== "idModalidad" &&
      e.target.name !== "idProducto"
    ) {
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

  const submitCrearDetalles = (idP, ca, da, just) => {
    actualizarExistenciaError();

    if (
      !errorValue.identificacion &&
      !errorValue.cantidad &&
      !errorValue.descuento &&
      !errorValue.justificacion &&
      puedeAgregar !== 0 &&
      precioProducto !== 0 &&
      !details.find((det) => det.idProducto === idP)
    ) {
      let newdetail = {
        idProducto: idP,
        cantidad: ca,
        descuentoAdicional: da,
        justificacion: just,
      };

      setDetails([...details, newdetail]);
    }
    setPuedeAgregar(1);
  };

  const submitCrearVenta = async (e) => {
    //LLamado cliente por identificación

    actualizarExistenciaError();

    if (
      !errorValue.identificacion &&
      !errorValue.cantidad &&
      !errorValue.descuento &&
      !errorValue.justificacion
    ) {
      //Se enviaria el cliente al back
      try {
        const token = await getAccessTokenSilently({
          audience: "htttps://cig/api",
          scope: "read:cig-vendedor",
        });

        const responseTrabajador = await clienteAxios.get(
          `/api/v1/trabajadores/trabajador/${user.email}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const response = await clienteAxios.get("/api/v1/clientes/cliente", {
          params: { identificacion: identificacion },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        register.idTrabajador = responseTrabajador.data.id;
        register.idCliente = response.data.id;
        register.detallesVenta = details;

        const name =
          response.data.persona.primerNombre +
          " " +
          response.data.persona.segundoNombre +
          " " +
          response.data.persona.primerApellido;

        await Swal.fire({
          title: `La venta se realizara a ${name}`,
          text: "¿Estás seguro de llevar a cabo la venta?",
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
        Swal.fire({
          title: "Registrando Venta",
          html: "Espera un momento.",
          timer: 4000,
          timerProgressBar: true,
          didOpen: () => {
            Swal.showLoading();
          },
        }).then((result) => {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Venta registrada exitosamente.",
            showConfirmButton: false,
            timer: 1500,
          });

          setTimeout(() => {
            window.location.reload();
          }, 2000);
        });
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
    }
  };

  const quitarDetalle = (idProducto) => {
    let newDetails = details.filter((det) => det.idProducto != idProducto);
    setDetails(newDetails);
  };

  return (
    <>
      <Helmet>
        <title>Registro Venta - Components</title>
      </Helmet>
      <PageTitleWrapper>
        <PageTitle
          heading="Registro Venta"
          subHeading="Proceso para registrar una venta"
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
                      error={errorValue.identificacion}
                      helperText={helperTextValue.identificacion}
                      required
                      label="Ingrese la cedula del cliente"
                      name="identificacion"
                      color="success"
                      type="number"
                      InputProps={{ inputProps: { min: 1 } }}
                      value={identificacion}
                      onChange={(e) => setIdentificacion(e.target.value)}
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
                      type="number"
                      color="success"
                      name="cuotaInicial"
                      value={register.cuotaInicial}
                      onChange={onChangeFormulario}
                      InputProps={{ inputProps: { min: 0 } }}
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
                      error={errorValue.cantidad}
                      helperText={helperTextValue.cantidad}
                      label="Cantidad"
                      type="number"
                      color="success"
                      name="cantidad"
                      value={cantidad}
                      onChange={(e) => setCantidad(parseInt(e.target.value))}
                      InputProps={{ inputProps: { min: 1, max: 20 } }}
                    />

                    <TextField
                      id="outlined-number"
                      error={errorValue.descuento}
                      helperText={helperTextValue.descuento}
                      label="Descuento"
                      type="number"
                      color="success"
                      name="descuento"
                      value={descuento}
                      onChange={(e) => setDescuento(parseInt(e.target.value))}
                      InputProps={{ inputProps: { min: 0 } }}
                    />
                    <TextField
                      id="outlined-required"
                      error={errorValue.justificacion}
                      helperText={helperTextValue.justificacion}
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
                              <TableCell>Valor Unitario</TableCell>
                              <TableCell>Descuento</TableCell>
                              <TableCell>Justificacion</TableCell>
                              <TableCell>Valor Total</TableCell>
                              <TableCell>Acciones</TableCell>
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
                                <TableCell>
                                  {row.idProducto !== 0
                                    ? listProducto.find(
                                        (x) => x.id === row.idProducto
                                      ).nombre
                                    : "N/A"}
                                </TableCell>
                                <TableCell>{row.cantidad}</TableCell>
                                <TableCell>{precioProducto}</TableCell>
                                <TableCell>{row.descuentoAdicional}</TableCell>
                                <TableCell align="left">
                                  {row.justificacion}
                                </TableCell>
                                <TableCell>
                                  {precioProducto * row.cantidad -
                                    row.descuentoAdicional}
                                </TableCell>
                                <TableCell align="right">
                                  <Tooltip title="Eliminar" arrow>
                                    <IconButton
                                      sx={{
                                        "&:hover": {
                                          background:
                                            theme.colors.error.lighter,
                                        },
                                        color: theme.palette.error.main,
                                      }}
                                      color="inherit"
                                      size="small"
                                      onClick={() =>
                                        quitarDetalle(row.idProducto)
                                      }
                                    >
                                      <DeleteTwoToneIcon fontSize="small" />
                                    </IconButton>
                                  </Tooltip>
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
