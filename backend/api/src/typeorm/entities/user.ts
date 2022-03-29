import { Column, Entity, PrimaryGeneratedColumn, OneToMany, ManyToMany, JoinTable } from "typeorm";
import { Channel } from "./channel";
import { Game } from "./game";

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
    img_url: string;

    @Column()
    status?: number;

    @Column("int", {array:true, default: []})
    friends: number[];

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

    @ManyToMany(() => Game, (game) => game.players)
    @JoinTable()
    games: Game[];
}