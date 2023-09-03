import { Entity, Column, ManyToMany, JoinTable, PrimaryGeneratedColumn } from 'typeorm';
import TrainingBaseEntity from './base.entity';
import { EncryptionService } from 'src/services/encryption.service';

@Entity()
export default class User extends TrainingBaseEntity {

    constructor(params: Partial<User> = null) {
        super();

        this.grantParams(params);
    }

    encryptionService: EncryptionService = new EncryptionService() ;

    @PrimaryGeneratedColumn() id: number;
    @Column() email: string;
    @Column() passwordDigest: string;
    @Column() firstName: string;
    @Column() lastName: string;
    @Column({ default: false }) termsAccepted: boolean;

    public set password(value: string) {
        this.passwordDigest = this.encryptionService.encrypt(value);
    }

    public get password() {
        return this.passwordDigest;
    }
}