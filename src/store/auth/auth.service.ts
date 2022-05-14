import { Credential } from '../../domain/auth/credential';
import BaseService from '../base.service';

class AuthService extends BaseService {
  private routes = {
    signUp: '/v1/security/signup',
    signIn: '/v1/security/signin',
  };

  async login(credentials: Credential) {
    const url = this.routes.signIn;

    return this.postMethod(url, credentials);
  }
}

export default new AuthService();
