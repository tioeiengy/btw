import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { PrismaService } from "../../prisma/prisma.service";


@Injectable()
export class FavoritesService {


  constructor(
    private readonly prisma: PrismaService,
  ) {}


  /**
   * Loads a favorite and verifies that `userId` owns it. Throws
   * NotFoundException if it doesn't exist, ForbiddenException if it
   * belongs to someone else. Used by remove().
   */
  private async getOwnedFavorite(userId: string, id: string) {

    const favorite = await this.prisma.favorite.findUnique({
      where:{
        id,
      },
    });

    if (!favorite) {
      throw new NotFoundException("Favorite not found");
    }

    if (favorite.userId !== userId) {
      throw new ForbiddenException("You do not have access to this favorite");
    }

    return favorite;

  }



  async create(
    userId: string,
    data: {
      destinationId: string;
    },
  ){

    return this.prisma.favorite.create({
      data:{
        userId,
        destinationId: data.destinationId,
      },
    });

  }



  async findAll(userId: string){

    return this.prisma.favorite.findMany({
      where: {
        userId,
      },
      include:{
        destination:true,
      },
    });

  }



  async remove(userId: string, id:string){

    await this.getOwnedFavorite(userId, id);

    return this.prisma.favorite.delete({
      where:{
        id,
      },
    });

  }


}