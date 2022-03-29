import { TypeORMSession } from './entities/session';
import { User } from './entities/user';
import { Channel } from './entities/channel';
import { Chat } from './entities/chat';
import { Game } from './entities/game';

export const entities = [User, Channel, Chat, Game, TypeORMSession];

export { User, Channel, Chat, Game, TypeORMSession };