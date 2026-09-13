import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
} from "@nestjs/common";

import { CurrentUser } from "../../common/decorators/current-user.decorator";
import { JwtAuthGuard } from "../auth/guards/jwt-auth.guard";
import { JwtPayload } from "../auth/types/jwt-payload.interface";
import { CreateBookingDto } from "./dto/create-booking.dto";
import { BookingsService } from "./bookings.service";

@Controller("bookings")
@UseGuards(JwtAuthGuard)
export class BookingsController {
  constructor(
    private readonly bookingsService: BookingsService,
  ) {}

  @Post()
  create(
    @CurrentUser() user: JwtPayload,
    @Body() dto: CreateBookingDto,
  ) {
    return this.bookingsService.create(user.sub, {
      destinationId: dto.destinationId,
      note: dto.note,
    });
  }

  @Get()
  findAll(@CurrentUser() user: JwtPayload) {
    return this.bookingsService.findAll(user.sub);
  }

  @Get(":id")
  findOne(
    @CurrentUser() user: JwtPayload,
    @Param("id") id: string,
  ) {
    return this.bookingsService.findOne(user.sub, id);
  }

  @Delete(":id")
  remove(
    @CurrentUser() user: JwtPayload,
    @Param("id") id: string,
  ) {
    return this.bookingsService.remove(user.sub, id);
  }
}