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

    @Column('decimal', { precision: 8, scale: 2 })
    victoryRate: number;

    @Column()
    durationMin: number;

    @Column()
    durationMax: number;

    @Column('decimal', { precision: 8, scale: 2 })
    durationAverage: number;

    @Column()
    winRow: number;

    @Column()
    actualWinRow: number;

    @Column()
    under3min: number;

    @Column()
    golden: number;

    // @Column()
    // greaterAvantage: number;

    // @Column()
    // greaterDisavantage: number;

    // @Column('decimal', { precision: 8, scale: 2 })
    // averageScore: number;

    // @Column('decimal', { precision: 8, scale: 2 })
    // averageOponnentScore: number;

    @Column()
    eloScore: number;

    @Column()
    rank: number;
}