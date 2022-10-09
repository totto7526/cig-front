import { Suspense, lazy } from 'react';
import { Navigate } from 'react-router-dom';
import { RouteObject } from 'react-router';

import SidebarLayout from 'src/layouts/SidebarLayout';
import BaseLayout from 'src/layouts/BaseLayout';

import SuspenseLoader from 'src/components/SuspenseLoader';
import { element } from 'prop-types';
import CountryOptions from 'src/content/pages/Components/CreateRuteOptions';
import { useAuth0 } from "@auth0/auth0-react";

const Loader = (Component) => (props) =>
  (
    <Suspense fallback={<SuspenseLoader />}>
      <Component {...props} />
    </Suspense>
  );

// Pages

const Overview = Loader(lazy(() => import('src/content/overview')));
const Login = Loader(lazy(() => import('src/content/auth/SignIn')));
const LoginUp = Loader(lazy(() => import('src/content/auth/SignUp')));

// Dashboards
const Cards = Loader(
  lazy(() => import('src/content/dashboards/Cards'))
);
// Applications
const UserProfile = Loader(
  lazy(() => import('src/content/applications/Users/profile'))
);
const UserSettings = Loader(
  lazy(() => import('src/content/applications/Users/settings'))
);

// Components


const ClientAdd = Loader(
  lazy(() => import('src/content/pages/Components/ClientAdd'))
);
const WorkerAdd = Loader(
  lazy(()=> import('src/content/pages/Components/WorkerAdd'))
);
const ProductAdd = Loader(
  lazy(()=> import('src/content/pages/Components/ProductAdd'))
);
const EditProducts = Loader(
  lazy(() => import('src/content/applications/EditProducts'))
);
const EditClients = Loader(
  lazy(() => import('src/content/applications/EditClients'))
);
const EditWorkers = Loader(
  lazy(() => import('src/content/applications/EditWorker'))
);
const Liquidateroute = Loader(
  lazy(() => import('src/content/pages/Components/Liquidateroute'))
);
const AssignRoute = Loader(
  lazy(() => import('src/content/pages/Components/AssignRoute'))
);
const DispatchProducts = Loader(
  lazy(() => import('src/content/applications/DispatchProducts'))
);
const ReceiveProducts = Loader(
  lazy(() => import('src/content/applications/ReceiveProducts'))
);
const RouteOptions = Loader(
  lazy(() => import('src/content/pages/Components/RouteOptions'))
);
const EditRoute = Loader(
  lazy(()=> import('src/content/applications/EditRoute'))
);



//TRANSACCIONES

const PaymentRecord = Loader(
  lazy(()=> import('src/content/pages/Components/PaymentRecord'))
);
const Sales = Loader(
  lazy(()=> import('src/content/pages/Components/RegisterSale'))
);

//Rutas crear rutas
const CreateRuteOptions = Loader(
  lazy(() => import('src/content/pages/Components/CreateRuteOptions'))
);

const CreateDistrict = Loader(
  lazy(() => import('src/content/pages/Components/CreateDistrict'))
);



// Status

const Status404 = Loader(
  lazy(() => import('src/content/pages/Status/Status404'))
);
const Status500 = Loader(
  lazy(() => import('src/content/pages/Status/Status500'))
);
const StatusComingSoon = Loader(
  lazy(() => import('src/content/pages/Status/ComingSoon'))
);
const StatusMaintenance = Loader(
  lazy(() => import('src/content/pages/Status/Maintenance'))
);



