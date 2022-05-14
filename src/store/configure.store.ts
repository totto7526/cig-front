import { createStore, applyMiddleware, compose } from 'redux';
import { persistedState, saveState } from './persisted.store';
import reduxThunk from 'redux-thunk';
import reducers from './reducers';

export default function configureStore() {
  const composeEnhancers =
    (window['__REDUX_DEVTOOLS_EXTENSION_COMPOSE__'] as typeof compose) ||
    compose;
  const store = createStore(
    reducers,
    persistedState,
    composeEnhancers(applyMiddleware(reduxThunk))
  );

  store.subscribe(() => {
    saveState({
      //login: store.getState().login,
    });
  });

  return store;
}
