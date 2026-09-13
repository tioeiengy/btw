import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from "@nestjs/common";

import { DestinationService } from "./destination.service";
import { JwtAuthGuard } from "../auth/guards/jwt-auth.guard";

@Controller("destinations")
export class DestinationController {
  constructor(
    private readonly destinationService: DestinationService,
  ) {}

  // GET /api/v1/destinations
  @Get()
  findAll() {
    return this.destinationService.findAll();
  }

  // GET /api/v1/destinations/:id
  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.destinationService.findOne(id);
  }

  // POST /api/v1/destinations
  @Post()
  @UseGuards(JwtAuthGuard)
  create(@Body() data: any) {
    return this.destinationService.create(data);
  }

  // PATCH /api/v1/destinations/:id
  @Patch(":id")
  @UseGuards(JwtAuthGuard)
  update(
    @Param("id") id: string,
    @Body() data: any,
  ) {
    return this.destinationService.update(id, data);
  }

  // DELETE /api/v1/destinations/:id
  @Delete(":id")
  @UseGuards(JwtAuthGuard)
  remove(@Param("id") id: string) {
    return this.destinationService.remove(id);
  }
}