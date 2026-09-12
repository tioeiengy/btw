import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
} from "@nestjs/common";

import { FavoritesService } from "./favorites.service";


@Controller("favorites")
export class FavoritesController {


  constructor(
    private readonly favoritesService: FavoritesService,
  ) {}



  @Post()
  create(
    @Body() body:any,
  ){

    return this.favoritesService.create(body);

  }



  @Get()
  findAll(){

    return this.favoritesService.findAll();

  }



  @Delete(":id")
  remove(
    @Param("id") id:string,
  ){

    return this.favoritesService.remove(id);

  }

}