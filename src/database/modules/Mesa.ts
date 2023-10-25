import {Column, Entity, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import { Empresa } from "./Empresa";

@Entity({name:'mesa'})
export class Mesa {
    @PrimaryGeneratedColumn( { name: '_id' })
    id: number | undefined;

    @Column('int', {name:'capacidade', nullable: false})
    capacidade: number | undefined;

    @ManyToOne(() => Empresa)
    empresa: Empresa | undefined;
}