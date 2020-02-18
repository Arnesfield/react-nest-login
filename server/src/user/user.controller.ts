import { Controller, UseGuards, Get, Param, Put, Delete } from '@nestjs/common';
import { UserService } from './user.service';
import { RestController } from '../rest/rest.controller';
import { User } from './user.entity';
import { UserExistsGuard } from './user.guard';
import { UpdateUserDto } from './dto/update-user-dto';
import { CreateUserDto } from './dto/create-user-dto';

@Controller('users')
export class UserController extends RestController<
  User,
  CreateUserDto,
  UpdateUserDto
> {
  constructor(private readonly userService: UserService) {
    super(userService);
  }

  @Get(':id')
  @UseGuards(UserExistsGuard)
  async getOne(id: number): Promise<User> {
    return super.getOne(id);
  }

  @Put(':id')
  @UseGuards(UserExistsGuard)
  async update(id: number, dto: UpdateUserDto): Promise<User> {
    return super.update(id, dto);
  }

  @Delete(':id')
  @UseGuards(UserExistsGuard)
  async delete(id: number): Promise<number> {
    return super.delete(id);
  }
}
