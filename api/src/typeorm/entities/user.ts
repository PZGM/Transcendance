import { Column, Entity, PrimaryGeneratedColumn, OneToMany, ManyToMany, JoinTable, ManyToOne, OneToOne, JoinColumn } from "typeorm";
import { Channel } from "./channel";
import { Game } from "./game";
import { Stats } from "./stats";

@Entity({ name: 'users' })
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ name: 'intra_id ', unique: true })
    intraId: string;

    @Column()
    login: string;

    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @Column()
    avatar: string;

    @Column()
    color: string;

    @Column()
    status?: number;

    @ManyToMany(() => User, user => user.friended)
    @JoinTable()
    friends: User[];

    @ManyToMany(() => User, user => user.friends)
    friended: User[];

    @Column({default: false})
    public firstLog: boolean;

    @Column({ nullable: true })
    public twofaSecret?: string;

    @Column({default: false})
    public twofa: boolean;

    @OneToMany(() => Channel, channel => channel.owner, {
        cascade: true,
    })
    ownedChannels: Channel[];

    @ManyToMany(() => Channel, joinedChannels => joinedChannels.users)
    joinedChannels: Channel[];

    @ManyToMany(() => Channel, adminChannels => adminChannels.users)
    adminChannels: Channel[];

    @ManyToMany(() => User)
    @JoinTable()
    blockedUsers: User[];

    @ManyToMany(() => Game, (game) => game.players)
    @JoinTable()
    games: Game[];

    @OneToOne(() => Stats)
    @JoinColumn()
    stats: Stats;

    @Column({ nullable: true })
    rStatus: number;
    @Column({ nullable: true })
    roomId: number;
    @Column('simple-array',{ nullable: true })
    socketIdTab: string[];
}