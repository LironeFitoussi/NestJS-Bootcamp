import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import { User } from "../auth/user.entity";

@Entity()
export class Report {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    make: string;

    @Column()
    model: string;

    @Column()
    year: number;

    @Column()
    mileage: number;

    @Column()
    longitude: number;

    @Column()
    latitude: number;
 
    @Column()
    price: number;
 
    @Column({ default: false })
    isApproved: boolean;
    
    @ManyToOne(() => User, (user) => user.reports)
    user: User;
}