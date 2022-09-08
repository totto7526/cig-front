import { Suspense, lazy } from 'react';
import { Navigate } from 'react-router-dom';
import { RouteObject } from 'react-router';

import SidebarLayout from 'src/layouts/SidebarLayout';
import BaseLayout from 'src/layouts/BaseLayout';

import SuspenseLoader from 'src/components/SuspenseLoader';
import { element } from 'prop-types';
import CountryOptions from 'src/content/pages/Components/CountryOptions';

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

const Crypto = Loader(lazy(() => import('src/content/dashboards/Crypto')));

// Applications

const Messenger = Loader(
  lazy(() => import('src/content/applications/Messenger'))
);
const Transactions = Loader(
  lazy(() => import('src/content/applications/Transactions'))
);
const UserProfile = Loader(
  lazy(() => import('src/content/applications/Users/profile'))
);
const UserSettings = Loader(
  lazy(() => import('src/content/applications/Users/settings'))
);

// Components

const Buttons = Loader(
  lazy(() => import('src/content/pages/Components/Buttons'))
);
const Modals = Loader(
  lazy(() => import('src/content/pages/Components/Modals'))
);
const Accordions = Loader(
  lazy(() => import('src/content/pages/Components/Accordions'))
);
const Tabs = Loader(lazy(() => import('src/content/pages/Components/Tabs')));
const Badges = Loader(
  lazy(() => import('src/content/pages/Components/Badges'))
);
const Tooltips = Loader(
  lazy(() => import('src/content/pages/Components/Tooltips'))
);
const Avatars = Loader(
  lazy(() => import('src/content/pages/Components/Avatars'))
);
const Cards = Loader(
  lazy(() => import('src/content/pages/Components/Cards'))
);
const Forms = Loader(
  lazy(() => import('src/content/pages/Components/Forms'))
);
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
const PaymentRecord = Loader(
  lazy(()=> import('src/content/pages/Components/PaymentRecord'))
);
const Sales = Loader(
  lazy(()=> import('src/content/pages/Components/RegisterSale'))
);

//Rutas crear rutas
const countryOptions = Loader(
  lazy(() => import('src/content/pages/Components/CountryOptions'))
);
const DepartamentOptions = Loader(
  lazy(() => import('src/content/pages/Components/DepartmentOptions'))
);
const RegionOptions = Loader(
  lazy(() => import('src/content/pages/Components/RegionOptions'))
);
const CityOptions = Loader(
  lazy(() => import('src/content/pages/Components/CityOptions'))
);
const ZoneOptions = Loader(
  lazy(() => import('src/content/pages/Components/ZoneOptions'))
);
const DistrictOptions = Loader(
  lazy(() => import('src/content/pages/Components/DistrictOptions'))
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
        path: '',
        element: <Navigate to="/dashboards/crypto" replace />
      },
      // {
      //   path: 'crypto',
      //   element: <Crypto />
      // },
      {
        path: 'cards',
        element: <Cards />
      },
      // {
      //   path: 'messenger',
      //   element: <Messenger />
      // }
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

  // {
  //   path: '/management',
  //   element: <SidebarLayout />,
  //   children: [
  //     {
  //       path: '',
  //       element: <Navigate to="/management/transactions" replace />
  //     },
  //     {
  //       path: 'transactions',
  //       element: <Transactions />
  //     },
  //     {
  //       path: 'profile',
  //       children: [
  //         {
  //           path: '',
  //           element: <Navigate to="details" replace />
  //         },
  //         {
  //           path: 'details',
  //           element: <UserProfile />
  //         },
  //         {
  //           path: 'settings',
  //           element: <UserSettings />
  //         }
  //       ]
  //     }
  //   ]
  // },
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
        ]
      }
    ]
  },

  {
    path: '/crearRuta',
    element:<BaseLayout/>,
    children:[
      {
        path:'pais',
        element:<CountryOptions/>
      },
      {
        path:'departamento',
        element:<DepartamentOptions/>
      },
      {
        path:'region',
        element:<RegionOptions/>
      },
      {
        path:'city',
        element:<CityOptions/>
      },
      {
        path:'zone',
        element:<ZoneOptions/>
      },
      {
        path:'district',
        element:<DistrictOptions/>
      },
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
        path: 'transactions',
        element: <Transactions />
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
  // {
  //   path: '/admin',
  //   element: <SidebarLayout />,
  //   children: [
  //     {
  //       path: '',
  //       element: <Navigate to="/admin/buttons" replace />
  //     },
  //     {
  //       path: 'buttons',
  //       element: <Buttons />
  //     },
  //     {
  //       path: 'modals',
  //       element: <Modals />
  //     },
  //     {
  //       path: 'accordions',
  //       element: <Accordions />
  //     },
  //     {
  //       path: 'tabs',
  //       element: <Tabs />
  //     },
  //     {
  //       path: 'badges',
  //       element: <Badges />
  //     },
  //     {
  //       path: 'tooltips',
  //       element: <Tooltips />
  //     },
  //     {
  //       path: 'avatars',
  //       element: <Avatars />
  //     },
  //     
  //     {
  //       path: 'forms',
  //       element: <Forms />
  //     },
  //   ]
  // }
];

export default routes;
