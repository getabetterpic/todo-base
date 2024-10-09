import { Module } from '@nestjs/common';
import { drizzle } from 'drizzle-orm/connect';
import { DATABASE } from './constants';

@Module({
  providers: [
    {
      provide: DATABASE,
      useFactory: async () => {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        return drizzle('node-postgres', process.env.DATABASE_URL!);
      },
    },
  ],
  exports: [DATABASE],
})
export class DatabaseModule {}
