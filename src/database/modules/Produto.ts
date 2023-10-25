import {Column, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {Unique} from "typeorm/browser";

@Entity('produto')
@Unique(["descricao"])
export class Produto{
    @PrimaryGeneratedColumn( { name: '_id' })
    id: number | undefined;

    @Column('varchar', { name:'descricao', nullable: false})
    descricao: string | undefined;

    @Column('boolean', { name:  'manufaturado', nullable: false})
    manufaturado: boolean | undefined;

    @Column('decimal', { name: 'valorunitario', nullable: false})
    valorunitario: number | undefined
}