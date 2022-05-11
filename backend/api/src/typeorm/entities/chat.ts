import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from './user';
import { Channel } from "./channel";
  
  @Entity({ name: 'chat' })
  export class Chat {
    @PrimaryGeneratedColumn()
    id: number;
  
    @CreateDateColumn()
    createdDate: Date;
  
    @Column({ length: 640 })
    content: string;
  
    @ManyToOne(() => User, {eager: true})
    author: User;
  
    @ManyToOne(() => Channel, channel => channel.chats, {
      onDelete: "CASCADE",
    })
    channel: Channel;
  }
  