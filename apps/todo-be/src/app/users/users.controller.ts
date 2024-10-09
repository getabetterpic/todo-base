import { Controller, Delete, Post, Res } from '@nestjs/common';
import { FastifyReply } from 'fastify';
import { UsersService } from './users.service';
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async register(@Res({ passthrough: true }) res: FastifyReply) {
    const userKey = await this.usersService.register();
    res.setCookie('_user', userKey, {
      httpOnly: true,
      path: '/',
      secure: true,
      sameSite: 'lax',
    });
    return 'success';
  }

  @Post('login')
  async login(@Res({ passthrough: true }) res: FastifyReply) {
    const userKey = await this.usersService.login();
    res.setCookie('_user', userKey, {
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
