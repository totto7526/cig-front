import { ErrorResponse } from '../../domain/shared/errorResponse';
import { AuthActionTypes } from './auth.types';

const initialState = {
  inSession: false,
  message: '',
};

export default (state = initialState, action) => {
  switch (action.type) {
    case AuthActionTypes.SIGN_IN:
      return {
        ...state,
        inSession: action.payload,
      };
    case AuthActionTypes.USER_ERROR:
      const error = action.payload as ErrorResponse;
      return {
        ...state,
        message: error.body,
        status: error.status,
        header: error.header,
      };
    case AuthActionTypes.CLEAR_MESSAGES:
      return {
        ...state,
        message: '',
        status: null,
        header: null,
      };
    default:
      return state;
  }
};
