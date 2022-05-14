import { Credential } from '../../domain/auth/credential';
import { AuthActionTypes } from './auth.types';
import authService from './auth.service';

export const loginAction = (credentials: Credential) => async (dispatch: any) => {
  try {
    const response = await authService.login(credentials);
    dispatch({ type: AuthActionTypes.SIGN_IN, payload: response });
  } catch (error) {
    dispatch({
      type: AuthActionTypes.USER_ERROR,
      payload: error,
    });
  }
};

export const clearSessionMessage = () => async (dispatch: any) => {
  try {
    dispatch({ type: AuthActionTypes.CLEAR_MESSAGES, payload: null });
  } catch (error) {
    dispatch({
      type: AuthActionTypes.USER_ERROR,
      payload: error,
    });
  }
};
