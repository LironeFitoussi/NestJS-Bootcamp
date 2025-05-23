import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { Report } from "../reports/report.entity";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    email: string;

    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @Column()
    password: string;

    @Column({ default: false })
    isVerified: boolean;

    @Column({ default: false })
    isAdmin: boolean;
    
    @OneToMany(() => Report, (report) => report.user)
    reports: Report[];
}
