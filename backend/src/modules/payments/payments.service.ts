import { Injectable } from "@nestjs/common";

import { PrismaService } from "../../prisma/prisma.service";


@Injectable()
export class PaymentsService {


  constructor(
    private prisma: PrismaService,
  ) {}



  create(data: any) {

    return this.prisma.payment.create({
      data,
    });

  }



  findAll() {

    return this.prisma.payment.findMany();

  }



  findOne(id: string) {

    return this.prisma.payment.findUnique({
      where: {
        id,
      },
    });

  }



  remove(id: string) {

    return this.prisma.payment.delete({
      where: {
        id,
      },
    });

  }


}