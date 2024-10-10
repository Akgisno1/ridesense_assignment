import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Bikes{
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    make:string;

    @Column()
    model:string;

    @Column()
    year:number;

    @Column()
    type:string;

    @CreateDateColumn()
    createdAt:Date;

    @UpdateDateColumn()
    updatedAt:Date;

}