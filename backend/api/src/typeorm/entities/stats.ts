import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'stats' })
export class Stats {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    games: number;

    @Column()
    gameWins: number;

    @Column()
    gameLosses: number;

    @Column()
    victoryRate: number;

    @Column()
    durationMin: number;

    @Column()
    durationMax: number;

    @Column()
    durationAverage: number;

    @Column()
    greaterAvantage: number;

    @Column()
    greaterDisavantage: number;

    @Column()
    averageScore: number;

    @Column()
    averageOponnentScore: number;

    @Column()
    shots: number;

    @Column()
    shotsFailed: number;

    @Column()
    shotsSucceed: number;

    @Column()
    accuracy: number;

    @Column()
    launchs : number;

    @Column()
    eloScore: number;

    @Column()
    rank: number;
}