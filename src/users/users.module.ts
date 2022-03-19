import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './schemas/users.schema';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { UsersRepository } from './users.repository';

@Module({
    imports: [MongooseModule.forFeature([{ name: User.name, schema: UserSchema }])],
    providers: [UsersService, UsersRepository],
    controllers: [UsersController],
    exports: [UsersRepository, UsersService],
})
export class UsersModule {}
