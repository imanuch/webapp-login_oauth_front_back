import { IsString, MinLength, Matches } from 'class-validator';

export class ChangePasswordDto {
  @IsString({ message: 'Le mot de passe actuel doit être une chaîne' })
  @MinLength(1, { message: 'Le mot de passe actuel est requis' })
  currentPassword: string;

  @IsString({ message: 'Le nouveau mot de passe doit être une chaîne' })
  @MinLength(8, { message: 'Le nouveau mot de passe doit contenir au moins 8 caractères' })
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/, {
    message:
      'Le mot de passe doit contenir au moins: 1 minuscule, 1 majuscule, 1 chiffre, 1 caractère spécial',
  })
  newPassword: string;
}
