import { Column, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { EncryptionTransformer } from "typeorm-encrypted";
import { IsOptional } from "class-validator";
import { Chat } from "./chat";
import { User } from './user'
import { Mute } from "./mutedUser";
  
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
    @Column({
      type: "varchar",
      nullable: true,
      transformer: new EncryptionTransformer({
        key: 'e41c966f21f9e1577802463f8924e6a3fe3e9751f201304213b2f845d8841d61',
        algorithm: 'aes-256-cbc',
        ivLength: 16,
        iv: 'ff5ac19190424b1d88f9419ef949ae56'
      })
    })
    password: string;
  
    @ManyToMany(() => User, user => user.joinedChannels)
    @JoinTable()
    users: User[];

    @ManyToMany(() => User, user => user.adminChannels)
    @JoinTable()
    admin: User[]; 

    @OneToMany(() => Mute, mute => mute.muter, {
      cascade: true
    })
    mute: Mute[];
  
    @OneToMany(() => Chat, chat => chat.channel, {
      cascade: true
    })
    chats: Chat[];
  }