import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { reviews } from 'src/core/entity/reviews.entity';
import { Repository } from 'typeorm';
import { successRes } from 'src/infrastructure/lib/exeption/success-response';
import { errorCatch } from 'src/infrastructure/lib/exeption/error-catch';

@Injectable()
export class ReviewsService {
  constructor(
    @InjectRepository(reviews)
    private reviewRepository: Repository<reviews>
  ) {}
  async create(createReviewDto: CreateReviewDto) {
    try {
      if (createReviewDto.rating < 1 || createReviewDto.rating > 5) {
        throw new BadRequestException("Rating 1 dan 5 gacha bo'lishi kerak");
      }

      const review = this.reviewRepository.create(createReviewDto);
      const savedReview = await this.reviewRepository.save(review);
      return successRes(savedReview, 201);
    } catch (error) {
      return errorCatch(error);
    }
  }

  async findAll() {
    try {
      const reviews = await this.reviewRepository.find({
        order: { created_at: "DESC" },
      });
      return successRes(reviews, 200);
    } catch (error) {
      return errorCatch(error);
    }
  }

  async findOne(id: string) {
    try {
      const review = await this.reviewRepository.findOneBy({ id });
      if (!review) {
        throw new NotFoundException(`ID si ${id} bo'lgan sharh topilmadi`);
      }
      return successRes(review, 200);
    } catch (error) {
      return errorCatch(error);
    }
  }

  async update(id: string, updateReviewDto: UpdateReviewDto) {
    try {
      const review = await this.findOne(id);
      if (
        updateReviewDto.rating &&
        (updateReviewDto.rating < 1 || updateReviewDto.rating > 5)
      ) {
        throw new BadRequestException("Rating 1 dan 5 gacha bo'lishi kerak");
      }
      await this.reviewRepository.update(id, updateReviewDto);
      return successRes(await this.findOne(id), 200);
    } catch (error) {
      return errorCatch(error);
    }
  }

  async remove(id: string) {
    try {
      const review = await this.findOne(id);
      await this.reviewRepository.delete(id);
      return successRes(null, 200, "Sharh muvaffaqiyatli o'chirildi");
    } catch (error) {
      return errorCatch(error);
    }
  }
}
