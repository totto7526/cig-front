import { FC, ChangeEvent, useState } from 'react';
import { format } from 'date-fns';
import numeral from 'numeral';
import PropTypes from 'prop-types';
import {
  Tooltip,
  Divider,
  Box,
  FormControl,
  InputLabel,
  Card,
  Checkbox,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  TableContainer,
  Select,
  MenuItem,
  Typography,
  useTheme,
  CardHeader
} from '@mui/material';

import Label from 'src/components/Label';
import { Product, ProductStatus } from 'src/models/product';
import EditTwoToneIcon from "@mui/icons-material/EditTwoTone";
import ToggleOnIcon from "@mui/icons-material/ToggleOn";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import BulkActions from "./BulkActions";
import { useAuth0 } from "@auth0/auth0-react";
import clienteAxios from "src/config/axios";
import Swal from "sweetalert2";
import ProductToEdit from "./ProductToEdit";

interface RecentOrdersTableProps {
  className?: string;
  Products: Product[];
}

interface Filters {
  status?: ProductStatus;
}

const getStatusLabel = (ProductStatus: ProductStatus): JSX.Element => {
  const map = {
    activo: {
      id: 1,
      text: 'ACTIVO',
      color: 'succes'
    },
    inactivo: {
      id: 2,
      text: 'INACTIVO',
      color: 'danger'
    },
  };

  const { text, color }: any = map[ProductStatus];

  return <Label color={color}>{text}</Label>;
};

const applyFilters = (
  Products: Product[],
  filters: Filters
): Product[] => {
  return Products.filter((Product) => {
    let matches = true;

    if (filters.status && Product.estado.nombre !== filters.status) {
      matches = false;
    }

    return matches;
  });
};

const applyPagination = (
  Products: Product[],
  page: number,
  limit: number
): Product[] => {
  return Products.slice(page * limit, page * limit + limit);
};

