import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from './user'
import { Channel } from "..";

@Entity({ name: 'mute' })
  export class Mute {

    @PrimaryGeneratedColumn()
    user: User;

    @Column({ type: 'timestamptz', nullable: true })
    endOfMute: Date;

    @ManyToOne(() => Channel , channel => channel.mute, {
      onDelete: "CASCADE"
    })
    muter: User
}