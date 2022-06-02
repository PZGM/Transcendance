import { Column, Entity, ManyToOne, OneToOne, PrimaryGeneratedColumn, JoinColumn } from "typeorm";
import { User } from './user'
import { Channel } from "..";

@Entity({ name: 'ban' })
  export class Ban {

    @PrimaryGeneratedColumn()
    id: number 

    @ManyToOne(() => User, {eager: true})
    @JoinColumn()
    user: User;

    @Column({ type: 'timestamptz', nullable: true })
    endOfBan: Date;

    @ManyToOne(() => Channel , channel => channel.ban, {
      onDelete: "CASCADE"
    })
    channel: Channel

    @OneToOne(() => User, {eager: true})
    @JoinColumn()
    banner: User
}