import { FC, ChangeEvent, useState } from 'react';
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
  CardHeader,
  CardContent,
  Button, 
  InputAdornment 
} from '@mui/material';

import Label from 'src/components/Label';
import { CryptoDispatch, CryptoDispatchStatus } from 'src/models/crypto_order';
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';
import BulkActions from './BulkActions';

import TextField from '@mui/material/TextField';
import AccountCircle from '@mui/icons-material/AccountCircle';


interface RecentOrdersTableProps {
  className?: string;
  CryptoDispatchs: CryptoDispatch[];
}

interface Filters {
  status?: CryptoDispatchStatus;
}


const currenciesEmpleados = [
  {
    value: 1,
    label: 'Pepito Rodrigues',
  },
  {
    value: 2,
    label: 'Juana Maria',
  },
  {
    value: 2,
    label: 'Roberto carlos',
  },
  {
    value:3,
    label:'   ',
  },
];
const currenciesCantidad= [
  {
    value: 1,
    label: '1',
  },
  {
    value: 2,
    label: '2',
  },
  {
    value: 3,
    label: '3',
  },
  {
    value: 4,
    label: '4',
  },
];

const currenciesProducto= [
  {
    value: 1,
    label: 'Sabana Doble',
  },
  {
    value: 2,
    label:'Cortina',
  },
  {
    value:3,
    label:'Tohallon',
  },
];


const getStatusLabel = (CryptoDispatchStatus: CryptoDispatchStatus): JSX.Element => {
  const map = {
    failed: {
      text: 'failed',
      color: 'error'
    },
    completed: {
      text: 'completed',
      color: 'success'
    },
    pending: {
      text: 'pending',
      color: 'warning'
    }
  };

  const { text, color }: any = map[CryptoDispatchStatus];

  return <Label color={color}>{text}</Label>;
};

const applyFilters = (
  CryptoDispatchs: CryptoDispatch[],
  filters: Filters
): CryptoDispatch[] => {
  return CryptoDispatchs.filter((CryptoDispatch) => {
    let matches = true;

    if (filters.status && CryptoDispatch.status !== filters.status) {
      matches = false;
    }

    return matches;
  });
};

const applyPagination = (
  CryptoDispatchs: CryptoDispatch[],
  page: number,
  limit: number
): CryptoDispatch[] => {
  return CryptoDispatchs.slice(page * limit, page * limit + limit);
};

