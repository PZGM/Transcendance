import { IsNotEmpty } from 'class-validator';

export class CreateChatDTO {
    @IsNotEmpty()
    from?: string;

    @IsNotEmpty()
    to: string;

    @IsNotEmpty()
    message: string;
}

export class ChatResponseDTO {
    id: string;
    createdDate: Date;
    message: string;
    from: string;
    to: string;
    seen: boolean;
    delivered: boolean;
}

export class ChatsResponseDTO {
    items: object;
    itemCount: number;
    pageCount: number;
    unseenItems: number;
}

