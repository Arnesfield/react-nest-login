import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult, FindConditions } from 'typeorm';
import { User } from './user.entity';
import { CreateUserDto } from './dto/create-user-dto';
import { UpdateUserDto } from './dto/update-user-dto';
import { IRestService } from '../rest/rest-service.interface';

@Injectable()
export class UserService
  implements IRestService<User, CreateUserDto, UpdateUserDto> {
  @InjectRepository(User) private readonly userRepository: Repository<User>;

  async checkExists(id: number): Promise<boolean> {
    const exists = !!(await this.getOne(id));
    if (!exists) {
      throw new NotFoundException('User not found.');
    }
    return exists;
  }

  async getAll(): Promise<User[]> {
    // test
    // await this.userRepository.insert(await createUsers());
    return this.userRepository.find({ deletedAt: null });
  }

  async getOne(id: number): Promise<User> {
    return this.userRepository.findOne({ id, deletedAt: null });
  }

  async getOneWhere(where?: FindConditions<User>): Promise<User> {
    return this.userRepository.findOne({ ...where, deletedAt: null });
  }

  async create(dto: CreateUserDto): Promise<User> {
    const user: User = this.userRepository.create(dto);
    return this.userRepository.save(user);
  }

  async update(id: number, dto: UpdateUserDto): Promise<User> {
    // remove dates from userDto
    const { createdAt, updatedAt, deletedAt, ...newDto } = dto as User;
    await this.userRepository.update(id, newDto);
    return this.getOne(id);
  }

  async delete(id: number): Promise<number> {
    const result: UpdateResult = await this.userRepository.update(id, {
      deletedAt: new Date()
    });
    return result.affected;
  }
}
