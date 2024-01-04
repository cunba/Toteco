import { Publication, UserDTO, UserModel } from "../../client"

export class UserData implements UserModel {
    constructor(
        public id: string,
        public username: string,
        public name: string,
        public surname: string,
        public birthDate: number,
        public email: string,
        public password: string,
        public active: boolean,
        public role: string,
        public created?: number,
        public modified?: number,
        public recoveryCode?: number,
        public moneySpent?: number,
        public publicationsNumber?: number,
        public publications?: Publication[]
    ) {
        this.id = id
        this.username = username
        this.name = name
        this.surname = surname
        this.birthDate = birthDate
        this.email = email
        this.password = password
        this.active = active
        this.role = role
        this.created = created
        this.modified = modified
        this.recoveryCode = recoveryCode
        this.moneySpent = moneySpent
        this.publicationsNumber = publicationsNumber
        this.publications = publications
    }
}

export class UserDataDTO implements UserDTO {
    constructor(
        public username: string,
        public name: string,
        public surname: string,
        public birthDate: number,
        public email: string,
        public password: string,
        public role: string
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