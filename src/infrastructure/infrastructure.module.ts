import { Global, Module } from '@nestjs/common';
import database from './database/database.connection';

@Global()
@Module({
  providers: [
    {
      provide: 'DATABASE',
      useValue: database,
    },
  ],
  exports: ['DATABASE'],
})
export class InfrastructureModule {}
