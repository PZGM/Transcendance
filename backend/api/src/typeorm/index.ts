import { TypeORMSession } from './entities/session';
import { User } from './entities/user';
import { Channel } from './entities/channel';
import { Chat } from './entities/chat';
import { Game } from './entities/game';
import { Stats } from './entities/stats';
import { Mute } from './entities/mutedUser';

export const entities = [User, Channel, Chat, Game, TypeORMSession, Stats, Mute];

export { User, Channel, Chat, Game, TypeORMSession, Stats, Mute};