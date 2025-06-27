import { Module } from '@nestjs/common';
import { IngredientsService } from './ingredients.service';
import { IngredientsController } from './ingredients.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ingredients } from 'src/core/entity';

@Module({
  imports:[TypeOrmModule.forFeature([ingredients])],
  controllers: [IngredientsController],
  providers: [IngredientsService],
})
export class IngredientsModule {}
