import { Test, TestingModule } from '@nestjs/testing';
import { MenuIngredientsService } from './menu-ingredients.service';

describe('MenuIngredientsService', () => {
  let service: MenuIngredientsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MenuIngredientsService],
    }).compile();

    service = module.get<MenuIngredientsService>(MenuIngredientsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
