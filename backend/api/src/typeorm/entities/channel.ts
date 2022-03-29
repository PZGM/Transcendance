import { Column, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { IsOptional } from "class-validator";
import { Chat } from "./chat";
import { User } from './user'
  
  @Entity({ name: 'channel' })
  export class Channel {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column({ length: 50, unique: true })
    name: string;
  
    @ManyToOne(() => User, owner => owner.ownedChannels, {
      onDelete: "CASCADE"
    })
    owner: User;
  
    /* public, private, protected */
    @Column({ default: "private" })
    visibility: string
  
    @IsOptional()
    @Column({ select: false, length: 50, nullable: true })
    password: string;
  
    @ManyToMany(() => User, user => user.joinedChannels)
    @JoinTable()
    users: User[];
  
    @OneToMany(() => Chat, chat => chat.channel, {
      cascade: true
    })
    chats: Chat[];
  }
  