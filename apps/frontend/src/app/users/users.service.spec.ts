import { HttpClient } from '@angular/common/http';
import { UsersService } from './users.service';
import { RegisterUserDto } from './register-user.dto';
import { LoginUserDto } from './login-user.dto';

describe('UsersService', () => {
  let service: UsersService;
  let httpClient: HttpClient;

  beforeEach(() => {
    httpClient = {
      post: jest.fn(),
    } as unknown as HttpClient;
    service = new UsersService(httpClient);
  });

  describe('register', () => {
    it('should call httpClient.post with the correct URL and data', () => {
      service.register({
        email: 'test@test.com',
        password: 'password',
      } as RegisterUserDto);

      expect(httpClient.post).toHaveBeenCalledWith('/api/users', {
        email: 'test@test.com',
        password: 'password',
      });
    });
  });

  describe('login', () => {
    it('should call httpClient.post with the correct URL and data', () => {
      service.login({
        email: 'test@test.com',
        password: 'password',
      } as LoginUserDto);

      expect(httpClient.post).toHaveBeenCalledWith('/api/users/login', {
        email: 'test@test.com',
        password: 'password',
      });
    });
  });
});
