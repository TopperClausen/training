import { Controller, Get, HttpStatus, Post, Req, Res } from "@nestjs/common";
import { BaseController } from "../base.controller"
import User from "src/entities/user.entity";
import JWTService from "src/services/jwt.service";

@Controller('/users')
export default class UserController extends BaseController {

    constructor(
        private readonly jwtService: JWTService
    ) { super() }

    @Post()
    async create(@Req() request, @Res() res) {
        const body: Partial<User> = request.body;
        
        const emailInUse = await User.findOneBy({ email: body.email })
        if(emailInUse) {
            return res.status(HttpStatus.CONFLICT).json({
                mesage: 'Email already in use',
                jwt: null
            })
        }

        const user = new User(body);
        await user.save();
        await user.reload();
        return res.json({
            message: 'User created successfully',
            jwt: this.jwtService.encode(this.jwtService.payloadFromUser(user))
        });
    }
}