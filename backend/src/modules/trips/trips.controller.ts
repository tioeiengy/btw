import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
} from "@nestjs/common";

import { TripsService } from "./trips.service";
import { JwtAuthGuard } from "../auth/guards/jwt-auth.guard";
import { CurrentUser } from "../../common/decorators/current-user.decorator";
import { JwtPayload } from "../auth/types/jwt-payload.interface";
import { CreateTripDto } from "./dto/create-trip.dto";

@Controller("trips")
@UseGuards(JwtAuthGuard)
export class TripsController {
  constructor(private readonly tripsService: TripsService) {}

  @Post()
  create(
    @CurrentUser() user: JwtPayload,
    @Body() dto: CreateTripDto,
  ) {
    return this.tripsService.create(user.sub, {
      title: dto.title,
      description: dto.description,
      startDate: dto.startDate,
      endDate: dto.endDate,
    });
  }

  @Get()
  findAll(@CurrentUser() user: JwtPayload) {
    return this.tripsService.findAll(user.sub);
  }

  @Get(":id")
  findOne(
    @CurrentUser() user: JwtPayload,
    @Param("id") id: string,
  ) {
    return this.tripsService.findOne(user.sub, id);
  }

  @Delete(":id")
  remove(
    @CurrentUser() user: JwtPayload,
    @Param("id") id: string,
  ) {
    return this.tripsService.remove(user.sub, id);
  }
}