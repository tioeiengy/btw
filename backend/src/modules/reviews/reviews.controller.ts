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


@Controller("reviews")
@UseGuards(JwtAuthGuard)
export class ReviewsController {


  constructor(
    private readonly reviewsService: ReviewsService,
  ) {}



  @Post()
  create(
    @CurrentUser() user: JwtPayload,
    @Body() body:any,
  ){

    return this.reviewsService.create(user.sub, {
      destinationId: body.destinationId,
      rating: body.rating,
      comment: body.comment,
    });

  }



  @Get()
  findAll(
    @CurrentUser() user: JwtPayload,
  ){

    return this.reviewsService.findAll(user.sub);

  }



  @Get(":id")
  findOne(
    @CurrentUser() user: JwtPayload,
    @Param("id") id:string,
  ){

    return this.reviewsService.findOne(user.sub, id);

  }



  @Delete(":id")
  remove(
    @CurrentUser() user: JwtPayload,
    @Param("id") id:string,
  ){

    return this.reviewsService.remove(user.sub, id);

  }

}