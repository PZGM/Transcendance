import { Column, Entity, ManyToMany, PrimaryGeneratedColumn, Timestamp } from "typeorm";
import { User } from "..";

@Entity({ name: 'game' })
export class Game {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    duration: number;

    @ManyToMany(() => User, (user) => user.games)
    players: User[];

    @Column({ type: 'time' })
    timeOnly: string;
 
    @Column({ type: 'date' })
    dateOnly: string;
}