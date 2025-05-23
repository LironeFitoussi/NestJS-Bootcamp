import { IsNotEmpty} from 'class-validator';

export class CreateReportDto {
    // Make 
    @IsNotEmpty()
    make: string;

    // Model
    @IsNotEmpty()
    model: string;

    // Year
    @IsNotEmpty()
    year: number;

    // Mileage
    @IsNotEmpty()
    mileage: number;

    // Longitude
    @IsNotEmpty()
    longitude: number;

    // Latitude
    @IsNotEmpty()
    latitude: number;

    // Price
    @IsNotEmpty()
    price: number;
}
