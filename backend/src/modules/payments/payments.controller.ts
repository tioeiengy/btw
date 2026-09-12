import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
} from "@nestjs/common";


import { PaymentsService } from "./payments.service";


@Controller("payments")
export class PaymentsController {


  constructor(
    private readonly paymentsService: PaymentsService,
  ) {}



  @Post()
  create(
    @Body() body:any,
  ){

    return this.paymentsService.create(body);

  }



  @Get()
  findAll(){

    return this.paymentsService.findAll();

  }



  @Get(":id")
  findOne(
    @Param("id") id:string,
  ){

    return this.paymentsService.findOne(id);

  }



  @Delete(":id")
  remove(
    @Param("id") id:string,
  ){

    return this.paymentsService.remove(id);

  }

}