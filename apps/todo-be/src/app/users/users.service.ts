import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {
  async register() {
    return 'success';
  }

  async login() {
    return 'success';
  }
}
