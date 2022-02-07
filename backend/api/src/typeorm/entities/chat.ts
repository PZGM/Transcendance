import { Column, Entity, CreateDateColumn, PrimaryGeneratedColumn } from "typeorm";
import { ChatResponseDTO, ChatsResponseDTO, CreateChatDTO } from 'src/dto/chat.dto';

@Entity('chat')
export class Chat {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @CreateDateColumn()
    createdDate: Date;

    @Column('text')
    message: string;

    @Column('text')
    from: string;

    @Column('text')
    to: string;

    @Column({
        type: 'boolean',
        nullable: true,
    })
    delivered: boolean;

    @Column({
        type: 'boolean',
        nullable: true,
    })
    seen: boolean;

    toResponseObject(): ChatResponseDTO {
        const { id, createdDate, from, to, delivered, seen, message } = this;
        const responseObject: ChatResponseDTO = { id, createdDate, message, from, to, delivered, seen };
        return responseObject;
    }
}
