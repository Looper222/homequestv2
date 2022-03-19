import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
import { UsersMember } from "../dto/schemaDto/users-member.dto";
import { UsersTasks } from "../dto/schemaDto/users-tasks.dto";


export type UserDocument = User & Document;

class RequiredProp  {
    required: [boolean, string];
}

const requiredPropError = (propName: string): RequiredProp => {
    return { required: [true, `${propName} is required to proceed`]};
}

@Schema()
export class User {
    @Prop(requiredPropError('login')) // it will be better to throw an custom error stored in another file, such as RequiredError
    login: string;

    @Prop(requiredPropError('password'))
    password: string;

    @Prop(requiredPropError('fname'))
    fname: string;

    @Prop(requiredPropError('surname'))
    surname: string;

    // @Prop()
    // age: number;

    @Prop([UsersMember])
    members: UsersMember[];

    @Prop(requiredPropError('isAdult'))
    isAdult: boolean;

    @Prop()
    funds: number;

    @Prop()
    blockedFunds: number;

    @Prop([UsersTasks])
    tasks: UsersTasks[];

    @Prop()
    refreshToken: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
