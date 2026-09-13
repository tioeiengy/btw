import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
} from "@nestjs/common";

import { FavoritesService } from "./favorites.service";
import { JwtAuthGuard } from "../auth/guards/jwt-auth.guard";
import { CurrentUser } from "../../common/decorators/current-user.decorator";
import { JwtPayload } from "../auth/types/jwt-payload.interface";
import { CreateFavoriteDto } from "./dto/create-favorite.dto";

@Controller("favorites")
@UseGuards(JwtAuthGuard)
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}

  @Post()
  create(
    @CurrentUser() user: JwtPayload,
    @Body() dto: CreateFavoriteDto,
  ) {
    return this.favoritesService.create(user.sub, {
      destinationId: dto.destinationId,
    });
  }

  @Get()
  findAll(@CurrentUser() user: JwtPayload) {
    return this.favoritesService.findAll(user.sub);
  }

  @Delete(":id")
  remove(
    @CurrentUser() user: JwtPayload,
    @Param("id") id: string,
  ) {
    return this.favoritesService.remove(user.sub, id);
  }
}