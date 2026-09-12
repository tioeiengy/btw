import { Injectable } from "@nestjs/common";
import { PrismaService } from "../../prisma/prisma.service";


@Injectable()
export class FavoritesService {


  constructor(
    private readonly prisma: PrismaService,
  ) {}



  async create(data:any){

    return this.prisma.favorite.create({
      data:{
        userId: data.userId,
        destinationId: data.destinationId,
      },
    });

  }



  async findAll(){

    return this.prisma.favorite.findMany({
      include:{
        destination:true,
      },
    });

  }



  async remove(id:string){

    const favorite = await this.prisma.favorite.findUnique({
      where:{
        id,
      },
    });


    if(!favorite){

      return {
        success:false,
        message:"Favorite not found",
      };

    }



    await this.prisma.favorite.delete({
      where:{
        id,
      },
    });



    return {
      success:true,
      message:"Favorite deleted successfully",
    };

  }


}