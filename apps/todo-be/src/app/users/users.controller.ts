import { Controller, Delete, Post, Res } from '@nestjs/common';
import { FastifyReply } from 'fastify';
@Controller('users')
export class UsersController {
  @Post()
  register(@Res() res: FastifyReply) {
    res.setCookie('_user', '1234567890', {
      httpOnly: true,
      path: '/',
      secure: true,
      sameSite: 'lax',
    });
    return 'register';
  }

  @Post('login')
  login() {
    return 'login';
  }

  @Delete()
  logout() {
    return 'logout';
  }
}
