export interface IRestService<Entity, CreateEntityDto, UpdateEntityDto> {
  getAll(): Promise<Array<Entity>>;
  getOne(id: number): Promise<Entity>;
  create(dto: CreateEntityDto): Promise<Entity>;
  update(id: number, dto: UpdateEntityDto): Promise<Entity>;
  delete(id: number): Promise<number>;
}
