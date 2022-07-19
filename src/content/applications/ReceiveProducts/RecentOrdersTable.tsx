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
import { CryptoReceive, CryptoReceiveStatus } from 'src/models/crypto_order';
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';
import BulkActions from './BulkActions';

import TextField from '@mui/material/TextField';
import AccountCircle from '@mui/icons-material/AccountCircle';


interface RecentOrdersTableProps {
  className?: string;
  CryptoReceives: CryptoReceive[];
}

interface Filters {
  status?: CryptoReceiveStatus;
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





const getStatusLabel = (CryptoReceiveStatus: CryptoReceiveStatus): JSX.Element => {
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

  const { text, color }: any = map[CryptoReceiveStatus];

  return <Label color={color}>{text}</Label>;
};

const applyFilters = (
  CryptoReceives: CryptoReceive[],
  filters: Filters
): CryptoReceive[] => {
  return CryptoReceives.filter((CryptoReceive) => {
    let matches = true;

    if (filters.status && CryptoReceive.status !== filters.status) {
      matches = false;
    }

    return matches;
  });
};

const applyPagination = (
  CryptoReceives: CryptoReceive[],
  page: number,
  limit: number
): CryptoReceive[] => {
  return CryptoReceives.slice(page * limit, page * limit + limit);
};

const RecentOrdersTable: FC<RecentOrdersTableProps> = ({ CryptoReceives }) => {

  const [despacharProducto, setDespacharProducto] = useState({
    empleado:'',
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






  const [selectedCryptoReceives, setSelectedCryptoReceives] = useState<string[]>(
    []
  );
  const selectedBulkActions = selectedCryptoReceives.length > 0;
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

  const handleSelectAllCryptoReceives = (
    event: ChangeEvent<HTMLInputElement>
  ): void => {
    setSelectedCryptoReceives(
      event.target.checked
        ? CryptoReceives.map((CryptoReceive) => CryptoReceive.id)
        : []
    );
  };

  const handleSelectOneCryptoReceive = (
    event: ChangeEvent<HTMLInputElement>,
    CryptoReceiveId: string
  ): void => {
    if (!selectedCryptoReceives.includes(CryptoReceiveId)) {
      setSelectedCryptoReceives((prevSelected) => [
        ...prevSelected,
        CryptoReceiveId
      ]);
    } else {
      setSelectedCryptoReceives((prevSelected) =>
        prevSelected.filter((id) => id !== CryptoReceiveId)
      );
    }
  };

  const handlePageChange = (event: any, newPage: number): void => {
    setPage(newPage);
  };

  const handleLimitChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setLimit(parseInt(event.target.value));
  };

  const filteredCryptoReceives = applyFilters(CryptoReceives, filters);
  const paginatedCryptoReceives = applyPagination(
    filteredCryptoReceives,
    page,
    limit
  );
  const selectedSomeCryptoReceives =
    selectedCryptoReceives.length > 0 &&
    selectedCryptoReceives.length < CryptoReceives.length;
  const selectedAllCryptoReceives =
    selectedCryptoReceives.length === CryptoReceives.length;
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
                  checked={selectedAllCryptoReceives}
                  indeterminate={selectedSomeCryptoReceives}
                  onChange={handleSelectAllCryptoReceives}
                />
              </TableCell>
              <TableCell>Cantidad</TableCell>
              <TableCell>Nombre Producto</TableCell>
              <TableCell>Referencia Producto</TableCell>
              <TableCell align="right">Estado</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedCryptoReceives.map((CryptoReceive) => {
              const isCryptoReceiveSelected = selectedCryptoReceives.includes(
                CryptoReceive.id
              );
              return (
                <TableRow
                  hover
                  key={CryptoReceive.id}
                  selected={isCryptoReceiveSelected}
                >
                  <TableCell padding="checkbox">
                    <Checkbox
                      color="primary"
                      checked={isCryptoReceiveSelected}
                      onChange={(event: ChangeEvent<HTMLInputElement>) =>
                        handleSelectOneCryptoReceive(event, CryptoReceive.id)
                      }
                      value={isCryptoReceiveSelected}
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
                      {CryptoReceive.amount}
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
                      {CryptoReceive.nameProduct}
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
                      {CryptoReceive.reference}
                    </Typography>
                  </TableCell>

                  <TableCell align="right">
                    {getStatusLabel(CryptoReceive.status)}
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
        <Button sx={{ margin: 5, width: '25ch'}} variant="contained">Recibir</Button>
      </div>
      <Box p={2}>
        <TablePagination
          component="div"
          count={filteredCryptoReceives.length}
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
  CryptoReceives: PropTypes.array.isRequired
};

RecentOrdersTable.defaultProps = {
  CryptoReceives: []
};

export default RecentOrdersTable;
