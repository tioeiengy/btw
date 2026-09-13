import { IsNotEmpty, IsOptional, IsString, MaxLength } from "class-validator";

export class CreateBookingDto {
  @IsString()
  @IsNotEmpty()
  destinationId!: string;

  @IsOptional()
  @IsString()
  @MaxLength(1000)
  note?: string;
}