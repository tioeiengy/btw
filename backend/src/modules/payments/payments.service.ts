import { Injectable } from "@nestjs/common";
import { PrismaService } from "../../prisma/prisma.service";


@Injectable()
export class PaymentsService {


  constructor(
    private readonly prisma: PrismaService,
  ) {}



  async create(data:any){

    return this.prisma.payment.create({
      data:{
        bookingId: data.bookingId,
        amount: data.amount,
        method: data.method,
      },
    });

  }



  async findAll(){

    return this.prisma.payment.findMany({
      include:{
        booking:true,
      },
    });

  }



  async findOne(id:string){

    return this.prisma.payment.findUnique({
      where:{
        id,
      },
      include:{
        booking:true,
      },
    });

  }



  async confirm(id:string){

    const payment = await this.prisma.payment.findUnique({
      where:{
        id,
      },
    });


    if(!payment){
      throw new Error("Payment not found");
    }



    const updatedPayment = await this.prisma.payment.update({
      where:{
        id,
      },
      data:{
        status:"PAID",
      },
    });



    await this.prisma.booking.update({
      where:{
        id: payment.bookingId,
      },
      data:{
        status:"CONFIRMED",
      },
    });



    return updatedPayment;

  }



  async remove(id:string){

    return this.prisma.payment.delete({
      where:{
        id,
      },
    });

  }


}