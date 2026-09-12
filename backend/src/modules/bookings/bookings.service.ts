import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class BookingsService {

  constructor(
    private prisma: PrismaService,
  ) {}


  create(data: {
    userId: string;
    destinationId: string;
    note?: string;
  }) {

    return this.prisma.booking.create({
      data: {
        userId: data.userId,
        destinationId: data.destinationId,
        note: data.note,
      },
    });

  }



  findAll() {

    return this.prisma.booking.findMany({
      include: {
        user: true,
        destination: true,
      },
    });

  }



  findOne(id: string) {

    return this.prisma.booking.findUnique({
      where: {
        id,
      },
      include: {
        user: true,
        destination: true,
      },
    });

  }



  remove(id: string) {

    return this.prisma.booking.delete({
      where: {
        id,
      },
    });

  }

}