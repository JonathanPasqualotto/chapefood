import {Column, Entity, PrimaryGeneratedColumn, Unique} from 'typeorm';

@Entity({name:'usuario'})
@Unique(["login"])
export class Usuario {
    @PrimaryGeneratedColumn( { name: '_id' })
    id: number | undefined;

    @Column('varchar', { name: 'nome', nullable: false })
    nome: string | undefined;

    @Column('varchar', {name: 'cargo', nullable: false })
    cargo: string | undefined;

    @Column('varchar', {name: 'login', nullable: false })
    login: string | undefined;

    @Column('varchar', { name: 'senha', nullable: false })
    senha: string | undefined;
}