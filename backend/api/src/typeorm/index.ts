import { TypeORMSession } from './entities/session';
import { User } from './entities/user';
import { Chat } from './entities/chat';

export const entities = [User, Chat, TypeORMSession];

export { User, Chat, TypeORMSession };