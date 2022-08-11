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
import { CryptoEditRoute, CryptoEditRouteStatus } from 'src/models/crypto_order';
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';
import BulkActions from './BulkActions';

import TextField from '@mui/material/TextField';
import AccountCircle from '@mui/icons-material/AccountCircle';


interface RecentOrdersTableProps {
  className?: string;
  CryptoEditRoute: CryptoEditRoute[];
}

interface Filters {
  status?: CryptoEditRouteStatus;
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





const getStatusLabel = (CryptoEditRouteStatus: CryptoEditRouteStatus): JSX.Element => {
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

  const { text, color }: any = map[CryptoEditRouteStatus];

  return <Label color={color}>{text}</Label>;
};

const applyFilters = (
  CryptoEditRoute: CryptoEditRoute[],
  filters: Filters
): CryptoEditRoute[] => {
  return CryptoEditRoute.filter((CryptoEditRoute) => {
    let matches = true;

    if (filters.status && CryptoEditRoute.status !== filters.status) {
      matches = false;
    }

    return matches;
  });
};

const applyPagination = (
  CryptoEditRoute: CryptoEditRoute[],
  page: number,
  limit: number
): CryptoEditRoute[] => {
  return CryptoEditRoute.slice(page * limit, page * limit + limit);
};

const RecentOrdersTable: FC<RecentOrdersTableProps> = ({ CryptoEditRoute }) => {

  const [editarRuta, setEditarRuta] = useState({
    ciudad:'Marinilla',
    zona:'3',
  })

  
  const onChangeFormulario = e => {
    setEditarRuta({
      ...editarRuta,
      [e.target.name]: e.target.value
    })
  }

  const submitAgregarProducto = (e) => {
    // Se enviaria el cliente al back
    console.log(editarRuta)

    // aqui estaria la respuesta del back
    console.log("Se ha asignado la ruta exitosamente");
  }






  const [selectedCryptoEditRoute, setSelectedCryptoEditRoute] = useState<string[]>(
    []
  );
  const selectedBulkActions = selectedCryptoEditRoute.length > 0;
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

  const handleSelectAllCryptoEditRoute = (
    event: ChangeEvent<HTMLInputElement>
  ): void => {
    setSelectedCryptoEditRoute(
      event.target.checked
        ? CryptoEditRoute.map((CryptoEditRoute) => CryptoEditRoute.id)
        : []
    );
  };

  const handleSelectOneCryptoEditRoute = (
    event: ChangeEvent<HTMLInputElement>,
    CryptoEditRouteId: string
  ): void => {
    if (!selectedCryptoEditRoute.includes(CryptoEditRouteId)) {
      setSelectedCryptoEditRoute((prevSelected) => [
        ...prevSelected,
        CryptoEditRouteId
      ]);
    } else {
      setSelectedCryptoEditRoute((prevSelected) =>
        prevSelected.filter((id) => id !== CryptoEditRouteId)
      );
    }
  };

  const handlePageChange = (event: any, newPage: number): void => {
    setPage(newPage);
  };

  const handleLimitChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setLimit(parseInt(event.target.value));
  };

  const filteredCryptoEditRoutes = applyFilters(CryptoEditRoute, filters);
  const paginatedCryptoEditRoutes = applyPagination(
    filteredCryptoEditRoutes,
    page,
    limit
  );
  const selectedSomeCryptoEditRoutes =
    selectedCryptoEditRoute.length > 0 &&
    selectedCryptoEditRoute.length < CryptoEditRoute.length;
  const selectedAllCryptoEditRoutes =
    selectedCryptoEditRoute.length === CryptoEditRoute.length;
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
            required
            id="outlined-required"
            label="Ciudad"
            color="success"
            name='ciudad'
            value={editarRuta.ciudad}
            onChange={onChangeFormulario}
          />
          <TextField
            required
            id="outlined-required"
            label="Zona"
            color="success"
            name='zona'
            value={editarRuta.zona}
            onChange={onChangeFormulario}
          />
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
                  checked={selectedAllCryptoEditRoutes}
                  indeterminate={selectedSomeCryptoEditRoutes}
                  onChange={handleSelectAllCryptoEditRoute}
                />
              </TableCell>
              <TableCell>Primer Nombre</TableCell>
              <TableCell>Segundo Nombre</TableCell>
              <TableCell>Primer Apellido</TableCell>
              <TableCell>Segundo Apellido</TableCell>
              <TableCell>Orden Ruta</TableCell>
              <TableCell align="right">Estado</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedCryptoEditRoutes.map((CryptoEditRoute) => {
              const isCryptoEditRouteSelected = selectedCryptoEditRoute.includes(
                CryptoEditRoute.id
              );
              return (
                <TableRow
                  hover
                  key={CryptoEditRoute.id}
                  selected={isCryptoEditRouteSelected}
                >
                  <TableCell padding="checkbox">
                    <Checkbox
                      color="primary"
                      checked={isCryptoEditRouteSelected}
                      onChange={(event: ChangeEvent<HTMLInputElement>) =>
                        handleSelectOneCryptoEditRoute(event, CryptoEditRoute.id)
                      }
                      value={isCryptoEditRouteSelected}
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
                      {CryptoEditRoute.firstName}
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
                      {CryptoEditRoute.secondName}
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
                      {CryptoEditRoute.firstLastName}
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
                      {CryptoEditRoute.secondLastName}
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
                      {CryptoEditRoute.routeOrder}
                    </Typography>
                  </TableCell>

                  <TableCell align="right">
                    {getStatusLabel(CryptoEditRoute.status)}
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
        <Button sx={{ margin: 5, width: '25ch'}} variant="contained">Guardar Cambios</Button>
      </div>
      <Box p={2}>
        <TablePagination
          component="div"
          count={filteredCryptoEditRoutes.length}
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
  CryptoEditRoute: PropTypes.array.isRequired
};

RecentOrdersTable.defaultProps = {
  CryptoEditRoute: []
};

export default RecentOrdersTable;
