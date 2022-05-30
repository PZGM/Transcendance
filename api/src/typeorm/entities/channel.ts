import { Column, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { IsOptional } from "class-validator";
import { Chat } from "./chat";
import { User } from './user'
import { Mute } from "./mutedUser";
import { Ban } from "./BannedUser";
  
  @Entity({ name: 'channel' })
  export class Channel {

    @PrimaryGeneratedColumn()
    id: number;
  
    @Column({ length: 50, unique: true })
    name: string;
  
    @IsOptional()
    @ManyToOne(() => User, owner => owner.ownedChannels, {
      onDelete: "CASCADE", nullable: true
    })
    owner: User;
  
    /* public, private, protected */
    @Column({ default: "public" })
    visibility: string
  
    @IsOptional()
    @Column({ nullable: true })
    password: string;
  
    @ManyToMany(() => User, user => user.joinedChannels, {eager: true})
    @JoinTable()
    users: User[];

    @ManyToMany(() => User, user => user.adminChannels)
    @JoinTable()
    admin: User[]; 

    @OneToMany(() => Mute, mute => mute.muter, {
      cascade: true
    })
    mute: Mute[];

    @OneToMany(() => Ban, ban => ban.banner, {
      cascade: true
    })
    ban: Ban[];
  
    @OneToMany(() => Chat, chat => chat.channel, {
      cascade: true
    })
    chats: Chat[];
  }