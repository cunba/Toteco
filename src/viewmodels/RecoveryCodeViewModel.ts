import { makeAutoObservable } from "mobx";
import { UserData } from "../data/model/toteco/User";
import { SessionStoreFactory } from "../infrastructure/data/SessionStoreFactory";
import { UsersRepository } from "../data/repositories/toteco/impl/UsersRepository";

export class RecoveryCodeViewModel {
    code?: number
    user?: UserData | null

    constructor() {
        makeAutoObservable(this)
        this.getUser()
    }

    async getUser() {
        this.user = await SessionStoreFactory.getSessionStore().getUser()
    }

    setCode(code: number) {
        this.code = code
    }

    checkCode() {
        return this.code === this.user?.recoveryCode
    }

    setNullCode() {
        this.user!.recoveryCode = undefined
        SessionStoreFactory.getSessionStore().setUser(this.user!)
    }
}