import { Body, Post, Controller, Get, UseGuards } from '@nestjs/common';
import { CreateUserRequest } from './dto/create-user.request';
import { UsersService } from './users.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guards';
import { CurrentUser } from 'src/auth/strategies/current-user.decorator';
import { User } from './schema/user.schema';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  @Post()
  async createUser(@Body() request: CreateUserRequest) {
    await this.usersService.create(request);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  async getUsers(
    @CurrentUser() user: User
  ) {
    console.log(user);
    return this.usersService.getUsers();
  }
}
