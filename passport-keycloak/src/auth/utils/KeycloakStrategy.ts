import { Profile, Strategy } from 'passport-keycloak-oauth2-oidc';
import { PassportStrategy } from '@nestjs/passport';
import { Inject, Injectable } from '@nestjs/common';
import { AuthenticationProvider } from '../auth';
@Injectable()
export class KeycloakStrategy extends PassportStrategy(Strategy, 'keycloak') {
  constructor(
    @Inject('AUTH_SERVICE')
    private readonly authService: AuthenticationProvider,
  ) {
    super({
      realm: 'idlor',
      publicClient: 'false',
      clientID: 'lib',
      clientSecret: 'JY3uU2ZL5dTkJzTNl27KnF4J2877mGCf',
      authServerURL: 'https://pasaporte.laotra.red',
      callbackURL: 'http://localhost:3000/api/auth/redirect',
      scope: ['openid', 'profile', 'email'],
    });
  }

  async validate(accessToken: string, refreshToken: string, profile: Profile) {
    const { username, email, id: keycloakId } = profile;
    const details = {
      username,
      email,
      keycloakId,
      accessToken,
      refreshToken,
    };
    return this.authService.validateUser(details);
  }
}
