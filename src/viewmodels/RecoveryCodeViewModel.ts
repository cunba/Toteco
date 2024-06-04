import { makeAutoObservable } from "mobx";
import { UserData } from "../data/model/toteco/User";
import { UsersRepository } from "../data/repositories/toteco/impl/UsersRepository";
import { SessionStoreFactory } from "../infrastructure/data/SessionStoreFactory";

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

    async setNullCode() {
        SessionStoreFactory.getSessionStore().setUser(undefined)
        await new UsersRepository().updateRecoveryCode(this.user?.id!, 0)
    }
}