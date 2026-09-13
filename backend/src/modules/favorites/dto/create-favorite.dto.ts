import {
  IsNotEmpty,
  IsString,
  IsUUID,
} from "class-validator";

export class CreateFavoriteDto {
  @IsString()
  @IsNotEmpty()
  @IsUUID()
  destinationId!: string;
}