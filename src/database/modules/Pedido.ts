import {Column, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {Mesa} from "./Mesa";

@Entity({ name:'pedido'})
export class Pedido{
    @PrimaryGeneratedColumn( { name: '_id' })
    id: number | undefined;

    @Column('varchar', { name: 'momecliente', nullable: true })
    nomecliente: string | undefined;

    @Column('varchar', {name: 'status', nullable: false})
    status: string | undefined;

    @OneToMany(() => Mesa, (mesa) => mesa.id)
    mesa: Mesa | undefined;
}