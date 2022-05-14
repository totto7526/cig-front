import { store } from '../..';

export const getSessionStatus = (): boolean => {
  const state = store.getState();
  return state.auth.inSession;
};

export const getSessionMessage = (): string => {
  const state = store.getState();

  return state.auth.message;
};
