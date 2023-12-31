import { makeAutoObservable } from "mobx"

export class LoginViewModel {
    username?: string = ""
    password?: string = ""

    constructor() {
        makeAutoObservable(this)
    }

    setUsername(username: string) {
        this.username = username
        return this.username
    }

    setPassword(password: string) {
        this.password = password
        return this.password
    }

    isPasswordValid() {
        if (this.password) {
            return this.password.trim().length > 0
        }
        else { return false }
    }

    isEmailValid() {
        if (this.username) {
            return this.username.trim().length > 0
        }
        else { return false }
    }

    isValid() {
        return this.isEmailValid() === true && this.isPasswordValid() === true
    }
}