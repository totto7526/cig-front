import { Card } from '@mui/material';
import {EditRoute} from 'src/models/crypto_order';
import RecentOrdersTable from './RecentOrdersTable';
import { subDays } from 'date-fns';

function RecentDispatchsOrders() {

  const EditRoute : EditRoute[] = [
    {
      id: '1',
      status: 'failed',
      firstName: 'Carlos',
      secondName: 'Segundo',
      firstLastName: 'Martines',
      secondLastName: 'Bedoya',
      routeOrder: 2
    },
    {
      id: '2',
      status: 'completed',
      firstName: 'Carlos',
      secondName: 'Primero',
      firstLastName: 'Martines',
      secondLastName: 'Bedoya',
      routeOrder: 1
    },
    {
      id: '3',
      status: 'completed',
      firstName: 'Carlos',
      secondName: 'Alberto',
      firstLastName: 'Martines',
      secondLastName: 'Bedoya',
      routeOrder: 3
    },
    {
      id: '4',
      status: 'completed',
      firstName: 'Carlos',
      secondName: 'Andres',
      firstLastName: 'Martines',
      secondLastName: 'Bedoya',
      routeOrder: 4
    },
    {
      id: '5',
      status: 'completed',
      firstName: 'Carlos',
      secondName: 'Andres',
      firstLastName: 'Martines',
      secondLastName: 'Bedoya',
      routeOrder: 5
    }
  ];

  // .sort((a, b) => a.routeOrder - b.routeOrder)
  
  return (
    <Card>
      <RecentOrdersTable EditRoute={EditRoute} />
    </Card>
  );
}

export default RecentDispatchsOrders;
