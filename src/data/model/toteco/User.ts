import { Factor, User, UserAppMetadata, UserAttributes, UserIdentity } from "@supabase/supabase-js";
import { PLATFORM } from "../../../config/Constants";

export class UserData implements User {
    user_metadata: UserMetadata

    constructor(
        public id: string,
        public app_metadata: UserAppMetadata,
        user_metadata: UserMetadata,
        public aud: string,
        public created_at: string,
        public confirmation_sent_at?: string,
        public recovery_sent_at?: string,
        public email_change_sent_at?: string,
        public new_email?: string,
        public new_phone?: string,
        public invited_at?: string,
        public action_link?: string,
        public email?: string,
        public phone?: string,
        public confirmed_at?: string,
        public email_confirmed_at?: string,
        public phone_confirmed_at?: string,
        public last_sign_in_at?: string,
        public role?: string,
        public updated_at?: string,
        public identities?: UserIdentity[],
        public is_anonymous?: boolean,
        public factors?: Factor[]
    ) {
        this.id = id
        this.app_metadata = app_metadata
        this.user_metadata = user_metadata
        this.aud = aud
        this.confirmation_sent_at = confirmation_sent_at
        this.recovery_sent_at = recovery_sent_at
        this.email_change_sent_at = email_change_sent_at
        this.new_email = new_email
        this.new_phone = new_phone
        this.invited_at = invited_at
        this.action_link = action_link
        this.email = email
        this.phone = phone
        this.created_at = created_at
        this.confirmed_at = confirmed_at
        this.email_confirmed_at = email_confirmed_at
        this.phone_confirmed_at = phone_confirmed_at
        this.last_sign_in_at = last_sign_in_at
        this.role = role
        this.updated_at = updated_at
        this.identities = identities
        this.is_anonymous = is_anonymous
        this.factors = factors
    }
}

export class UserMetadata {
    username: string
    name: string
    surname: string
    birthDate: number
    photo: string
    isActive: boolean
    moneySpent: number
    publicationsNumber: number

    constructor(
        username: string,
        name: string,
        surname: string,
        birthDate: number,
        photo: string,
        isActive: boolean,
        moneySpent: number,
        publicationsNumber: number
    ) {
        this.username = username
        this.name = name
        this.surname = surname
        this.birthDate = birthDate
        this.photo = photo
        this.isActive = isActive
        this.moneySpent = moneySpent
        this.publicationsNumber = publicationsNumber
    }
}

export class UserDTO {
    email: string
    password: string
    options: SignUpOptions

    constructor(
        email: string,
        password: string,
        options: SignUpOptions
    ) {
        this.email = email
        this.password = password
        this.options = options
    }
}

export class SignUpOptions {
    emailRedirectTo: string = PLATFORM === 'ios' ? 'org.reactjs.native.example.Toteco:/callback' : 'com.toteco:/callback'
    data: UserMetadata

    constructor(
        data: UserMetadata
    ) {
        this.emailRedirectTo = PLATFORM === 'ios' ? 'org.reactjs.native.example.Toteco:/callback' : 'com.toteco:/callback'
        this.data = data
    }
}

export class UserUpdate implements UserAttributes {
    constructor(
        public email?: string,
        public phone?: string,
        public password?: string,
        public data?: UserMetadata
    ) {
        this.email = email
        this.phone = phone
        this.password = password
        this.data = data
    }

    fromUserDTO(user: UserDTO) {
        this.email = user.email
        this.phone = user.options.data.username
        this.password = user.password
        this.data = user.options.data
    }

    fromUserData(user: UserData) {
        this.email = user.email
        this.phone = user.phone
        this.data = user.user_metadata
    }
}