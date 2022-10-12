import { Suspense, lazy } from "react";
import { Navigate } from "react-router-dom";
import { RouteObject } from "react-router";

import SidebarLayout from "src/layouts/SidebarLayout";
import BaseLayout from "src/layouts/BaseLayout";

import SuspenseLoader from "src/components/SuspenseLoader";

const Loader = (Component) => (props) =>
  (
    <Suspense fallback={<SuspenseLoader />}>
      <Component {...props} />
    </Suspense>
  );

// Pages

const Overview = Loader(lazy(() => import("src/content/overview")));
const Login = Loader(lazy(() => import("src/content/auth/SignIn")));
const LoginUp = Loader(lazy(() => import("src/content/auth/SignUp")));


const Status404 = Loader(
  lazy(() => import("src/content/pages/Status/Status404"))
);
const Status500 = Loader(
  lazy(() => import("src/content/pages/Status/Status500"))
);
const StatusComingSoon = Loader(
  lazy(() => import("src/content/pages/Status/ComingSoon"))
);
const StatusMaintenance = Loader(
  lazy(() => import("src/content/pages/Status/Maintenance"))
);

const routesNA: RouteObject[] = [
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
        element: <StatusComingSoon />
      }
    ]
  }
];

export default routesNA;
