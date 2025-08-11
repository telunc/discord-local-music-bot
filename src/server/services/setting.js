import { Setting } from './database';

export default class {

    static async get() {
        return await Setting.findOne({where :{id: 1}}).catch(console.error);
    }

    static async set(obj) {
        return await Setting.update(obj, {where :{id: 1}}).catch(console.error);
    }

}