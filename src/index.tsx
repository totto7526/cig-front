import App from "./App";
import ReactDOM from "react-dom";
import "src/utils/chart";
import * as serviceWorker from "./serviceWorker";
import { HelmetProvider } from "react-helmet-async";
import { BrowserRouter } from "react-router-dom";
import { Auth0Provider } from "@auth0/auth0-react";

import "nprogress/nprogress.css";
import { SidebarProvider } from "./contexts/SidebarContext";
import configureStore from "./store/configure.store";
import { Provider } from "react-redux";

export const store = configureStore();

ReactDOM.render(
  <Provider store={store}>
    <HelmetProvider>
      <SidebarProvider>
        <BrowserRouter>
          <Auth0Provider
            domain={process.env.REACT_APP_AUTH0_DOMAIN}
            clientId={process.env.REACT_APP_AUTH0_CLIENT_ID}
            redirectUri={window.location.origin}
            audience={process.env.REACT_APP_AUTH0_AUDIENCE}
            scope={process.env.REACT_APP_AUTH0_SCOPE}
          >
            <App />
          </Auth0Provider>
        </BrowserRouter>
      </SidebarProvider>
    </HelmetProvider>
  </Provider>,
  document.getElementById("root")
);

serviceWorker.unregister();
