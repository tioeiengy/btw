import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Req,
  UseGuards,
} from "@nestjs/common";

import { Request } from "express";

import { BookingsService } from "./bookings.service";

import { JwtAuthGuard } from "../auth/guards/jwt-auth.guard";


@Controller("bookings")
@UseGuards(JwtAuthGuard)
export class BookingsController {


  constructor(
    private readonly bookingsService: BookingsService,
  ) {}



  @Post()
  create(
    @Req() req: Request,
    @Body() body: any,
  ) {

    const user = req.user as any;


    return this.bookingsService.create({

      userId: user.id,

      destinationId: body.destinationId,

      note: body.note,

    });

  }




  @Get()
  findAll(){

    return this.bookingsService.findAll();

  }





  @Get(":id")
  findOne(
    @Param("id") id:string,
  ){

    return this.bookingsService.findOne(id);

  }





  @Delete(":id")
  remove(
    @Param("id") id:string,
  ){

    return this.bookingsService.remove(id);

  }

}