const RecentOrdersTable: FC<RecentOrdersTableProps> = ({ Products }) => {

  const [selectedProducts, setSelectedProducts] = useState<number[]>(
    []
  );
  const selectedBulkActions = selectedProducts.length > 0;
  const [page, setPage] = useState<number>(0);
  const [limit, setLimit] = useState<number>(5);
  const [filters, setFilters] = useState<Filters>({
    status: null
  });

  const statusOptions = [
    {
      id: 'all',
      name: 'All'
    },
    {
      id: 'completed',
      name: 'ACTIVO'
    },
    {
      id: 'failed',
      name: 'INACTIVO'
    },
  ];

  const handleStatusChange = (e: ChangeEvent<HTMLInputElement>): void => {
    let value = null;

    if (e.target.value !== 'all') {
      value = e.target.value;
    }

    setFilters((prevFilters) => ({
      ...prevFilters,
      status: value
    }));
  };

  const handleSelectAllProducts = (
    event: ChangeEvent<HTMLInputElement>
  ): void => {
    setSelectedProducts(
      event.target.checked
        ? Products.map((Product) => Product.id)
        : []
    );
  };

  const handleSelectOneProduct = (
    event: ChangeEvent<HTMLInputElement>,
    ProductId: number
  ): void => {
    if (!selectedProducts.includes(ProductId)) {
      setSelectedProducts((prevSelected) => [
        ...prevSelected,
        ProductId
      ]);
    } else {
      setSelectedProducts((prevSelected) =>
        prevSelected.filter((id) => id !== ProductId)
      );
    }
  };

  const handlePageChange = (event: any, newPage: number): void => {
    setPage(newPage);
  };

  const handleLimitChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setLimit(parseInt(event.target.value));
  };

  const filteredProducts = applyFilters(Products, filters);
  const paginatedProducts = applyPagination(
    filteredProducts,
    page,
    limit
  );
  const selectedSomeProducts =
    selectedProducts.length > 0 &&
    selectedProducts.length < Products.length;
  const selectedAllProducts =
    selectedProducts.length === Products.length;
  const theme = useTheme();

  const { getAccessTokenSilently } = useAuth0();

  const [productEdit, setProductEdit] = useState({})
  const [isEdit, setIsEdit] = useState(false)

  const cambiarEstado = async (idProducto, nombre, estado) => {
    let nuevoEstado = estado === "ACTIVO" ? "INACTIVO" : "ACTIVO";
    Swal.fire({
      title: "¿Estás seguro?",
      text: `Deseas cambiar el estado de ${nombre} a ${nuevoEstado}`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí",
      cancelButtonText: "Cancelar",
    }).then(async (result) => {
      if (result.isConfirmed) {
        console.log("CambiarEstado" + idProducto);

        const token = await getAccessTokenSilently({
          audience: "htttps://cig/api",
          scope: "read:cig-admin",
        });
        console.log(token);

        const response = await clienteAxios.put(
          `/api/v1/productos${idProducto}/cambiar-estado`,
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        Swal.fire({
          title: "Cambiando estado",
          html: "Espera un momento.",
          timer: 2500,
          timerProgressBar: true,
          didOpen: () => {
            Swal.showLoading();
          }
        }).then((result) => {
          
        });
      }
    });
  };

  const goToWorkerToEdit = (product) => {
      console.log(product);
      setProductEdit(product),
      setIsEdit(true);
  }
  return (
    !isEdit ?
    <Card>
      {selectedBulkActions && (
        <Box flex={1} p={2}>
          <BulkActions />
        </Box>
      )}
      {!selectedBulkActions && (
        <CardHeader
          action={
            <Box width={150}>
              <FormControl fullWidth variant="outlined">
                <InputLabel>Status</InputLabel>
                <Select
                  value={filters.status || 'all'}
                  onChange={handleStatusChange}
                  label="Status"
                  autoWidth
                >
                  {statusOptions.map((statusOption) => (
                    <MenuItem key={statusOption.id} value={statusOption.id}>
                      {statusOption.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
          }
          title="Productos"
        />
      )}
      <Divider />
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Nombre Producto</TableCell>
              <TableCell>Referencia Producto</TableCell>
              <TableCell>Descripcion</TableCell>
              <TableCell>Categoria</TableCell>
              <TableCell>Color</TableCell>
              <TableCell>Cantidad</TableCell>
              <TableCell align="right">Medidas</TableCell>
              <TableCell align="right">Estado</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedProducts.map((Product) => {
              const isProductSelected = selectedProducts.includes(
                Product.id
              );
              return (
                <TableRow
                  hover
                  key={Product.id}
                  selected={isProductSelected}
                >
                  <TableCell>
                    <Typography
                      variant="body1"
                      fontWeight="bold"
                      color="text.primary"
                      gutterBottom
                      noWrap
                    >
                      {Product.nombre}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography
                      variant="body1"
                      fontWeight="bold"
                      color="text.primary"
                      gutterBottom
                      noWrap
                    >
                      {Product.referencia}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography
                      variant="body1"
                      fontWeight="bold"
                      color="text.primary"
                      gutterBottom
                      noWrap
                    >
                      {Product.descripcion}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography
                      variant="body1"
                      fontWeight="bold"
                      color="text.primary"
                      gutterBottom
                      noWrap
                    >
                      {Product.categoria.nombre}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography
                      variant="body1"
                      fontWeight="bold"
                      color="text.primary"
                      gutterBottom
                      noWrap
                    >
                      {Product.color.nombre}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography
                      variant="body1"
                      fontWeight="bold"
                      color="text.primary"
                      gutterBottom
                      noWrap
                    >
                      {Product.cantidadExistente}
                    </Typography>
                  </TableCell>
                  <TableCell align="right">
                    <Typography
                      variant="body1"
                      fontWeight="bold"
                      color="text.primary"
                      gutterBottom
                      noWrap
                    >
                      {Product.dimension.largo + 'X' + Product.dimension.ancho}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" noWrap>
                      {'Centimetros'}
                    </Typography>
                  </TableCell>
                  <TableCell align="right">
                    {/* {getStatusLabel(Product.status)} */}
                    {Product.estado.nombre === "ACTIVO" ? (
                      <Tooltip title="ACTIVO" arrow>
                        <IconButton
                          sx={{
                            '&:hover': {
                              background: theme.colors.primary.lighter
                            },
                            color: theme.palette.primary.main
                          }}
                          color="inherit"
                          size="small"
                        >
                          <CheckCircleIcon fontSize="medium" />
                        </IconButton>
                      </Tooltip>                 
                    ):(
                      <Tooltip title="INACTIVO" arrow>
                      <IconButton
                        sx={{
                          '&:hover': { 
                            background: theme.colors.error.lighter,
                           },
                          color: theme.palette.error.main
                        }}
                        color="inherit"
                        size="small"
                      >
                        <CancelIcon fontSize="medium" />
                      </IconButton>
                    </Tooltip>
                    )}
                  </TableCell>
                  <TableCell align="right">
                   <Tooltip title="Editar" arrow>
                      <IconButton
                        sx={{
                          "&:hover": {
                            background: theme.colors.primary.lighter,
                          },
                          color: theme.palette.primary.main,
                        }}
                        color="inherit"
                        size="small"
                        onClick={() => goToWorkerToEdit(Product)}
                      >
                        <EditTwoToneIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Cambiar Estado" arrow>
                      <IconButton
                        sx={{
                          "&:hover": { background: theme.colors.error.lighter },
                          color: theme.palette.primary.main,
                        }}
                        color="inherit"
                        size="small"
                        onClick={() =>
                          cambiarEstado(
                            Product.id,
                            Product.nombre,
                            Product.estado.nombre
                          )
                        }
                      >
                        <ToggleOnIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <Box p={2}>
        <TablePagination
          component="div"
          count={filteredProducts.length}
          onPageChange={handlePageChange}
          onRowsPerPageChange={handleLimitChange}
          page={page}
          rowsPerPage={limit}
          rowsPerPageOptions={[5, 10, 25, 30]}
        />
      </Box>
    </Card>
    :
    <ProductToEdit product = {productEdit}/>
  );
};

RecentOrdersTable.propTypes = {
  Products: PropTypes.array.isRequired
};

RecentOrdersTable.defaultProps = {
  Products: []
};

export default RecentOrdersTable;