const RecentOrdersTable: FC<RecentOrdersTableProps> = ({ CryptoDispatchs }) => {

  const [despacharProducto, setDespacharProducto] = useState({
    empleado:'',
    cantidad:'',
    producto:'',
    resumen:''
  })

  
  const onChangeFormulario = e => {
    setDespacharProducto({
      ...despacharProducto,
      [e.target.name]: e.target.value
    })
  }

  const submitAgregarProducto = (e) => {
    // Se enviaria el cliente al back
    console.log(despacharProducto)

    // aqui estaria la respuesta del back
    console.log("Se ha asignado la ruta exitosamente");
  }






  const [selectedCryptoDispatchs, setSelectedCryptoDispatchs] = useState<string[]>(
    []
  );
  const selectedBulkActions = selectedCryptoDispatchs.length > 0;
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
      name: 'completed'
    },
    {
      id: 'failed',
      name: 'failed'
    },
    {
      id: 'pending',
      name: 'Pendings'
    }
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

  const handleSelectAllCryptoDispatchs = (
    event: ChangeEvent<HTMLInputElement>
  ): void => {
    setSelectedCryptoDispatchs(
      event.target.checked
        ? CryptoDispatchs.map((CryptoDispatch) => CryptoDispatch.id)
        : []
    );
  };

  const handleSelectOneCryptoDispatch = (
    event: ChangeEvent<HTMLInputElement>,
    CryptoDispatchId: string
  ): void => {
    if (!selectedCryptoDispatchs.includes(CryptoDispatchId)) {
      setSelectedCryptoDispatchs((prevSelected) => [
        ...prevSelected,
        CryptoDispatchId
      ]);
    } else {
      setSelectedCryptoDispatchs((prevSelected) =>
        prevSelected.filter((id) => id !== CryptoDispatchId)
      );
    }
  };

  const handlePageChange = (event: any, newPage: number): void => {
    setPage(newPage);
  };

  const handleLimitChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setLimit(parseInt(event.target.value));
  };

  const filteredCryptoDispatchs = applyFilters(CryptoDispatchs, filters);
  const paginatedCryptoDispatchs = applyPagination(
    filteredCryptoDispatchs,
    page,
    limit
  );
  const selectedSomeCryptoDispatchs =
    selectedCryptoDispatchs.length > 0 &&
    selectedCryptoDispatchs.length < CryptoDispatchs.length;
  const selectedAllCryptoDispatchs =
    selectedCryptoDispatchs.length === CryptoDispatchs.length;
  const theme = useTheme();

  return (
    <Card>
      <CardContent>
        <Box
          component="form"
          sx={{
            '& .MuiTextField-root': { m:5, width: '35ch' },
          }}
          noValidate
          autoComplete="off"
          onClick={
            submitAgregarProducto
          }
        >
        <div>
          <TextField
              id="outlined-select-currency"
              select
              label="Empleado"
              name='empleado'
              color='success'
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <AccountCircle />
                  </InputAdornment>
                ),
              }}
              defaultValue=' '
              value={despacharProducto.empleado}
              onChange={onChangeFormulario}
              helperText="Por favor seleccione un empleado"
            >
              {currenciesEmpleados.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          </div> 
          <div>
            <TextField
              id="outlined-select-currency"
              select
              label="Cantidad"
              name='cantidad'
              value={despacharProducto.cantidad}
              onChange={onChangeFormulario}
              helperText="Por favor seleccione una cantidad"
            >
              {currenciesCantidad.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
                        
            <TextField
              id="outlined-select-currency"
              select
              label="Producto"
              name='producto'
              value={despacharProducto.producto}
              onChange={onChangeFormulario}
              helperText="Por favor seleccione un producto"
            >
              {currenciesProducto.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              required
              id="outliend-required"
              label="Resumen"
              color='success'
              defaultValue=" "
              name='resumen'
              value={despacharProducto.resumen = 
                despacharProducto.cantidad + ' ' + despacharProducto.producto}
              onChange={onChangeFormulario}
            />
            <div>
              <Button sx={{ margin: 5, width: '25ch'}} variant="contained">Agregar</Button>
            </div>
          </div>
        </Box>
      </CardContent>
      <Divider />
      
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
              <TableCell padding="checkbox">
                <Checkbox
                  color="primary"
                  checked={selectedAllCryptoDispatchs}
                  indeterminate={selectedSomeCryptoDispatchs}
                  onChange={handleSelectAllCryptoDispatchs}
                />
              </TableCell>
              <TableCell>Nombre Producto</TableCell>
              <TableCell>Referencia Producto</TableCell>
              <TableCell>Descripcion</TableCell>
              <TableCell align="right">Medidas</TableCell>
              <TableCell align="right">Estado</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedCryptoDispatchs.map((CryptoDispatch) => {
              const isCryptoDispatchSelected = selectedCryptoDispatchs.includes(
                CryptoDispatch.id
              );
              return (
                <TableRow
                  hover
                  key={CryptoDispatch.id}
                  selected={isCryptoDispatchSelected}
                >
                  <TableCell padding="checkbox">
                    <Checkbox
                      color="primary"
                      checked={isCryptoDispatchSelected}
                      onChange={(event: ChangeEvent<HTMLInputElement>) =>
                        handleSelectOneCryptoDispatch(event, CryptoDispatch.id)
                      }
                      value={isCryptoDispatchSelected}
                    />
                  </TableCell>
                  <TableCell>
                    <Typography
                      variant="body1"
                      fontWeight="bold"
                      color="text.primary"
                      gutterBottom
                      noWrap
                    >
                      {CryptoDispatch.nameProduct}
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
                      {CryptoDispatch.reference}
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
                      {CryptoDispatch.Description}
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
                      {CryptoDispatch.lengthProduct + 'X' + CryptoDispatch.widthProduct}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" noWrap>
                      {CryptoDispatch.units}
                    </Typography>
                  </TableCell>
                  <TableCell align="right">
                    {getStatusLabel(CryptoDispatch.status)}
                  </TableCell>
                  <TableCell align="right">
                    <Tooltip title="Edit Order" arrow>
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
                        <EditTwoToneIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete Order" arrow>
                      <IconButton
                        sx={{
                          '&:hover': { background: theme.colors.error.lighter },
                          color: theme.palette.error.main
                        }}
                        color="inherit"
                        size="small"
                      >
                        <DeleteTwoToneIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>

      <Divider />
      <div>
        <Button sx={{ margin: 5, width: '25ch'}} variant="contained">Despachar</Button>
      </div>
      <Box p={2}>
        <TablePagination
          component="div"
          count={filteredCryptoDispatchs.length}
          onPageChange={handlePageChange}
          onRowsPerPageChange={handleLimitChange}
          page={page}
          rowsPerPage={limit}
          rowsPerPageOptions={[5, 10, 25, 30]}
        />
      </Box>
    </Card>
  );
};

RecentOrdersTable.propTypes = {
  CryptoDispatchs: PropTypes.array.isRequired
};

RecentOrdersTable.defaultProps = {
  CryptoDispatchs: []
};

export default RecentOrdersTable;