const routes: RouteObject[] = [
  {
    path: '/',
    element: <BaseLayout/>,
    children: [
      {
        path: '',
        element: <Overview />
      },
      {
        path: 'overview',
        element: <Navigate to="/" replace />
      },
      {
        path: 'sign-in',
        element: <Login />
      },
      {
        path: 'sign-up',
        element: <LoginUp />
      },
      {
        path: '/status',
        children: [
          {
            path: '',
            element: <Navigate to="404" replace />
          },
          {
            path: '404',
            element: <Status404 />
          },
          {
            path: '500',
            element: <Status500 />
          },
          {
            path: 'maintenance',
            element: <StatusMaintenance />
          },
          {
            path: 'coming-soon',
            element: <StatusComingSoon />
          }
        ]
      },
      {
        path: '*',
        element: <Status404 />
      }
    ]
  },
  {
    path: '/dashboards',
    element: <SidebarLayout />,
    children: [
      {
        path: 'cards',
        element: <Cards />
      }
    ]
  },
  {
    path: '/empleados',
    element: <SidebarLayout />,
    children: [
      {
        path: 'gestion_empleados',
        children: [
          {
            path: 'agregar-empleados',
            element: <WorkerAdd/>
          },
          {
            path:'editar-empleados',
            element: <EditWorkers/>
          },
        ]
      }
    ]
  },

  {
    path: '/productos',
    element: <SidebarLayout />,
    children: [
      {
        path: 'gestion_productos',
        children:[
          {
            path: 'agregar-productos',
            element: <ProductAdd/>
          },
          {
            path: 'editar-productos',
            element: <EditProducts />
          },
        ]
      }
    ] 
  },

   {
     path: '/management',
     element: <SidebarLayout />,
     children: [
       {
         path: '',
         element: <Navigate to="/management/transactions" replace />
       },
       {
         path: 'profile',
         children: [
           {
             path: '',
             element: <Navigate to="details" replace />
           },
           {
             path: 'details',
             element: <UserProfile />
           },
           {
             path: 'settings',
             element: <UserSettings />
           }
         ]
       }
     ]
   },
  {
    path: '/clientes',
    element: <SidebarLayout />,
    children: [
      {
        path: 'gestion_clientes',
        children:[
          {
            path: 'agregar-clientes',
            element: <ClientAdd/>
          },
          {
            path:'editar-clientes',
            element: <EditClients />
          },
        ]
      }
    ]
  },

  {
    path: '/transacciones',
    element: <SidebarLayout />,
    children:[
      {
        path: 'gestion_transacciones',
        children:[
          {
            path:'pago-cuotas',
            element: <PaymentRecord/>
          },
          {
            path:'ventas',
            element: <Sales/>
          }
        ]
      }
    ]
  },

  {
    path: '/seguimientoEmpleado',
    element: <SidebarLayout />,
    children: [
      {
        path: 'gestion_seguimiento',
        children:[
          {
            path: 'liquidar-ruta',
            element: <Liquidateroute/>
          },
          {
            path:'asignar-ruta',
            element: <AssignRoute/>
          },
          {
            path:'despachar-productos',
            element: <DispatchProducts/>
          },
          {
            path:'recibir-productos',
            element: <ReceiveProducts/>
          },
        ]
      }
    ]
  },
  {
    path: '/opcionesRuta',
    element: <SidebarLayout />,
    children:[
      {
        path:'gestion_rutas',
        children:[
          {
            path:'opciones-ruta',
            element:<RouteOptions/>
          },
          {
            path:'editar-ruta',
            element:<EditRoute/>
          },
          {
            path:'asignar-barrio',
            element:<CreateDistrict/>
          },
        ]
      }
    ]
  },

  {
    path: '/crearRuta',
    element:<BaseLayout/>,
    children:[
      {
        path:'ruta',
        element:<CreateRuteOptions/>
      }
    ]
  },

  {
    path: '/management',
    element: <SidebarLayout />,
    children: [
      {
        path: '',
        element: <Navigate to="/management/transactions" replace />
      },
      {
        path: 'profile',
        children: [
          {
            path: '',
            element: <Navigate to="details" replace />
          },
          {
            path: 'details',
            element: <UserProfile />
          },
          {
            path: 'settings',
            element: <UserSettings />
          }
        ]
      }
    ]
  },
];

export default routes;
