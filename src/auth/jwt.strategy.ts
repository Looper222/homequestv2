import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";


@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: '885e729036891dd6fd412ba11b5caa746a22d8cde57da88c222491515c0bd88897b925ab03939ff8955beb785057b6c717ae4377736d20d72d389f711de6aa90',
        });
    }

    async validate(payload: any) {
        return { _id: payload.sub, login: payload.login };
    }
}