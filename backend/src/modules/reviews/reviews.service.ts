import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { PrismaService } from "../../prisma/prisma.service";


@Injectable()
export class ReviewsService {


  constructor(
    private readonly prisma: PrismaService,
  ) {}


  /**
   * Fields of User safe to return alongside a review. Excludes
   * passwordHash (and any other credential/auth-internal field) while
   * keeping the rest of the previous response shape unchanged.
   */
  private readonly safeUserSelect = {
    id: true,
    fullName: true,
    email: true,
    phoneNumber: true,
    avatarUrl: true,
    dateOfBirth: true,
    status: true,
    createdAt: true,
    updatedAt: true,
  } as const;


  /**
   * Loads a review and verifies that `userId` owns it. Throws
   * NotFoundException if it doesn't exist, ForbiddenException if it
   * belongs to someone else. Used by findOne/remove so both enforce the
   * same ownership rule.
   */
  private async getOwnedReview(userId: string, id: string) {

    const review = await this.prisma.review.findUnique({
      where:{
        id,
      },
      include:{
        user: {
          select: this.safeUserSelect,
        },
        destination:true,
      },
    });

    if (!review) {
      throw new NotFoundException("Review not found");
    }

    if (review.userId !== userId) {
      throw new ForbiddenException("You do not have access to this review");
    }

    return review;

  }



  async create(
    userId: string,
    data: {
      destinationId: string;
      rating: number;
      comment?: string;
    },
  ){

    return this.prisma.review.create({
      data:{
        userId,
        destinationId: data.destinationId,
        rating: data.rating,
        comment: data.comment,
      },
    });

  }



  async findAll(userId: string){

    return this.prisma.review.findMany({
      where: {
        userId,
      },
      include:{
        user: {
          select: this.safeUserSelect,
        },
        destination:true,
      },
    });

  }



  async findOne(userId: string, id:string){

    return this.getOwnedReview(userId, id);

  }



  async remove(userId: string, id:string){

    await this.getOwnedReview(userId, id);

    return this.prisma.review.delete({
      where:{
        id,
      },
    });

  }


}