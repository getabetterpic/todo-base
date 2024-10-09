import { Body, Controller, Delete, Post, Res } from '@nestjs/common';
import { FastifyReply } from 'fastify';
import { UsersService } from './users.service';
import { InsertUser } from '../../db/schemas/users';
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async register(
    @Body() user: InsertUser,
    @Res({ passthrough: true }) res: FastifyReply
  ) {
    const resourceId = await this.usersService.register(user);
    res.setCookie('_user', resourceId, {
      httpOnly: true,
      path: '/',
      secure: true,
      sameSite: 'lax',
    });
    return 'success';
  }

  @Post('login')
  async login(
    @Body() user: { email: string; password: string },
    @Res({ passthrough: true }) res: FastifyReply
  ) {
    const resourceId = await this.usersService.login(user);
    res.setCookie('_user', resourceId, {
      httpOnly: true,
      path: '/',
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
    });
    return 'success';
  }

  @Delete()
  async logout(@Res({ passthrough: true }) res: FastifyReply) {
    res.clearCookie('_user');
    return 'success';
  }
}
