import { IsEmail, IsString, MinLength, IsNotEmpty} from 'class-validator';

export class CreateUserDto {
    // Email
    @IsEmail()
    @IsNotEmpty()
    email: string;

    // First Name
    @IsString()
    @IsNotEmpty()
    @MinLength(2)
    firstName: string;

    // Last Name
    @IsString()
    @IsNotEmpty()
    @MinLength(2)
    lastName: string;

    // Password
    @IsString()
    @MinLength(6)
    password: string;
}