import { Column, Entity, ManyToOne, OneToOne, JoinColumn, PrimaryGeneratedColumn } from "typeorm";
import { User } from './user'
import { Channel } from "..";

@Entity({ name: 'mute' })
  export class Mute {

    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => User, {eager: true})
    @JoinColumn()
        user: User;

    @Column({ type: 'timestamptz', nullable: true })
    endOfMute: Date;

    @ManyToOne(() => Channel , channel => channel.mute, {
      onDelete: "CASCADE"
    })
    channel: Channel;

    @ManyToOne(() => User, {eager: true})
    @JoinColumn()
    muter: User;}