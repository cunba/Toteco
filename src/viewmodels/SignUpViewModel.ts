import { makeAutoObservable } from "mobx"
import { UserDataDTO } from "../data/model/User"

export class SignUpViewModel {

    username?: string
    email?: string
    password?: string
    name?: string
    surname?: string
    birthDate?: number = new Date().getTime()
    repeatPassword?: string
    profileImage?: string

    user?: UserDataDTO

    constructor() {
        makeAutoObservable(this)
        this.constructorFunctions()
    }

    constructorFunctions() {
    }

    setEmail(email: string) {
        this.email = email
        return this.email
    }

    setUsername(username: string) {
        this.username = username
        return this.username
    }

    setPassword(password: string) {
        this.password = password
        return this.password
    }

    setName(name: string) {
        this.name = name
        return this.name
    }

    setSurname(surname: string) {
        this.surname = surname
        return this.surname
    }

    setBirthday(birthday: number) {
        this.birthDate = birthday
        return this.birthDate
    }

    setRepeatPassword(repeatPassword: string) {
        this.repeatPassword = repeatPassword
        return this.repeatPassword
    }

    setUser() {
        const user: UserDataDTO = new UserDataDTO(
            this.username!,
            this.name!,
            this.surname!,
            this.birthDate!,
            this.profileImage ?? '',
            this.email!,
            this.password!,
            "USER"
        )

        this.user = user
    }

    async setImage(image: string) {
        this.profileImage = image
    }

    isPasswordValid() {
        if (this.password) {
            return this.password.trim().length > 0
        }
        else { return false }
    }

    isRepeatPasswordValid() {
        if (this.password) {
            return this.password.trim().length > 0
        }
        else { return false }
    }

    isUsernameValid() {
        if (this.username) {
            return this.username.trim().length > 0
        }
        else { return false }
    }

    isEmailValid() {
        if (this.email) {
            return this.email.trim().length > 0
        }
        else { return false }
    }

    isNameValid() {
        if (this.name) {
            return this.name.trim().length > 0
        }
        else { return false }
    }

    isSurnameValid() {
        if (this.surname) {
            return this.surname.trim().length > 0
        }
        else { return false }
    }

    isValid() {

        return (
            this.isEmailValid() === true
            &&
            this.isPasswordValid() === true
            &&
            this.isNameValid() === true
            &&
            this.isSurnameValid() === true
            &&
            this.isRepeatPasswordValid() === true
        )
    }

    passwordLength() {
        if (this.password) {
            return this.password.trim().length > 6
        }
        else { return false }
    }
}