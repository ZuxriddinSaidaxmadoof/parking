import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsNotEmpty, IsNumber, IsString } from "class-validator";
import { RoleEnum } from "src/common/enums/enum";

export class CreateUserDto {
    @ApiProperty({
        type: String,
        required:true,
        default: "+998*******"
    })
    @IsString()
    @IsNotEmpty()
    phoneNumber: string;

    @ApiProperty({
        type: String,
        required:true
    })
    @IsString()
    @IsNotEmpty()
    password: string

    @ApiProperty({
        type: String,
        required: true,
        default: "client"
    })
    @IsEnum(RoleEnum)
    @IsNotEmpty()
    role: RoleEnum

    @ApiProperty({
        type: Number,
        required: true
    })
    @IsNumber()
    @IsNotEmpty()
    balance: number
}

export class LoginDto {
    @ApiProperty({
        type: String,
        required:true,
        default: "+998*******"
    })
    @IsString()
    @IsNotEmpty()
    phoneNumber: string;

    @ApiProperty({
        type: String,
        required:true
    })
    @IsString()
    @IsNotEmpty()
    password: string
}
