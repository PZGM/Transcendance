import { Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
  import { User } from './user'
  
  @Entity()
  export class BlockedUsers {
    @PrimaryGeneratedColumn()
    id: number;
  
    @ManyToOne(() => User, user => user.blockedUsers, {
    })
    user: User;
  }