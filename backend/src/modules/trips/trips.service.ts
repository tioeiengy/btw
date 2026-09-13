import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";

import { PrismaService } from "../../prisma/prisma.service";

@Injectable()
export class TripsService {
  constructor(
    private readonly prisma: PrismaService,
  ) {}

  private async getOwnedTrip(userId: string, id: string) {
    const trip = await this.prisma.trip.findUnique({
      where: {
        id,
      },
    });

    if (!trip) {
      throw new NotFoundException("Trip not found");
    }

    if (trip.userId !== userId) {
      throw new ForbiddenException(
        "You do not have access to this trip",
      );
    }

    return trip;
  }

  create(
    userId: string,
    data: {
      title: string;
      description?: string;
      startDate?: string;
      endDate?: string;
    },
  ) {
    return this.prisma.trip.create({
      data: {
        userId,
        title: data.title,
        description: data.description,
        startDate: data.startDate
          ? new Date(data.startDate)
          : null,
        endDate: data.endDate
          ? new Date(data.endDate)
          : null,
      },
    });
  }

  findAll(userId: string) {
    return this.prisma.trip.findMany({
      where: {
        userId,
      },
    });
  }

  async findOne(userId: string, id: string) {
    return this.getOwnedTrip(userId, id);
  }

  async remove(userId: string, id: string) {
    await this.getOwnedTrip(userId, id);

    return this.prisma.trip.delete({
      where: {
        id,
      },
    });
  }
}