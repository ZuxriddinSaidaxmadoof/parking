import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";
import { type } from "os";

export class CreateParkDto {
    @ApiProperty({
        type: String,
        required: true
    })
    @IsString()
    @IsNotEmpty()
    name: string;

    @ApiProperty({
        type: Number,
        required: true
    })
    @IsNumber()
    @IsNotEmpty()
    capacity: number;

    @ApiProperty({
        type: Number,
        required: true
    })
    @IsNotEmpty()
    @IsNumber()
    price: number;
}
