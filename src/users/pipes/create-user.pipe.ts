import { ArgumentMetadata, BadRequestException, HttpStatus, Injectable, PipeTransform } from "@nestjs/common";
import { CollectiveBadRequestException } from "src/exceptions/collective-bad-request.exception";
import { User } from "../schemas/users.schema";

@Injectable()
export class UserCreatePipe implements PipeTransform {
    transform(value: User, metadata: ArgumentMetadata) {
        if (!value.login || !value.password || !value.fname || !value.surname) {
            userInputs(value);
        } else {
            return value;
        }
    }
}

enum UserInputsMissing {
    LOGIN = 'Login is missing',
    PASSWORD = 'Password is missing',
    FNAME = 'Fname is missing',
    SURNAME = 'Surname is missing'
}

const userInputs = (user: User): CollectiveBadRequestException => {
    const exceptions: BadRequestException[] = [];
    if(!user.login) exceptions.push(new BadRequestException(UserInputsMissing.LOGIN));
    if(!user.password) exceptions.push(new BadRequestException(UserInputsMissing.PASSWORD));
    if (!user.fname) exceptions.push(new BadRequestException(UserInputsMissing.FNAME));
    if (!user.surname) exceptions.push(new BadRequestException(UserInputsMissing.SURNAME));
    throw new CollectiveBadRequestException(exceptions);
}