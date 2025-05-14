import { Test, TestingModule } from '@nestjs/testing';
import { ResearchArticlesRepository } from 'src/research-articles/research-articles.repository';
import { Model } from 'mongoose';
import { getModelToken } from '@nestjs/mongoose';
import { ResearchArticle } from 'src/research-articles/entities/research-article.entity';

describe('ResearchArticlesRepository', () => {
  let repository: ResearchArticlesRepository;
  let model: Model<ResearchArticle>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ResearchArticlesRepository,
        {
          provide: getModelToken(ResearchArticle.name),
          useValue: {
            aggregate: jest.fn(),
          },
        },
      ],
    }).compile();

    repository = module.get<ResearchArticlesRepository>(
      ResearchArticlesRepository,
    );
    model = module.get<Model<ResearchArticle>>(
      getModelToken(ResearchArticle.name),
    );
  });

  it('Deberia devolver el recuento del eje tematico', async () => {
    const mockResponse = [
      { _id: 'Axis 1', count: 3 },
      { _id: 'Axis 2', count: 2 },
    ];

    const aggregateSpy = jest
      .spyOn(model, 'aggregate')
      .mockResolvedValue(mockResponse);

    const result = await repository.getThematicAxisCount();

    expect(aggregateSpy).toHaveBeenCalledWith([
      {
        $group: {
          _id: '$primaryThematicAxis',
          count: { $sum: 1 },
        },
      },
    ]);
    expect(result).toEqual(mockResponse);
  });

  it('Deberia devolver la suma total de vistas del articulo', async () => {
    const mockResponse = [{ _id: null, sum: 100 }];

    const aggregateSpy = jest
      .spyOn(model, 'aggregate')
      .mockResolvedValue(mockResponse); // Simulamos la respuesta

    const result = await repository.getArticleViewsSum();

    expect(aggregateSpy).toHaveBeenCalledWith([
      {
        $group: {
          _id: null,
          sum: { $sum: '$counter' },
        },
      },
    ]);
    expect(result).toEqual(mockResponse);
  });
});
