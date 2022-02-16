import { User } from "src/typeorm";
import { UserDetails } from "src/utils/types";
export interface AuthentificationProvider {
    validateUser(details: UserDetails): any;
    createUser(details: UserDetails): any;
    findUser(intraId: string): Promise<User | undefined>;
}
