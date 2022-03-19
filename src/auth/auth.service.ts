import { Injectable } from '@nestjs/common';
import { UsersRepository } from '../users/users.repository';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { User } from 'src/users/schemas/users.schema';


@Injectable()
export class AuthService {
    constructor(
        private usersRepository: UsersRepository,
        private jwtService: JwtService,
        private usersService: UsersService
        ) {}

    async validateUser(login: string, password: string): Promise<any> {
        const user = await this.usersRepository.findOne({login});
        if (user && bcrypt.compare(password, user.password)) {
            const {password, ...result } = user;
            return result;
        }

        return null;
    }

    async register(userData: User): Promise<User> {
        return await this.usersService.createUser(userData);
    }

    async login(user: any): Promise<any> {
        const payload = { login: user.login, sub: user._id };

        return {
            access_token: this.jwtService.sign(payload),
        }
    }
}
