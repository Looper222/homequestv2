import { Body, Controller, Get, Param, Patch, Post, UseFilters } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './schemas/users.schema';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserPropsDto } from './dto/update-user.dto';
import { UsersMember } from './dto/schemaDto/users-member.dto';
import { HttpExceptionFilter } from 'src/exceptions/http-exception.filter';
import { UserCreatePipe } from './pipes/create-user.pipe';

@Controller('users')
@UseFilters(HttpExceptionFilter)
export class UsersController {
    constructor( private readonly usersService: UsersService) {}

    @Get(':userID')
    async getUser(@Param('userID') userID: string): Promise<User> {
        return this.usersService.getUserById(userID);
    }

    @Get()
    async getUsers(): Promise<User[]> {
        return this.usersService.getUsers();
    }

    @Post()
    async createUser(@Body(UserCreatePipe) user: User): Promise<User> {
        return this.usersService.createUser(user);
    }

    @Patch(':userID')
    async updateUser(@Param('userID') userID: string, @Body() updateUserDto: UpdateUserPropsDto): Promise<User> {
        return this.usersService.updateUser(userID, updateUserDto);
    } // works

    @Post('member/:userId')
    async memberReg(@Param('userId') userId: string, @Body() member: User): Promise<User> {
        return this.usersService.memberReg(userId, member);
    }

    // @Post('funds/:userID')
    // async fundsSet(@Body() funds: number): Promise<User> {
    //     return this.usersService.fundsSet(funds);
    // }
}
