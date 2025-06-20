import { Test, TestingModule } from '@nestjs/testing';
import { MenuIngredientsController } from './menu-ingredients.controller';
import { MenuIngredientsService } from './menu-ingredients.service';

describe('MenuIngredientsController', () => {
  let controller: MenuIngredientsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MenuIngredientsController],
      providers: [MenuIngredientsService],
    }).compile();

    controller = module.get<MenuIngredientsController>(MenuIngredientsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
