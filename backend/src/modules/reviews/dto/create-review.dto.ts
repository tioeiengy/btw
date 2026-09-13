import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
} from "@nestjs/common";

import { ReviewsService } from "./reviews.service";
import { JwtAuthGuard } from "../auth/guards/jwt-auth.guard";
import { CurrentUser } from "../../common/decorators/current-user.decorator";
import { JwtPayload } from "../auth/types/jwt-payload.interface";
import { CreateReviewDto } from "./dto/create-review.dto";

@Controller("reviews")
@UseGuards(JwtAuthGuard)
export class ReviewsController {
  constructor(private readonly reviewsService: ReviewsService) {}

  @Post()
  create(
    @CurrentUser() user: JwtPayload,
    @Body() dto: CreateReviewDto,
  ) {
    return this.reviewsService.create(user.sub, {
      destinationId: dto.destinationId,
      rating: dto.rating,
      comment: dto.comment,
    });
  }

  @Get()
  findAll(@CurrentUser() user: JwtPayload) {
    return this.reviewsService.findAll(user.sub);
  }

  @Get(":id")
  findOne(
    @CurrentUser() user: JwtPayload,
    @Param("id") id: string,
  ) {
    return this.reviewsService.findOne(user.sub, id);
  }

  @Delete(":id")
  remove(
    @CurrentUser() user: JwtPayload,
    @Param("id") id: string,
  ) {
    return this.reviewsService.remove(user.sub, id);
  }
}