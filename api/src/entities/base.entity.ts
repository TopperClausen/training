import { BaseEntity } from "typeorm";

export default class TrainingBaseEntity extends BaseEntity {
    public grantParams(params: object) {
        if(!params) return;

        Object.keys(params).forEach(key => {
            if(params[key]) this[key] = params[key]
        })
    }
}