import { TypeORMSession } from './entities/session';
import { User } from './entities/user';
export declare const entities: (typeof TypeORMSession | typeof User)[];
export { User, TypeORMSession };
