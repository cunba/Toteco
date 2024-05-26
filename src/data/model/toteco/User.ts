import { RecoverAccount, UpdatePassword, User, UserDTO } from "../../../client/toteco"

export class UserData implements User {
    constructor(
        public id: string,
        public username: string,
        public name: string,
        public surname: string,
        public birthDate: number,
        public email: string,
        public password: string,
        public created: number,
        public photo: string,
        public isActive: boolean,
        public moneySpent: number,
        public publicationsNumber: number,
        public role: string,
        public updated?: number,
        public recoveryCode?: number
    ) {
        this.id = id
        this.username = username
        this.name = name
        this.surname = surname
        this.birthDate = birthDate
        this.email = email
        this.password = password
        this.created = created
        this.updated = updated
        this.photo = photo
        this.isActive = isActive
        this.moneySpent = moneySpent
        this.publicationsNumber = publicationsNumber
        this.role = role
        this.recoveryCode = recoveryCode
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
        public photo: string,
        public role: string
    ) {
        this.username = username
        this.name = name
        this.surname = surname
        this.birthDate = birthDate
        this.email = email
        this.password = password
        this.photo = photo
        this.role = role
    }
}

export class RecoverAccountData implements RecoverAccount {
    constructor(
        public id: string,
        public username: string,
        public recoveryCode: number
    ) {
        this.id = id
        this.username = username
        this.recoveryCode = recoveryCode
    }
}

export class UpdatePasswordData implements UpdatePassword {
    constructor(
        public id: string,
        public password: string
    ) {
        this.id = id
        this.password = password
    }
}