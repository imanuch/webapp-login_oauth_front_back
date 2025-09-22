  import { IsEmail, IsString, MinLength } from 'class-validator';

  export class LoginDto {
    @IsEmail({}, { message: 'Veuillez entrer un email valide' })
    email: string;

    @IsString({ message: 'Le mot de passe doit être une chaîne' })
    @MinLength(8, { message: 'Le mot de passe est requis' })
    password: string;
  }