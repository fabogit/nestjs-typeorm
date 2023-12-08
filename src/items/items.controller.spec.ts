import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { EntityManager } from 'typeorm';
import { ItemsController } from './items.controller';
import { ItemsService } from './items.service';
import { Item } from './entities/item.entity';

describe('ItemsController', () => {
  let controller: ItemsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ItemsController],
      providers: [
        ItemsService,
        {
          provide: getRepositoryToken(Item),
          useValue: {
            find: jest.fn(),
          },
        },
        {
          provide: EntityManager,
          useValue: {},
        },
      ],
    }).compile();

    controller = module.get<ItemsController>(ItemsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
