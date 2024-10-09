import { Body, Controller, Delete, Post, Res } from '@nestjs/common';
import { FastifyReply } from 'fastify';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import fastifyCookie from '@fastify/cookie';
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
    this.setUserCookie(res, resourceId);
    return 'success';
  }

  @Post('login')
  async login(
    @Body() user: { email: string; password: string },
    @Res({ passthrough: true }) res: FastifyReply
  ) {
    const resourceId = await this.usersService.login(user);
    this.setUserCookie(res, resourceId);
    return 'success';
  }

  @Delete()
  async logout(@Res({ passthrough: true }) res: FastifyReply) {
    res.clearCookie('_user');
    return 'success';
  }

  private setUserCookie(res: FastifyReply, resourceId: string) {
    res.setCookie('_user', resourceId, {
      httpOnly: true,
      path: '/',
      secure: 'auto',
      sameSite: 'lax',
    });
  }
}
