import { FilterQuery, Model, UpdateQuery } from 'mongoose';

export abstract class BaseRepository<T> {
  constructor(private readonly model: Model<T>) {}

  async create(doc: Omit<T, '_id'>): Promise<T | any> {
    const createdDoc = new this.model(doc);
    return createdDoc.save();
  }

  async findOne(filter: FilterQuery<T>): Promise<T | null> {
    return this.model.findOne(filter).exec();
  }

  async findAll(
    filter: FilterQuery<T>,
    limit: number,
    page: number,
  ): Promise<{
    data: T[];
    totalItems: number;
    totalPages: number;
    currentPage: number;
  }> {
    const skip = (page - 1) * limit;
    const [data, totalItems] = await Promise.all([
      this.model.find(filter).limit(limit).skip(skip).exec(),
      this.model.countDocuments(filter).exec(),
    ]);
    const totalPages = Math.ceil(totalItems / limit);
    return {
      data,
      totalItems,
      totalPages,
      currentPage: page,
    };
  }

  async update(
    filter: FilterQuery<T>,
    update: UpdateQuery<T>,
  ): Promise<T | null> {
    return this.model.findOneAndUpdate(filter, update, { new: true }).exec();
  }

  async delete(filter: FilterQuery<T>): Promise<T | null> {
    return this.model.findOneAndDelete(filter).exec();
  }
}
