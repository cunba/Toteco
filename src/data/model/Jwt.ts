import { JwtRequest, JwtResponse } from "../../client";

export class JwtRequestData implements JwtRequest {

    constructor(
        public username: string,
        public password: string
    ) {
        this.username = username
        this.password = password
    }
}

export class JwtResponseData implements JwtResponse {

    constructor(public token: string) {
        this.token = token
    }
}