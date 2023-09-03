import { Controller, Post, Req, UnauthorizedException } from "@nestjs/common";
import { BaseController } from "src/base.controller"
import User from "src/entities/user.entity";
import { EncryptionService } from "src/services/encryption.service";
import JWTService from "src/services/jwt.service";

interface loginParams {
    email: string,
    password: string
}

@Controller('/sessions')
export default class SessionsController extends BaseController {
    
    constructor(
        private readonly encryptionService: EncryptionService,
        private readonly jwtService: JWTService
    ) { super() }

    @Post()
    async login(@Req() req) {
        const body: loginParams = req.body;

        const user = await User.findOneBy({ email: body.email });
        if(!user) throw new UnauthorizedException('Unauthorized');
        if(!this.encryptionService.compare(user.password, body.password)) throw new UnauthorizedException('Unauthorized');

        return { message: 'Success', jwt: this.jwtService.encode(this.jwtService.payloadFromUser(user)) }
    }
}