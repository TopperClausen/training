import { PrismaClient } from '@prisma/client'

module.exports = class BaseEntity {
    constructor(prismaClient) {
        this.prismaClient = prismaClient
    }

    encryptString(str) {
        const salt = bcrypt.genSaltSync(10);
        return bcrypt.hashSync(str, salt);
    }

    compareEncryptedString(str, encryptedPassword) {
        return bcrypt.compareSync(str, hash); 
    }
}