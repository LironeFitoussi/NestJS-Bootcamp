import { IsEmail, IsNotEmpty } from 'class-validator';

export class LogUserDto {
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsNotEmpty()
    password: string;
}