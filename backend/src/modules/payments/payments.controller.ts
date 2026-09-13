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

import { PaymentsService } from "./payments.service";
import { JwtAuthGuard } from "../auth/guards/jwt-auth.guard";
import { CurrentUser } from "../../common/decorators/current-user.decorator";
import { JwtPayload } from "../auth/types/jwt-payload.interface";

@Controller("payments")
@UseGuards(JwtAuthGuard)
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @Post()
  create(@CurrentUser() user: JwtPayload, @Body() body: any) {
    return this.paymentsService.create(user.sub, body);
  }

  @Get()
  findAll(@CurrentUser() user: JwtPayload) {
    return this.paymentsService.findAll(user.sub);
  }

  @Get(":id")
  findOne(@CurrentUser() user: JwtPayload, @Param("id") id: string) {
    return this.paymentsService.findOne(user.sub, id);
  }

  @Patch(":id/confirm")
  confirm(@CurrentUser() user: JwtPayload, @Param("id") id: string) {
    return this.paymentsService.confirm(user.sub, id);
  }

  @Delete(":id")
  remove(@CurrentUser() user: JwtPayload, @Param("id") id: string) {
    return this.paymentsService.remove(user.sub, id);
  }
}