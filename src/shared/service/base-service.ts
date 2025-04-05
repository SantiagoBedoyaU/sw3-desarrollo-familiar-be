import { FilterQuery } from 'mongoose';
import { BaseRepository } from '../repository/base-repository';

export abstract class BaseService<T, J extends BaseRepository<T>> {
  constructor(private readonly repository: J) {}

  create(data: T) {
    return this.repository.create(data);
  }

  findAll(filter: FilterQuery<T>, limit: number, page: number) {
    return this.repository.findAll(filter, limit, page);
  }

  findOne(id: string) {
    return this.repository.findOne({ _id: id });
  }

  update(id: string, data: T) {
    return this.repository.update({ _id: id }, data);
  }

  remove(id: string) {
    return this.repository.delete({ _id: id });
  }
}
