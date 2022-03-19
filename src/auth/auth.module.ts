import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UsersModule } from 'src/users/users.module';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';
import { LocalStrategy } from './local.strategy';

@Module({
  imports: [UsersModule, PassportModule, JwtModule.register({
    secret: '885e729036891dd6fd412ba11b5caa746a22d8cde57da88c222491515c0bd88897b925ab03939ff8955beb785057b6c717ae4377736d20d72d389f711de6aa90',
    signOptions: { expiresIn: '60s' }
  })],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  exports: [AuthService]
})
export class AuthModule {}
