import { Card } from '@mui/material';
import { Client} from 'src/models/crypto_order';
import RecentOrdersTable from './RecentOrdersTable';
import { subDays } from 'date-fns';

function RecentClientsOrders() {

  const Clients: Client[] = [
    {
      id: '1',
      status: 'completed',
      firstName: 'Jesus',
      secondName: 'Sebastian',
      firstLastName: 'perez',
      secondLastName: 'Martinez',
      idNumber: 1036789012,
      phoneNumber: 5321065,
      cityName: 'Marinilla',
      neighborhood: 'Plan 60',
      quota: 300000,
      currency: '$',
      referenceCompleteName: 'Mariana Garcia',
      referencePhoneNumber:1234567,
      relationship:'herman@',
      referenceCompleteNameSecond: 'Sebastian Valega',
      referencePhoneNumberSecond:891011,
      relationshipSecond:'Ti@',
    },
    {
      id: '2',
      status: 'completed',
      firstName: 'Maria',
      secondName: 'Camila',
      firstLastName: 'Gomez',
      secondLastName: 'Restrepo',
      idNumber: 1036123098,
      phoneNumber: 5322309,
      cityName: 'Marinilla',
      neighborhood: 'Maria Auxiliadora',
      quota: 100000,
      currency: '$',
      referenceCompleteName: 'Mariana Garcia',
      referencePhoneNumber:1234567,
      relationship:'herman@',
      referenceCompleteNameSecond: 'Sebastian Valega',
      referencePhoneNumberSecond:891011,
      relationshipSecond:'Ti@',
    },
    {
      id: '3',
      status: 'completed',
      firstName: 'Roberto',
      secondName: 'Carlos',
      firstLastName: 'Ortiz',
      secondLastName: 'Suarez',
      idNumber: 1036567321,
      phoneNumber: 5322309,
      cityName: 'Rionegro',
      neighborhood: 'Centro',
      quota: 250000,
      currency: '$',
      referenceCompleteName: 'Mariana Garcia',
      referencePhoneNumber:1234567,
      relationship:'herman@',
      referenceCompleteNameSecond: 'Sebastian Valega',
      referencePhoneNumberSecond:891011,
      relationshipSecond:'Ti@',
    },
    {
      id: '4',
      status: 'failed',
      firstName: 'Lizeth',
      secondName: 'Dayana',
      firstLastName: 'Naranjo',
      secondLastName: 'Martinez',
      idNumber: 1036019283,
      phoneNumber: 5329988,
      cityName: 'Marinilla',
      neighborhood: 'Plan 60',
      quota: 300000,
      currency: '$',
      referenceCompleteName: 'Mariana Garcia',
      referencePhoneNumber:1234567,
      relationship:'herman@',
      referenceCompleteNameSecond: 'Sebastian Valega',
      referencePhoneNumberSecond:891011,
      relationshipSecond:'Ti@',
    },
    {
      id: '5',
      status: 'completed',
      firstName: 'Carlos',
      secondName: 'Andres',
      firstLastName: 'Martines',
      secondLastName: 'Bedoya',
      idNumber: 9083456,
      phoneNumber: 5480921,
      cityName: 'Marinilla',
      neighborhood: 'Acacias',
      quota: 433000,
      currency: '$',
      referenceCompleteName: 'Mariana Garcia',
      referencePhoneNumber:1234567,
      relationship:'herman@',
      referenceCompleteNameSecond: 'Sebastian Valega',
      referencePhoneNumberSecond:891011,
      relationshipSecond:'Ti@',
    }
  ];

  return (
    <Card>
      <RecentOrdersTable Clients={Clients} />
    </Card>
  );
}

export default RecentClientsOrders;
