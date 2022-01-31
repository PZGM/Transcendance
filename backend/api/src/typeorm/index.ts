import { TypeORMSession } from './entities/session';
import { User } from './entities/user';

export const entities = [User, TypeORMSession];

export { User, TypeORMSession };