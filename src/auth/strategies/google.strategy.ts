import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-google-oauth20';
import { ConfigService } from '@nestjs/config';
import { UsersService } from '../../users/users.service';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy) {
  constructor(
    configService: ConfigService,
    private readonly usersService: UsersService,
  ) {
    super({
      clientID: configService.getOrThrow('GOOGLE_AUTH_CLIENT_ID'),
      clientSecret: configService.getOrThrow('GOOGLE_AUTH_CLIENT_SECRET'),
      callbackURL: configService.getOrThrow('GOOGLE_AUTH_REDIRECT_URI'),
      scope: ['profile', 'email'],
    });
  }
  async validate(_accessToken: string, _refreshToken: string, profile: any) {
    console.log('Profile complet:', profile);

    // Pour voir juste les emails
    // console.log('Emails:', profile.emails);

    // Pour voir le premier email
    // console.log('Premier email:', profile.emails[0]);

    // Pour voir juste la valeur de l'email
    // console.log('Email value:', profile.emails[0].value);

    // Votre code normal continue ici...
    // const email = profile.emails[0].value;
    return this.usersService.getOrCreateUser({
      email: profile.emails[0]?.value,
      password: '',
    });
  }
}
