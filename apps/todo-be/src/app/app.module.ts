import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { drizzle } from 'drizzle-orm/connect';
import { DATABASE } from './constants';

@Module({
  imports: [UsersModule],
  controllers: [AppController],
  providers: [AppService,
    {
      provide: DATABASE,
      useFactory: async () => {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        return drizzle('node-postgres', process.env.DATABASE_URL!)
      }
    }
  ],
})
export class AppModule {}
