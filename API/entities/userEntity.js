const baseEntity = require('./baseEntity');

module.exports = class UserEntity extends baseEntity {
    constructor({ id, email, password, firstName, lastName }) {
        this.id = id;
        this.email = email;
        this.password = password;
        this.firstName = firstName;
        this.lastName = lastName;
    }

    save() {
        this.prismaClient.connect();
        this.validate();

        this.prismaClient.user.upsert({
            where: { id: this.id },
            update: {
                email: this.email,
                password: this.encryptString(this.password),
                firstName: this.firstName,
                lastName: this.lastName
            }
        })
        this.prismaClient.disconnect();
    }

    validate() {
        return true;
    }
}