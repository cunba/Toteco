import { makeAutoObservable } from "mobx";

export class RecoveryViewModel {
    code?: number
    newPassword?: string
    repeatNewPassword?: string

    constructor() {
        makeAutoObservable(this)
    }

    setCode(code: number) {
        this.code = code
    }

    setNewPassword(newPassword: string) {
        this.newPassword = newPassword
    }

    setRepeatNewPassword(repeatNewPassword: string) {
        this.repeatNewPassword = repeatNewPassword
    }
}