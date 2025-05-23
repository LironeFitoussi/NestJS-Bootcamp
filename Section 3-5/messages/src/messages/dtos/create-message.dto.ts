import { IsString, MinLength } from "class-validator";

export class CreateMessageDto {
    @IsString()
    @MinLength(5)
    content: string;
}
