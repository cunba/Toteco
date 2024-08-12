import { makeAutoObservable } from "mobx";
import { UserData } from "../data/model/toteco/User";

export class SignUpViewModel {

    username?: string
    email?: string
    password?: string
    name?: string
    surname?: string
    birthDate?: number = new Date().getTime()
    repeatPassword?: string
    profileImage?: string
    user?: UserData

    constructor() {
        makeAutoObservable(this)
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

    async setUser() {
        const user = new UserData(
            '',
            this.username!,
            this.email!,
            this.name!,
            this.surname!,
            // this.birthDate!,
            this.profileImage!,
            true,
            0,
            0
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
        if (this.repeatPassword) {
            return this.repeatPassword.trim().length > 0
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

    isPhotoValid() {
        if (this.profileImage) {
            return this.profileImage !== undefined && this.profileImage.trim().length > 0
        }
        else { return false }
    }

    isValid() {

        return (
            this.isEmailValid()
            &&
            this.isPasswordValid()
            &&
            this.isNameValid()
            &&
            this.isSurnameValid()
            &&
            this.isRepeatPasswordValid()
        )
    }

    passwordLength() {
        if (this.password) {
            return this.password.trim().length > 6
        }
        else { return false }
    }

    samePassword() {
        return this.password === this.repeatPassword
    }

}