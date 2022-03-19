import { Injectable, NestMiddleware } from "@nestjs/common";
import { NextFunction, Request, Response } from "express";
import { CreateUserDto } from "../dto/create-user.dto";
import { User } from "../schemas/users.schema";


@Injectable()
export class CreateUserMiddleware implements NestMiddleware {
    use(req: Request, res: Response, next: NextFunction) {
        const createUserDto: CreateUserDto = {
            login: req.body.login,
            password: req.body.password,
            fname: req.body.fname,
            surname: req.body.surname,
            isAdult: req.body.isAdult
        }

        const user: User = {
            login: createUserDto.login,
            password: createUserDto.password,
            fname: createUserDto.fname,
            surname: createUserDto.surname,
            members: [],
            isAdult: createUserDto.isAdult,
            funds: 2,
            blockedFunds: 0,
            tasks: [],
            refreshToken: ''

        }

        // console.log(user);

        req.body = user;
        next();
    }
}