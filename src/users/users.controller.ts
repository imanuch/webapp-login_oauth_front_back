import { Body, Post, Controller, Get, UseGuards, ValidationPipe } from '@nestjs/common';
import { CreateUserRequest } from './dto/create-user.request';
import { UsersService } from './users.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guards';
import { CurrentUser } from 'src/auth/strategies/current-user.decorator';
import { User } from './schema/user.schema';
import { RequireRole } from 'src/common/decorators/require-role.decorator';
import { RolesGuard } from 'src/common/guards/roles.guards';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  @Post()
  async createUser(@Body(ValidationPipe) request: CreateUserRequest) {
    await this.usersService.create(request);
  }

  @Get()
  @UseGuards(JwtAuthGuard, RolesGuard)
  //@RequireRole('admin')
  async getUsers(@CurrentUser() user: User) {
    console.log(user);
    return this.usersService.getUsers();
  }
}
