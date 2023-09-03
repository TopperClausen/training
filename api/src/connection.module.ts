import { TypeOrmModule } from '@nestjs/typeorm';
import User from './entities/user.entity';

export default TypeOrmModule.forRoot({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: 'password',
    database: 'training',
    entities: [User],
    synchronize: true,
})
export class AppModule {}