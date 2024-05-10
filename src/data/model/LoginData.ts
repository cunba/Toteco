import { LoginRequest, LoginResponse } from "../../client"

export class LoginRequestData implements LoginRequest {

    constructor(
        public username: string,
        public password: string
    ) {
        this.username = username
        this.password = password
    }
}

export class LoginResponseData implements LoginResponse {

    constructor(public token: string) {
        this.token = token
    }
}