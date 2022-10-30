import { Card } from '@mui/material';
import { Client} from 'src/models/client';
import RecentOrdersTable from './RecentOrdersTable';
import clienteAxios from  'src/config/axios';
import { useEffect, useState } from 'react';
import { subDays } from 'date-fns';
import { useAuth0 } from '@auth0/auth0-react';

function RecentClientsOrders() {

  const [clients, setClients] = useState()

  const { user, isAuthenticated, getAccessTokenSilently } = useAuth0();


  useEffect(() => {
    (async () => {
      try {
        const token = await getAccessTokenSilently({
          audience: 'htttps://cig/api',
          scope: 'read:cig-vendedor read:cig-cobrador',
        });
        const response = await clienteAxios.get('/api/v1/clientes/con-referencias', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setClients(response.data);
      } catch (e) {
        console.error(e);
      }
    })();
  }, [getAccessTokenSilently, clients])


  return (
    <Card>
      <RecentOrdersTable Clients={clients} />
    </Card>
  );
}

export default RecentClientsOrders;
