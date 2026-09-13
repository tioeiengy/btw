    import {
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
  MaxLength,
} from "class-validator";

export class CreateBookingDto {
  @IsString()
  @IsNotEmpty()
  @IsUUID()
  destinationId!: string;

  @IsOptional()
  @IsString()
  @MaxLength(1000)
  note?: string;
}