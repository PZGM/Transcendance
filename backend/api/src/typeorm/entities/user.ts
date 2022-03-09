import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

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
}