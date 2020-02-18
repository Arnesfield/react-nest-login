import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '../config/config.module';
import { DatabaseService } from './database.service';

@Module({
  imports: [ConfigModule.forRoot(), TypeOrmModule.forRoot()],
  providers: [DatabaseService]
})
export class DatabaseModule {}
