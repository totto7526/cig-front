import { Card } from '@mui/material';
import { CryptoClient, CryptoProduct, CryptoWorker } from 'src/models/crypto_order';
import RecentOrdersTable from './RecentOrdersTable';
import { subDays } from 'date-fns';

function RecentWorkersOrders() {

  const CryptoWorkers: CryptoWorker[] = [
    {
      id: '1',
      status: 'completed',
      firstName: 'Elmer',
      secondName: ' ',
      firstLastName: 'Galvis',
      secondLastName: 'Martinez',
      idNumber: 1036789012,
      phoneNumber: 5321065,
      direction: 'Calle 29 #31-33',
      neighborhood: 'Plan 60',
    },
    {
      id: '2',
      status: 'completed',
      firstName: 'Esneider',
      secondName: 'Duvan',
      firstLastName: 'Alzate',
      secondLastName: 'Castaño',
      idNumber: 1036123098,
      phoneNumber: 5322309,
      direction: 'Carrera 43 #30-33',
      neighborhood: 'Maria Auxiliadora',
    },
    {
      id: '3',
      status: 'completed',
      firstName: 'Israel',
      secondName: 'Antonio',
      firstLastName: 'Giraldo',
      secondLastName: 'Martinez',
      idNumber: 1036567321,
      phoneNumber: 5322309,
      direction: 'Diagonal 43 #44-43',
      neighborhood: 'Centro',
    },
    {
      id: '4',
      status: 'failed',
      firstName: 'Sebastian',
      secondName: ' ',
      firstLastName: 'Galeano',
      secondLastName: 'Bedoya',
      idNumber: 1036019283,
      phoneNumber: 5329988,
      direction: 'Calle 30 # 43A-09',
      neighborhood: 'Plan 60',
    },
    {
      id: '5',
      status: 'completed',
      firstName: 'Carlos',
      secondName: 'Andres',
      firstLastName: 'Lara',
      secondLastName: 'Gonzales',
      idNumber: 9083456,
      phoneNumber: 5480921,
      direction: 'Calle 43 #48-57',
      neighborhood: 'Acacias',
    }
  ];

  return (
    <Card>
      <RecentOrdersTable CryptoWorkers={CryptoWorkers} />
    </Card>
  );
}

export default RecentWorkersOrders;
