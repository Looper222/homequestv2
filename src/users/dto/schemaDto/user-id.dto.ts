import { UserDocument } from "src/users/schemas/users.schema";
import { UsersMember } from "./users-member.dto";
import { UsersTasks } from "./users-tasks.dto";

export class UsersIDs {
    _id: string;
    login: string;
    password: string;
    fname: string;
    surname: string;
    isAdult: boolean;
    tasks: UsersTasks[];
    members: UsersMember[];
    funds: number;
    blockedFunds: number;
    refreshToken: string;
}

// export type UsersIDs = UserDocument & UserID;