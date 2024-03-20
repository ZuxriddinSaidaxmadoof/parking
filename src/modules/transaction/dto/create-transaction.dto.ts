import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsString } from 'class-validator';

export class CreateTransactionDto {
  @ApiProperty({
    type: String,
  })
  @IsString()
  @IsNotEmpty()
  carIndex: string;

  @ApiProperty({
    type: Number,
  })
  @IsInt()
  @IsNotEmpty()
  parkId: number;
}
