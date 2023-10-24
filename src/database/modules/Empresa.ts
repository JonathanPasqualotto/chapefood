import {Column, Entity, Index, PrimaryGeneratedColumn} from 'typeorm'

@Entity({name:'empresa'})
export class Empresa {
    @PrimaryGeneratedColumn( { name: '_id' })
    id: number | undefined;

    @Column('varchar', {name: 'nome', nullable: false })
    nome: string | undefined;
}
