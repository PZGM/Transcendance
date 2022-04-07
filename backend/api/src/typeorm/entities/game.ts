import { Column, CreateDateColumn, Entity, ManyToMany, PrimaryGeneratedColumn, Timestamp } from "typeorm";
import { User } from "..";

@Entity({ name: 'game' })
export class Game {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    duration: number;

    @Column()
    winnerId: number;

    @Column()
    loserId: number;

    @Column()
    winnerScore: number;

    @Column()
    loserScore: number;

    @ManyToMany(() => User, (user) => user.games, {cascade: true})
    players: User[];

    @CreateDateColumn()
    createdDate: Date;
}