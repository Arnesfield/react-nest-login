import { Injectable, Inject } from '@nestjs/common';
import { Connection, Repository, ObjectType, EntitySchema } from 'typeorm';

@Injectable()
export class DatabaseService {
  constructor(@Inject('Connection') public connection: Connection) {}

  async getRepository<Entity>(
    entity: ObjectType<Entity> | EntitySchema<Entity> | string
  ): Promise<Repository<Entity>> {
    return this.connection.getRepository(entity);
  }
}
