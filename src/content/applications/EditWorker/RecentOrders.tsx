import { Card } from '@mui/material';
import {Worker } from 'src/models/worker';
import RecentOrdersTable from './RecentOrdersTable';
import clienteAxios from  'src/config/axios';
import { useEffect, useState } from 'react';
import { subDays } from 'date-fns';
import { useAuth0 } from '@auth0/auth0-react';



function RecentWorkersOrders() {

  const { user, isAuthenticated, getAccessTokenSilently } = useAuth0();
  const [workers, setWorkers] = useState()

  useEffect(() => {
    (async () => {
      try {
        const token = await getAccessTokenSilently({
          audience: 'htttps://cig/api',
          scope: 'read:cig-admin',
        });
        const response = await clienteAxios.get('/api/v1/trabajadores', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setWorkers(await response.data);
      } catch (e) {
        console.error(e);
      }
    })();
  }, [getAccessTokenSilently, workers])
  

  return (

    isAuthenticated && (
      <>
    <Card>
      <RecentOrdersTable Workers={workers} />
    </Card>
    </>
    )
  );
}

export default RecentWorkersOrders;
