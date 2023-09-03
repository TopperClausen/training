import { sign, verify } from 'jsonwebtoken';
import User from '../entities/user.entity';
import 'dotenv/config';

export interface payload {
    id: number,
    firstName: string,
    lastName: string,
    email: string,
    expires: string
}

export default class JWTService {
    secret: string = process.env.SECRET;

    public payloadFromUser(user: User): payload {
        return {
            id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email
        } as payload
    }

    public encode(payload: payload): any {
        return sign(payload, this.secret, { expiresIn: this.oneMonthFromNow() });
    }

    public verify(token: any): any {
        try {
            return verify(token, this.secret);
        } catch (e: any) {
            return null;
        }
    }

    public async getUserFromJwt(token: string, overload: any): Promise<User> {
        const jwtData = this.verify(token) as payload;
        if (!jwtData) return null

        return await User.findOne({ where: { id: jwtData.id, isActive: true }, ...overload });
    }

    private oneMonthFromNow() {
        let nextMonth = new Date().getMonth() + 1;
        if(nextMonth > 12) nextMonth = 1;
        const date = new Date();
        date.setMonth(nextMonth)
        return Math.floor(date.getTime() / 1000);
    }
}