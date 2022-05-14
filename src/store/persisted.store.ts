import { STORAGE_KEY } from './types';

export const persistedState = (() => {
  try {
    const rawState = localStorage.getItem(STORAGE_KEY);
    if (rawState === null) return undefined;

    const state = JSON.parse(rawState);

    return state;
  } catch (err) {
    return undefined;
  }
})();

export const saveState = (state) => {
  try {
    let stateFilter = JSON.parse(JSON.stringify(state));
    const rawState = JSON.stringify(stateFilter);
    localStorage.setItem(STORAGE_KEY, rawState);
  } catch (err) {
    // Ignore write errors.
  }
};
