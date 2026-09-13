import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";

import { PrismaService } from "../../prisma/prisma.service";

@Injectable()
export class BookingsService {
  constructor(
    private readonly prisma: PrismaService,
  ) {}

  private async getOwnedBooking(
    userId: string,
    id: string,
  ) {
    const booking = await this.prisma.booking.findUnique({
      where: {
        id,
      },
      include: {
        user: {
          select: {
            id: true,
            email: true,
            fullName: true,
            phoneNumber: true,
            avatarUrl: true,
            dateOfBirth: true,
            createdAt: true,
            updatedAt: true,
          },
        },
        destination: true,
      },
    });

    if (!booking) {
      throw new NotFoundException("Booking not found");
    }

    if (booking.userId !== userId) {
      throw new ForbiddenException(
        "You do not have access to this booking",
      );
    }

    return booking;
  }

  async create(
    userId: string,
    data: {
      destinationId: string;
      note?: string;
    },
  ) {
    const destination = await this.prisma.destination.findUnique({
      where: {
        id: data.destinationId,
      },
    });

    if (!destination) {
      throw new NotFoundException("Destination not found");
    }

    return this.prisma.booking.create({
      data: {
        userId,
        destinationId: data.destinationId,
        note: data.note,
      },
      include: {
        user: {
          select: {
            id: true,
            email: true,
            fullName: true,
            phoneNumber: true,
            avatarUrl: true,
            dateOfBirth: true,
            createdAt: true,
            updatedAt: true,
          },
        },
        destination: true,
      },
    });
  }

  async findAll(userId: string) {
    return this.prisma.booking.findMany({
      where: {
        userId,
      },
      include: {
        user: {
          select: {
            id: true,
            email: true,
            fullName: true,
            phoneNumber: true,
            avatarUrl: true,
            dateOfBirth: true,
            createdAt: true,
            updatedAt: true,
          },
        },
        destination: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  }

  async findOne(
    userId: string,
    id: string,
  ) {
    return this.getOwnedBooking(userId, id);
  }

  async remove(
    userId: string,
    id: string,
  ) {
    await this.getOwnedBooking(userId, id);

    return this.prisma.booking.delete({
      where: {
        id,
      },
    });
  }
}