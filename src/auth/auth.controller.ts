import { Body, Controller, Get, Patch, Post, Res, UseGuards, ValidationPipe } from '@nestjs/common';
import { LocalAuthGuard } from './guards/local-auth.guards';
import { CurrentUser } from './strategies/current-user.decorator';
import { User } from 'src/users/schema/user.schema';
import { AuthService } from './auth.service';
import type { Response } from 'express';
import { JwtRefreshAuthGuard } from './guards/jwt-refresh-auth.guards';
import { GoogleAuthGuard } from './guards/google-auth.guard';
import { JwtAuthGuard } from './guards/jwt-auth.guards';
import { ChangePasswordDto } from './dto/change-password.dto';
import { LoginDto } from 'src/users/dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post('login')
  @UseGuards(LocalAuthGuard)
  async login(
    @Body(ValidationPipe) loginDto: LoginDto,
  @CurrentUser() user: User, 
  @Res({ passthrough: true }) response: Response,
) {
  console.log('res')
  await this.authService.login(user, response);
}


  @Post('refresh')
  @UseGuards(JwtRefreshAuthGuard)
  async refreshToken(
    @CurrentUser() user: User, 
    @Res({ passthrough: true }) response: Response,
) {
  console.log('res')
  await this.authService.login(user, response);
  }

  @Get('google')
  @UseGuards(GoogleAuthGuard)
  loginGoogle() {}

  @Get('google/callback')
  @UseGuards(GoogleAuthGuard)
  async googleCallback(
    @CurrentUser() user: User,
    @Res({ passthrough: true }) response: Response,
  ) {
    await this.authService.login(user, response,true);
    
    const html = `
      <!DOCTYPE html>
      <html>
        <head>
          <title>Connexion réussie</title>
          <style>
            body {
              font-family: Arial, sans-serif;
              display: flex;
              flex-direction: column;
              align-items: center;
              justify-content: center;
              height: 100vh;
              margin: 0;
              background-color: #f5f5f5;
            }
            .container {
              text-align: center;
              background: white;
              padding: 2rem;
              border-radius: 8px;
              box-shadow: 0 2px 10px rgba(0,0,0,0.1);
            }
            .success-icon {
              color: #4CAF50;
              font-size: 3rem;
              margin-bottom: 1rem;
            }
            h1 {
              color: #333;
              margin-bottom: 0.5rem;
            }
            p {
              color: #666;
              margin-bottom: 2rem;
            }
            button {
              background-color: #4CAF50;
              color: white;
              padding: 12px 24px;
              border: none;
              border-radius: 4px;
              cursor: pointer;
              font-size: 16px;
              transition: background-color 0.3s;
            }
            button:hover {
              background-color: #45a049;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="success-icon">✓</div>
            <h1>Connexion réussie !</h1>
            <p>Bienvenue <strong>${user.email}</strong></p>
            <button onclick="window.location.href='http://localhost:3001/dashboard'">
              Aller au tableau de bord
            </button>
          </div>
        </body>
      </html>
    `;
    return response.send(html);
  }
  @Patch('change-password')
  @UseGuards(JwtAuthGuard)
  async PasswordReset(
    @CurrentUser() user: User, 
    @Body() body: ChangePasswordDto

  )
  { 
    console.log("yoyoyo")
    //console.log("mot de passe actuel : ", body.currentPassword);
    await this.authService.PasswordReset(user,body.currentPassword,body.newPassword)}
}
