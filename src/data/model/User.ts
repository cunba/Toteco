import { User, UserDTO } from "../../client"

export class UserData implements User {
    constructor(
        public id?: number,
        public username?: string,
        public name?: string,
        public surname?: string,
        public birthDate?: string,
        public email?: string,
        public password?: string,
        public creationDate?: string,
        public active?: boolean,
        public moneySpent?: number,
        public publicationsNumber?: number,
        public role?: string
    ) {
        this.id = id
        this.username = username
        this.name = name
        this.surname = surname
        this.birthDate = birthDate
        this.email = email
        this.password = password
        this.creationDate = creationDate
        this.active = active
        this.moneySpent = moneySpent
        this.publicationsNumber = publicationsNumber
        this.role = role
    }
}

export class UserDataDTO implements UserDTO {
    constructor(
        public username?: string,
        public name?: string,
        public surname?: string,
        public birthDate?: string,
        public email?: string,
        public password?: string,
        public role?: string
    ) {
        this.username = username
        this.name = name
        this.surname = surname
        this.birthDate = birthDate
        this.email = email
        this.password = password
        this.role = role
    }
}