import {
  BadRequestException,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { DATABASE } from '../constants';
import { eq } from 'drizzle-orm';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import { InsertUser, users } from '../../db/schemas/users';
import bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(@Inject(DATABASE) private readonly db: NodePgDatabase) {}

  async register(user: InsertUser) {
    try {
      user.password = await bcrypt.hash(user.password, 10);
      const result = await this.db
        .insert(users)
        .values(user)
        .returning({ resourceId: users.resourceId });
      return result[0].resourceId;
    } catch (error) {
      throw new BadRequestException({ error });
    }
  }

  async login(user: { email: string; password: string }) {
    try {
      const result = await this.db
        .select()
        .from(users)
        .where(eq(users.email, user.email));
      if (result.length === 0) {
        throw new UnauthorizedException('User not found');
      }
      const isMatch = await bcrypt.compare(user.password, result[0].password);
      if (!isMatch) {
        throw new UnauthorizedException('User not found');
      }
      return result[0].resourceId;
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (_) {
      throw new UnauthorizedException('User not found');
    }
  }
}
