import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from './user'
import { Channel } from "..";

@Entity({ name: 'ban' })
  export class Ban {

    @PrimaryGeneratedColumn()
    user: User;

    @Column({ type: 'timestamptz', nullable: true })
    endOfBan: Date;

    @ManyToOne(() => Channel , channel => channel.ban, {
      onDelete: "CASCADE"
    })
    banner: User
}