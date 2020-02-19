import { ForbiddenException } from '@nestjs/common';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn
} from 'typeorm';
import { Exclude } from 'class-transformer';
import * as bcrypt from 'bcryptjs';
import { CreateUserDto } from './dto/create-user-dto';

const TIMESTAMP = 'now()';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  username: string;

  @Exclude()
  @Column()
  password: string;

  // dates

  @CreateDateColumn({
    name: 'created_at',
    type: 'timestamp',
    default: () => TIMESTAMP
  })
  public createdAt: Date;

  @UpdateDateColumn({
    name: 'updated_at',
    type: 'timestamp',
    default: () => TIMESTAMP,
    onUpdate: TIMESTAMP
  })
  public updatedAt: Date;

  @Column({
    name: 'deleted_at',
    type: 'timestamp',
    nullable: true,
    default: null
  })
  public deletedAt: Date;

  private constructor(dto?: CreateUserDto) {
    if (dto) {
      this.username = dto.username;
      this.password = dto.password;
    }
  }

  public async comparePassword(ptPassword: string): Promise<boolean> {
    return await bcrypt.compare(ptPassword, this.password);
  }

  public async hashPassword(): Promise<string> {
    return User.hashPassword(this.password);
  }

  // class methods

  public static async create(dto: CreateUserDto): Promise<User> {
    try {
      dto.password = await User.hashPassword(dto.password);
      return new User(dto);
    } catch (error) {
      throw new ForbiddenException(error || 'Unable to create user.');
    }
  }

  public static async hashPassword(plainPassword: string): Promise<string> {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(plainPassword, salt);
    return hash;
  }
}
