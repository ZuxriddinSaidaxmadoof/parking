import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateCarDto {
    @ApiProperty({
        type: String,
        required: true
    })
    @IsString()
    @IsNotEmpty()
    index: string;
    @ApiProperty({
        type: Number,
        required: true
    })
    @IsNumber()
    @IsNotEmpty()
    owner_id: number;
}
