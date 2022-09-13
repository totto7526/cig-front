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

import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl, { formControlClasses } from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";

import Input from "@mui/material/Input";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";

import clienteAxios from "src/config/axios";
import Swal from "sweetalert2";
import { useAuth0 } from "@auth0/auth0-react";

const label = { inputProps: { "aria-label": "Switch demo" } };

function ProductAdd() {
  const { user, isAuthenticated, getAccessTokenSilently } = useAuth0();

  const [listCategorias, setListCategorias] = useState([]);
  const [listMedidas, setListMedidas] = useState([]);
  const [listColores, setListColores] = useState([]);

  const callCategorias = async (token) => {
    const response = await clienteAxios.get(`/api/v1/categorias`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    setListCategorias(await response.data);
  };

  const callMedidas = async (token) => {
    const response = await clienteAxios.get("/api/v1/dimensiones", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    setListMedidas(await response.data);
  };

  const callColores = async (token) => {
    const response = await clienteAxios.get("/api/v1/colores", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    setListColores(await response.data);
  };

  useEffect(() => {
    (async () => {
      try {
        const token = await getAccessTokenSilently({
          audience: "htttps://cig/api",
          scope: "read:cig-vendedor read:cig-cobrador",
        });

        callCategorias(token);
        callMedidas(token);
        callColores(token);
      } catch (e) {
        console.error(e);
      }
    })();
  }, [getAccessTokenSilently]);

  const [producto, setProducto] = useState({
    nombre: "",
    referencia: "",
    descripcion: "",
    idDimension: 0,
    largo: 0,
    ancho: 0,
    idCategoria: 0,
    nombreCategoria: " ",
    idColor: 0,
    nombreColor: " ",
    valorCredito: 0,
    valorContado: 0,
    cantidad: 0,
  });

  const submitCrearProducto = async (e) => {
    // Se enviaria el cliente al back
    try {

      const token = await getAccessTokenSilently({
        audience: "htttps://cig/api",
        scope: "read:cig-admin",
      });

      const response = await clienteAxios.post(
        "/api/v1/productos/producto",
        producto,
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
        title: "Producto registrado exitosamente.",
        showConfirmButton: false,
        timer: 1500,
      });
      console.log("Se ha creado el producto  exitosamente");
    } catch (error) {
      const mensaje = error.response.data.mensaje;

      // mensaje de error
      Swal.fire({
        icon: "error",
        title: "Error al crear producto",
        text: mensaje,
      });
      console.log(error);
    }
  };

  const [medidaEstandar, setMedidaEstandar] = useState(true);
  const [listaCategoria, setListaCategoria] = useState(true);
  const [tipoColor, setTipoColor] = useState(true);

  const onChangeFormulario = (e) => {
    setProducto({
      ...producto,
      [e.target.name]: e.target.value,
    });
  };

  const onChangeMedida = (e) => {
    setMedidaEstandar(!medidaEstandar);
  };
  const onChangeCategoria = (e) => {
    setListaCategoria(!listaCategoria);
  };
  const onChangeColor = (e) => {
    setTipoColor(!tipoColor);
  };

  return (
    <>
      <Helmet>
        <title>RegistroProductos - Components</title>
      </Helmet>
      <PageTitleWrapper>
        <PageTitle
          textButton="Inicio"
          heading="Registro producto"
          subHeading="Proceso para registrar un producto nuevo"
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
              <CardHeader title="Datos Producto" />
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
                      required
                      id="outlined-required"
                      label="Nombre Producto"
                      color="success"
                      defaultValue=" "
                      name="nombre"
                      value={producto.nombre}
                      onChange={onChangeFormulario}
                    />
                    <TextField
                      required
                      id="outlined-required"
                      label="Referencia Producto"
                      color="success"
                      defaultValue=" "
                      name="referencia"
                      value={producto.referencia}
                      onChange={onChangeFormulario}
                    />
                    <TextField
                      required
                      id="outliend-required"
                      label="Descripción"
                      color="success"
                      defaultValue=" "
                      name="descripcion"
                      value={producto.descripcion}
                      onChange={onChangeFormulario}
                    />
                    <TextField
                      required
                      id="cantidad"
                      label="Cantidad"
                      color="success"
                      type="number"
                      name="cantidad"
                      value={producto.cantidad}
                      onChange={onChangeFormulario}
                    />

                    <div>
                      <FormControl component="fieldset">
                        <FormLabel component="legend">Colores</FormLabel>
                        <RadioGroup
                          row
                          aria-label="Colores"
                          id="colores"
                          name="colores"
                          defaultValue="Estandar"
                          onChange={onChangeColor}
                        >
                          <FormControlLabel
                            value="Estandar"
                            control={<Radio />}
                            label="Estandar"
                          />
                          <FormControlLabel
                            value="Personalizado"
                            control={<Radio />}
                            label="Personalizado"
                          />
                        </RadioGroup>
                        <div>
                          <TextField
                            id="outlined-select"
                            select
                            label="Color"
                            name="idColor"
                            disabled={!tipoColor}
                            value={producto.idColor}
                            onChange={onChangeFormulario}
                            helperText="Seleccione un color"
                          >
                            {listColores.map((option) => (
                              <MenuItem key={option.id} value={option.id}>
                                {option.nombre}
                              </MenuItem>
                            ))}
                          </TextField>
                          <TextField
                            required
                            id="ColorN"
                            label="ColorNuevo"
                            color="success"
                            name="nombreColor"
                            value={producto.nombreColor}
                            onChange={onChangeFormulario}
                            disabled={tipoColor}
                          />
                        </div>
                      </FormControl>
                    </div>

                    <div>
                      <FormControl component="fieldset">
                        <FormLabel component="legend">Tipo Categoria</FormLabel>
                        <RadioGroup
                          row
                          aria-label="Tipo categorias"
                          id="Tipo_categorias"
                          name="tipoCategorias"
                          defaultValue="Estandar"
                          onChange={onChangeCategoria}
                        >
                          <FormControlLabel
                            value="Estandar"
                            control={<Radio />}
                            label="Estandar"
                          />
                          <FormControlLabel
                            value="Personalizada"
                            control={<Radio />}
                            label="Personalizada"
                          />
                        </RadioGroup>
                        <div>
                          <TextField
                            id="outlined-select"
                            select
                            label="Categoria"
                            name="idCategoria"
                            disabled={!listaCategoria}
                            value={producto.idCategoria}
                            onChange={onChangeFormulario}
                            helperText="Por favor seleccione una categoria"
                          >
                            {listCategorias.map((option) => (
                              <MenuItem key={option.id} value={option.id}>
                                {option.nombre}
                              </MenuItem>
                            ))}
                          </TextField>
                          <TextField
                            required
                            id="CategoriaN"
                            label="CategoriaNueva"
                            color="success"
                            name="nombreCategoria"
                            value={producto.nombreCategoria}
                            onChange={onChangeFormulario}
                            disabled={listaCategoria}
                          />
                        </div>
                      </FormControl>
                    </div>

                    <div>
                      <FormControl component="fieldset">
                        <FormLabel component="legend">Tipo Medidas</FormLabel>
                        <RadioGroup
                          row
                          aria-label="Tipo medidas"
                          id="medidas"
                          name="medida"
                          defaultValue="Estandar"
                          onChange={onChangeMedida}
                        >
                          <FormControlLabel
                            value="Estandar"
                            control={<Radio />}
                            label="Estandar"
                          />
                          <FormControlLabel
                            value="Personalizada"
                            control={<Radio />}
                            label="Personalizada"
                          />
                        </RadioGroup>
                        <div>
                          <TextField
                            id="est"
                            select
                            label="Estandar"
                            name="idDimension"
                            disabled={!medidaEstandar}
                            value={producto.idDimension}
                            onChange={onChangeFormulario}
                            helperText="Por favor seleccione una medida"
                          >
                            {listMedidas.map((option) => (
                              <MenuItem key={option.id} value={option.id}>
                                {option.largo + "X" + option.ancho + " CM"}
                              </MenuItem>
                            ))}
                          </TextField>
                          <TextField
                            required
                            id="lar"
                            label="Largo"
                            color="success"
                            type="number"
                            name="largo"
                            value={producto.largo}
                            onChange={onChangeFormulario}
                            disabled={medidaEstandar}
                          />
                          <TextField
                            required
                            id="anch"
                            label="Ancho"
                            color="success"
                            type="number"
                            name="ancho"
                            value={producto.ancho}
                            onChange={onChangeFormulario}
                            disabled={medidaEstandar}
                          />
                        </div>
                      </FormControl>
                    </div>
                    <div>
                      <FormControl component="fieldset" sx={{ margin: 5 }}>
                        <InputLabel htmlFor="standard-adornment-amount">
                          Precio Credito
                        </InputLabel>
                        <Input
                          id="standard-adornment-amount"
                          required={true}
                          color="success"
                          name="valorCredito"
                          type="number"
                          value={producto.valorCredito}
                          onChange={onChangeFormulario}
                          startAdornment={
                            <InputAdornment position="start">$</InputAdornment>
                          }
                        />
                      </FormControl>
                      <FormControl component="fieldset" sx={{ margin: 5 }}>
                        <InputLabel htmlFor="standard-adornment-amount">
                          Precio Contado
                        </InputLabel>
                        <Input
                          id="standard-adornment-amount"
                          required={true}
                          color="success"
                          name="valorContado"
                          type="number"
                          value={producto.valorContado}
                          onChange={onChangeFormulario}
                          startAdornment={
                            <InputAdornment position="start">$</InputAdornment>
                          }
                        />
                      </FormControl>
                    </div>
                    <div>
                      <Button
                        sx={{ margin: 1 }}
                        variant="contained"
                        onClick={submitCrearProducto}
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

export default ProductAdd;
