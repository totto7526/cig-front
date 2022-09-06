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
import { EditRoute, EditRouteStatus } from 'src/models/crypto_order';
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';
import BulkActions from './BulkActions';

import TextField from '@mui/material/TextField';
import AccountCircle from '@mui/icons-material/AccountCircle';


interface RecentOrdersTableProps {
  className?: string;
  EditRoute: EditRoute[];
}

interface Filters {
  status?: EditRouteStatus;
}


const getStatusLabel = (EditRouteStatus: EditRouteStatus): JSX.Element => {
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

  const { text, color }: any = map[EditRouteStatus];

  return <Label color={color}>{text}</Label>;
};

const applyFilters = (
  EditRoute: EditRoute[],
  filters: Filters
): EditRoute[] => {
  return EditRoute.filter((EditRoute) => {
    let matches = true;

    if (filters.status && EditRoute.status !== filters.status) {
      matches = false;
    }

    return matches;
  });
};

const applyPagination = (
  EditRoute: EditRoute[],
  page: number,
  limit: number
): EditRoute[] => {
  return EditRoute.slice(page * limit, page * limit + limit);
};

const RecentOrdersTable: FC<RecentOrdersTableProps> = ({ EditRoute }) => {

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






  const [selectedEditRoute, setSelectedEditRoute] = useState<string[]>(
    []
  );
  const selectedBulkActions = selectedEditRoute.length > 0;
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

  const handleSelectAllEditRoute = (
    event: ChangeEvent<HTMLInputElement>
  ): void => {
    setSelectedEditRoute(
      event.target.checked
        ? EditRoute.map((EditRoute) => EditRoute.id)
        : []
    );
  };

  const handleSelectOneEditRoute = (
    event: ChangeEvent<HTMLInputElement>,
    EditRouteId: string
  ): void => {
    if (!selectedEditRoute.includes(EditRouteId)) {
      setSelectedEditRoute((prevSelected) => [
        ...prevSelected,
        EditRouteId
      ]);
    } else {
      setSelectedEditRoute((prevSelected) =>
        prevSelected.filter((id) => id !== EditRouteId)
      );
    }
  };

  const handlePageChange = (event: any, newPage: number): void => {
    setPage(newPage);
  };

  const handleLimitChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setLimit(parseInt(event.target.value));
  };

  const filteredEditRoutes = applyFilters(EditRoute, filters);
  const paginatedEditRoutes = applyPagination(
    filteredEditRoutes,
    page,
    limit
  );
  const selectedSomeEditRoutes =
    selectedEditRoute.length > 0 &&
    selectedEditRoute.length < EditRoute.length;
  const selectedAllEditRoutes =
    selectedEditRoute.length === EditRoute.length;
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
                  checked={selectedAllEditRoutes}
                  indeterminate={selectedSomeEditRoutes}
                  onChange={handleSelectAllEditRoute}
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
            {paginatedEditRoutes.map((EditRoute) => {
              const isEditRouteSelected = selectedEditRoute.includes(
                EditRoute.id
              );
              return (
                <TableRow
                  hover
                  key={EditRoute.id}
                  selected={isEditRouteSelected}
                >
                  <TableCell padding="checkbox">
                    <Checkbox
                      color="primary"
                      checked={isEditRouteSelected}
                      onChange={(event: ChangeEvent<HTMLInputElement>) =>
                        handleSelectOneEditRoute(event, EditRoute.id)
                      }
                      value={isEditRouteSelected}
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
                      {EditRoute.firstName}
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
                      {EditRoute.secondName}
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
                      {EditRoute.firstLastName}
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
                      {EditRoute.secondLastName}
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
                      {EditRoute.routeOrder}
                    </Typography>
                  </TableCell>

                  <TableCell align="right">
                    {getStatusLabel(EditRoute.status)}
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
          count={filteredEditRoutes.length}
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
  EditRoute: PropTypes.array.isRequired
};

RecentOrdersTable.defaultProps = {
  EditRoute: []
};

export default RecentOrdersTable;
