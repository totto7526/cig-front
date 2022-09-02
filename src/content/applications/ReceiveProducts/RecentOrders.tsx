import { Card } from '@mui/material';
import {Receive} from 'src/models/crypto_order';
import RecentOrdersTable from './RecentOrdersTable';
import { subDays } from 'date-fns';

function RecentDispatchsOrders() {

  const Receives: Receive[] = [
    {
      id: '1',
      amount: 2,
      nameProduct: 'Cortinas Giraltex',
      status: 'completed',
      reference: 'GHM 5403',
    },
    {
      id: '2',
      amount: 3,
      nameProduct: 'Sanadas Dobles',
      status: 'completed',
      reference: 'Lunatex',
    },
    {
      id: '3',
      amount: 1,
      nameProduct: 'Tohallones',
      status: 'failed',
      reference: 'Casita',
    },
    {
      id: '4',
      amount: 5,
      nameProduct: 'Forros Lavadora',
      status: 'completed',
      reference: 'Lunatex',
    },
    {
      id: '5',
      amount: 2,
      nameProduct: 'Unifaz Doble',
      status: 'pending',
      reference: 'Microfibra',
    }
  ];

  return (
    <Card>
      <RecentOrdersTable Receives={Receives} />
    </Card>
  );
}

export default RecentDispatchsOrders;
