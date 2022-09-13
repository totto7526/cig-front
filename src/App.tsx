import { useRoutes } from "react-router-dom";
import routes from "./router";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";

import ThemeProvider from "./theme/ThemeProvider";
import { CssBaseline } from "@mui/material";
import { useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import routesSales from "./routerSales";
import routerCollection from "./routerCollection";
import routerNA from "./routerNA";

const App = () => {
  const { user, isAuthenticated, getAccessTokenSilently } = useAuth0();
  let content = useRoutes(routes);

  useEffect(() => {
    (async () => {
      try {
        if (!isAuthenticated) {
          const token = await getAccessTokenSilently({
            audience: "htttps://cig/api",
            scope: "read:cig-admin",
          });
          console.log(token);
          console.log(user);
        }
      } catch (e) {
        console.error(e);
      }
    })();
  }, [getAccessTokenSilently, user]);

  let contentView = () => {
    if (!isAuthenticated || user?.access?.length === 0) {
      content = useRoutes(routerNA);
    } else if (user?.access?.includes("admin-cig")) content = useRoutes(routes);
    else if (user?.access?.includes("cobrador-cig"))
      content = useRoutes(routerCollection);
    else if (user?.access?.includes("vendedor-cig"))
      content = useRoutes(routesSales);
  };

  contentView();

  return (
    <ThemeProvider>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <CssBaseline />
        {content}
      </LocalizationProvider>
    </ThemeProvider>
  );
};
export default App;
