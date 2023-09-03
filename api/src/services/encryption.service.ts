import { genSaltSync, hashSync, compare } from 'bcrypt';

export class EncryptionService {
    saltRounds: number = 10;

    public encrypt(str: string): string {
        const salt = genSaltSync(this.saltRounds);
        return hashSync(str, salt)
    }

    public compare(hash: string, plain: string): boolean {
        return compare(plain, hash);
    }
}