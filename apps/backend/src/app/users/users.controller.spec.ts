import { Test, TestingModule } from '@nestjs/testing';
import { FastifyReply } from 'fastify';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

describe('UsersController', () => {
  let controller: UsersController;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let usersService: any;

  beforeEach(async () => {
    usersService = {
      register: jest.fn(),
      login: jest.fn(),
    };
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: UsersService,
          useValue: usersService,
        },
      ],
    }).compile();

    controller = module.get<UsersController>(UsersController);
  });

  describe('register', () => {
    it('should register a user', async () => {
      usersService.register.mockResolvedValue('resourceId');
      const cookieSpy = jest.fn();
      const user = { email: 'test@test.com', password: 'password' };
      const result = await controller.register(user, {
        setCookie: cookieSpy,
      } as unknown as FastifyReply);
      expect(result).toBe('success');
      expect(usersService.register).toHaveBeenCalledWith(user);
      expect(cookieSpy).toHaveBeenCalledWith('_user', 'resourceId', {
        httpOnly: true,
        path: '/',
        secure: 'auto',
        sameSite: 'lax',
      });
    });
  });

  describe('login', () => {
    it('should login a user', async () => {
      usersService.login.mockResolvedValue('resourceId');
      const cookieSpy = jest.fn();
      const user = { email: 'test@test.com', password: 'password' };
      const result = await controller.login(user, {
        setCookie: cookieSpy,
      } as unknown as FastifyReply);
      expect(result).toBe('success');
      expect(usersService.login).toHaveBeenCalledWith(user);
      expect(cookieSpy).toHaveBeenCalledWith('_user', 'resourceId', {
        httpOnly: true,
        path: '/',
        secure: 'auto',
        sameSite: 'lax',
      });
    });
  });

  describe('logout', () => {
    it('should logout a user', async () => {
      const cookieSpy = jest.fn();
      const result = await controller.logout({
        clearCookie: cookieSpy,
      } as unknown as FastifyReply);
      expect(result).toBe('success');
      expect(cookieSpy).toHaveBeenCalledWith('_user');
    });
  });
});
