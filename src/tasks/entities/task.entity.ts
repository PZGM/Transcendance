import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';

@Entity()
export class Task {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;
    
    @Column({default: false})
    completed: boolean;
    
    @CreateDateColumn({
        name: 'creation_at',
        type:'timestamptz',
        default: () => 'CURRENT_TIMESTAMP',
    })
    creationAT: Date;
}