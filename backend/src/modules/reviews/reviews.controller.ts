import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
} from "@nestjs/common";

import { ReviewsService } from "./reviews.service";


@Controller("reviews")
export class ReviewsController {


  constructor(
    private readonly reviewsService: ReviewsService,
  ) {}



  @Post()
  create(
    @Body() body:any,
  ){

    return this.reviewsService.create(body);

  }



  @Get()
  findAll(){

    return this.reviewsService.findAll();

  }



  @Get(":id")
  findOne(
    @Param("id") id:string,
  ){

    return this.reviewsService.findOne(id);

  }



  @Delete(":id")
  remove(
    @Param("id") id:string,
  ){

    return this.reviewsService.remove(id);

  }

}