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
import { Dispatch, DispatchStatus } from 'src/models/dispatchStatus';
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';
import BulkActions from './BulkActions';

import TextField from '@mui/material/TextField';
import AccountCircle from '@mui/icons-material/AccountCircle';


interface RecentOrdersTableProps {
  className?: string;
  Dispatchs: Dispatch[];
}

interface Filters {
  status?: DispatchStatus;
}


const listEmpleados = [
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
const listCantidad= [
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

const listProducto= [
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


const getStatusLabel = (DispatchStatus: DispatchStatus): JSX.Element => {
  const map = {
    failed: {
      text: 'INACTIVO',
      color: 'error'
    },
    completed: {
      text: 'ACTIVO',
      color: 'success'
    },
  };

  const { text, color }: any = map[DispatchStatus];

  return <Label color={color}>{text}</Label>;
};

const applyFilters = (
  Dispatchs: Dispatch[],
  filters: Filters
): Dispatch[] => {
  return Dispatchs.filter((Dispatch) => {
    let matches = true;

    if (filters.status && Dispatch.status !== filters.status) {
      matches = false;
    }

    return matches;
  });
};

const applyPagination = (
  Dispatchs: Dispatch[],
  page: number,
  limit: number
): Dispatch[] => {
  return Dispatchs.slice(page * limit, page * limit + limit);
};

const RecentOrdersTable: FC<RecentOrdersTableProps> = ({ Dispatchs }) => {

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

  const [selectedDispatchs, setSelectedDispatchs] = useState<string[]>(
    []
  );
  const selectedBulkActions = selectedDispatchs.length > 0;
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

  const handleSelectAllDispatchs = (
    event: ChangeEvent<HTMLInputElement>
  ): void => {
    setSelectedDispatchs(
      event.target.checked
        ? Dispatchs.map((Dispatch) => Dispatch.id)
        : []
    );
  };

  const handleSelectOneDispatch = (
    event: ChangeEvent<HTMLInputElement>,
    DispatchId: string
  ): void => {
    if (!selectedDispatchs.includes(DispatchId)) {
      setSelectedDispatchs((prevSelected) => [
        ...prevSelected,
        DispatchId
      ]);
    } else {
      setSelectedDispatchs((prevSelected) =>
        prevSelected.filter((id) => id !== DispatchId)
      );
    }
  };

  const handlePageChange = (event: any, newPage: number): void => {
    setPage(newPage);
  };

  const handleLimitChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setLimit(parseInt(event.target.value));
  };

  const filteredDispatchs = applyFilters(Dispatchs, filters);
  const paginatedDispatchs = applyPagination(
    filteredDispatchs,
    page,
    limit
  );
  const selectedSomeDispatchs =
    selectedDispatchs.length > 0 &&
    selectedDispatchs.length < Dispatchs.length;
  const selectedAllDispatchs =
    selectedDispatchs.length === Dispatchs.length;
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
              {listEmpleados.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          </div> 
          <div>
            <TextField
              id="outlined-select"
              select
              label="Cantidad"
              name='cantidad'
              value={despacharProducto.cantidad}
              onChange={onChangeFormulario}
              helperText="Por favor seleccione una cantidad"
            >
              {listCantidad.map((option) => (
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
              {listProducto.map((option) => (
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
                  checked={selectedAllDispatchs}
                  indeterminate={selectedSomeDispatchs}
                  onChange={handleSelectAllDispatchs}
                />
              </TableCell>
              <TableCell>Cantidad</TableCell>
              <TableCell>Nombre Producto</TableCell>
              <TableCell>Referencia Producto</TableCell>
              <TableCell>Descripción</TableCell>
              <TableCell align="right">Medidas</TableCell>
              <TableCell align="right">Estado</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedDispatchs.map((Dispatch) => {
              const isDispatchSelected = selectedDispatchs.includes(
                Dispatch.id
              );
              return (
                <TableRow
                  hover
                  key={Dispatch.id}
                  selected={isDispatchSelected}
                >
                  <TableCell padding="checkbox">
                    <Checkbox
                      color="primary"
                      checked={isDispatchSelected}
                      onChange={(event: ChangeEvent<HTMLInputElement>) =>
                        handleSelectOneDispatch(event, Dispatch.id)
                      }
                      value={isDispatchSelected}
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
                      {Dispatch.amount}
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
                      {Dispatch.nameProduct}
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
                      {Dispatch.reference}
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
                      {Dispatch.Description}
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
                      {Dispatch.lengthProduct + 'X' + Dispatch.widthProduct}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" noWrap>
                      {Dispatch.units}
                    </Typography>
                  </TableCell>
                  <TableCell align="right">
                    {/* {getStatusLabel(Dispatch.status)} */}
                    {Dispatch.status}
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
          count={filteredDispatchs.length}
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
  Dispatchs: PropTypes.array.isRequired
};

RecentOrdersTable.defaultProps = {
  Dispatchs: []
};

export default RecentOrdersTable;
