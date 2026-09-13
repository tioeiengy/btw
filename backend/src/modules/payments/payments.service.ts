import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { PrismaService } from "../../prisma/prisma.service";

@Injectable()
export class PaymentsService {
  constructor(private readonly prisma: PrismaService) {}

  /**
   * Loads a payment together with its booking and verifies that `userId`
   * actually owns the underlying booking. Centralized here so
   * findOne/confirm/remove all enforce the same ownership rule.
   */
  private async getOwnedPayment(userId: string, id: string) {
    const payment = await this.prisma.payment.findUnique({
      where: {
        id,
      },
      include: {
        booking: true,
      },
    });

    if (!payment) {
      throw new NotFoundException("Payment not found");
    }

    if (payment.booking.userId !== userId) {
      throw new ForbiddenException("You do not have access to this payment");
    }

    return payment;
  }

  async create(
    userId: string,
    data: { bookingId: string; amount: number; method?: string },
  ) {
    const booking = await this.prisma.booking.findUnique({
      where: {
        id: data.bookingId,
      },
    });

    if (!booking) {
      throw new NotFoundException("Booking not found");
    }

    if (booking.userId !== userId) {
      throw new ForbiddenException(
        "You can only create a payment for your own booking",
      );
    }

    return this.prisma.payment.create({
      data: {
        bookingId: data.bookingId,
        amount: data.amount,
        method: data.method,
      },
    });
  }

  async findAll(userId: string) {
    return this.prisma.payment.findMany({
      where: {
        booking: {
          userId,
        },
      },
      include: {
        booking: true,
      },
    });
  }

  async findOne(userId: string, id: string) {
    return this.getOwnedPayment(userId, id);
  }

  async confirm(userId: string, id: string) {
    const payment = await this.getOwnedPayment(userId, id);

    if (payment.status !== "PENDING") {
      throw new ForbiddenException(
        `This payment is already ${payment.status.toLowerCase()} and cannot be confirmed again`,
      );
    }

    const updatedPayment = await this.prisma.payment.update({
      where: {
        id,
      },
      data: {
        status: "PAID",
      },
    });

    await this.prisma.booking.update({
      where: {
        id: payment.bookingId,
      },
      data: {
        status: "CONFIRMED",
      },
    });

    return updatedPayment;
  }

  async remove(userId: string, id: string) {
    await this.getOwnedPayment(userId, id);

    return this.prisma.payment.delete({
      where: {
        id,
      },
    });
  }
}