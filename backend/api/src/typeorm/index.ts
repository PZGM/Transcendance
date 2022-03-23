import { TypeORMSession } from './entities/session';
import { User } from './entities/user';
import { Channel } from './entities/channel';
import { Chat } from './entities/chat';

export const entities = [User, Channel, Chat, TypeORMSession];

export { User, Channel, Chat, TypeORMSession };