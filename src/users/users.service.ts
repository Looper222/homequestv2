import { Injectable } from '@nestjs/common';
import { UsersIDs } from './dto/schemaDto/user-id.dto';
// import { v4 as uuidv4 } from 'uuid';
import { UpdateUserPropsDto } from './dto/update-user.dto';
import { User, UserDocument } from './schemas/users.schema';
import { UsersRepository } from './users.repository';
import * as bcrypt from 'bcrypt';


@Injectable()
export class UsersService {
    constructor(private readonly usersRepository: UsersRepository) {}

    async getUserById(userID: string): Promise<User> {
        return this.usersRepository.findOne({ _id: userID });
    }

    async getUsers(): Promise<User[]> {
        return this.usersRepository.find({});
    }

    async createUser(user: User): Promise<User> {
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);
        return this.usersRepository.create(user);
    }

    async updateUser(userID: string, userUpdates: UpdateUserPropsDto): Promise<User> {
        return this.usersRepository.findOneAndUpdate({ _id: userID }, userUpdates);
    }

    async memberReg(userID: string, user: User): Promise<User> {
        const member = await this.usersRepository.createMember(user);
        const parent = await this.usersRepository.findOne({ _id: userID});
        const memberObj = { _id: member._id, fname: member.fname, parent: false};
        const parentObj = { _id: userID, fname: parent.fname, parent: true};
        // const memberObj = { _id: member._id, fname: member.fname};
        // const parentObj = { _id: userID, fname: parent.fname};
        await this.usersRepository.updateOne({ _id: member._id}, parentObj);
        return this.usersRepository.updateOne({ _id: userID}, memberObj);
        // return this.usersRepository.findOneAndUpdate({ _id: userID }, {});
    }
}
