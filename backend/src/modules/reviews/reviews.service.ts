import { Injectable } from "@nestjs/common";
import { PrismaService } from "../../prisma/prisma.service";


@Injectable()
export class ReviewsService {


  constructor(
    private readonly prisma: PrismaService,
  ) {}



  async create(data:any){

    return this.prisma.review.create({
      data:{
        userId: data.userId,
        destinationId: data.destinationId,
        rating: data.rating,
        comment: data.comment,
      },
    });

  }



  async findAll(){

    return this.prisma.review.findMany({
      include:{
        user:true,
        destination:true,
      },
    });

  }



  async findOne(id:string){

    return this.prisma.review.findUnique({
      where:{
        id,
      },
      include:{
        user:true,
        destination:true,
      },
    });

  }



  async remove(id:string){

    return this.prisma.review.delete({
      where:{
        id,
      },
    });

  }


}