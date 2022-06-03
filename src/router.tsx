import { Suspense, lazy } from 'react';
import { Navigate } from 'react-router-dom';
import { RouteObject } from 'react-router';

import SidebarLayout from 'src/layouts/SidebarLayout';
import BaseLayout from 'src/layouts/BaseLayout';

import SuspenseLoader from 'src/components/SuspenseLoader';

const Loader = (Component) => (props) =>
  (
    <Suspense fallback={<SuspenseLoader />}>
      <Component {...props} />
    </Suspense>
  );

// Pages

const Overview = Loader(lazy(() => import('src/content/overview')));
const Login = Loader(lazy(() => import('src/content/auth/SignIn')));

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
    element: <BaseLayout />,
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
      {
        path: 'crypto',
        element: <Crypto />
      },
      {
        path: 'messenger',
        element: <Messenger />
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
  {
    path: '/admin',
    element: <SidebarLayout />,
    children: [
      {
        path: '',
        element: <Navigate to="/admin/buttons" replace />
      },
      {
        path: 'agregar-cliente',
        element: <ClientAdd/>
      },
      {
        path: 'agregar-empleado',
        element: <WorkerAdd/>
      },
      {
        path: 'agregar-producto',
        element: <ProductAdd/>
      },
      {
        path: 'editar-producto',
        element: <EditProducts />
      },
      {
        path:'editar-cliente',
        element: <EditClients />
      },
      {
        path:'editar-empleado',
        element: <EditWorkers/>
      },
      {
        path: 'buttons',
        element: <Buttons />
      },
      {
        path: 'modals',
        element: <Modals />
      },
      {
        path: 'accordions',
        element: <Accordions />
      },
      {
        path: 'tabs',
        element: <Tabs />
      },
      {
        path: 'badges',
        element: <Badges />
      },
      {
        path: 'tooltips',
        element: <Tooltips />
      },
      {
        path: 'avatars',
        element: <Avatars />
      },
      {
        path: 'cards',
        element: <Cards />
      },
      {
        path: 'forms',
        element: <Forms />
      },
    ]
  }
];

export default routes;
