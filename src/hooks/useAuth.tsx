import {
  getSessionMessage,
  getSessionStatus
} from '../store/auth/auth.selector';
import { clearSessionMessage, loginAction } from '../store/auth/auth.action';
import { useDispatch, useSelector } from 'react-redux';
import { Credential } from '../domain/auth/credential';

export const useAuth = () => {
  const userInSession = useSelector(getSessionStatus);
  const sessionMessage = useSelector(getSessionMessage);

  const dispatch = useDispatch();

  const authenticate = (credentials: Credential) => {
    dispatch(loginAction(credentials));
  };

  const errorInSession = () => {
    if (!sessionMessage) return null;

    console.log('display an alert with error message', sessionMessage);
    return (
      <>Tas tas tas </>
      // <IonAlert
      //   isOpen={true}
      //   onDidDismiss={() => dispatch(clearSessionMessage())}
      //   cssClass="my-custom-class"
      //   header={'Error!'}
      //   message={sessionMessage}
      //   buttons={['Dismiss']}
      // />
    );
  };

  return {
    userInSession,
    authenticate,
    errorInSession
  };
};
