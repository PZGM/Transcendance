import { TypeORMSession } from './entities/session';
import { User } from './entities/user';
import { Game } from './entities/game';

export const entities = [User, TypeORMSession, Game];

export { User, TypeORMSession, Game};