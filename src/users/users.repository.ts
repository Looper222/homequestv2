import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { User, UserDocument } from "./schemas/users.schema";
import { Document, FilterQuery, Model, UpdateQuery } from "mongoose"
import { UsersIDs } from "./dto/schemaDto/user-id.dto";


@Injectable()
export class UsersRepository {
    constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

    async findOne(userFilterQuery: FilterQuery<User>) : Promise<User> {
        return this.userModel.findOne(userFilterQuery);
    }

    async find(usersFilterQuery: FilterQuery<User>) : Promise<User[]> {
        return this.userModel.find(usersFilterQuery);
    }

    async create(user: User) : Promise<User> {
        const newUser = new this.userModel(user);
        return newUser.save();
    }

    async createMember(user: User) : Promise<UsersIDs> {
        const newUser = new this.userModel(user);
        return newUser.save();
    }

    async findOneAndUpdate(userFilterQuery: FilterQuery<User>, user: Partial<User>): Promise<User> {
        await this.userModel.findOneAndUpdate(userFilterQuery, user);
        return this.findOne(userFilterQuery);
    }

    async updateOne(userFilterQuery: FilterQuery<User>, user: Partial<User>): Promise<any> {
        return this.userModel.updateOne(userFilterQuery, { $addToSet: { members: user }});
    }

    async fundsRecharge(userFilterQuery: FilterQuery<User>, userUpdateQuery: UpdateQuery<User>, user: Partial<User>): Promise<any> {

    }
}