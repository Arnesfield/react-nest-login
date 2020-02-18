import { Get, Post, Put, Body, Param, Delete } from '@nestjs/common';
import { IRestService } from './rest-service.interface';

export class RestController<Entity, CreateEntityDto, UpdateEntityDto> {
  constructor(
    protected readonly restService: IRestService<
      Entity,
      CreateEntityDto,
      UpdateEntityDto
    >
  ) {}

  @Get()
  async all(): Promise<Array<Entity>> {
    return this.restService.getAll();
  }

  @Get(':id')
  async getOne(@Param('id') id: number): Promise<Entity> {
    return this.restService.getOne(id);
  }

  @Post()
  async create(@Body() dto: CreateEntityDto): Promise<Entity> {
    return this.restService.create(dto);
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() dto: UpdateEntityDto
  ): Promise<Entity> {
    return this.restService.update(id, dto);
  }

  @Delete(':id')
  async delete(@Param('id') id: number): Promise<number> {
    return this.restService.delete(id);
  }
}
