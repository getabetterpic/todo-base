import { HttpClient } from '@angular/common/http';
import { RegisterUserDto } from './register-user.dto';
import { LoginUserDto } from './login-user.dto';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  constructor(private http: HttpClient) {}

  register(user: RegisterUserDto) {
    return this.http.post<string>('/api/users', user);
  }

  login(user: LoginUserDto) {
    return this.http.post<string>('/api/users/login', user);
  }
}
