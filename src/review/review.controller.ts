import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  UseGuards,
} from '@nestjs/common';
import { ReviewService } from './review.service';
import { ReviewCreateDTO, ReviewUpdateDTO } from 'src/types';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@Controller('reviews')
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  @Get(':id')
  async getById(@Param('id') id: string) {
    return this.reviewService.getById(id);
  }

  @Get()
  async getMany() {
    return this.reviewService.getMany();
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() data: ReviewCreateDTO) {
    return this.reviewService.create(data);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  async update(@Param('id') id: string, @Body() data: ReviewUpdateDTO) {
    return this.reviewService.update(data, id);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.reviewService.delete(id);
  }
}
