import { makeAutoObservable } from "mobx";
import { supabase } from "../App";
import { PLATFORM } from "../config/Constants";

export class RecoveryEmailViewModel {
    email?: string

    constructor() {
        makeAutoObservable(this)
    }

    setEmail(email: string) {
        this.email = email
    }

    async sendRecovery() {
        const response = await supabase.auth.resetPasswordForEmail(this.email!, { redirectTo: PLATFORM === 'ios' ? 'org.reactjs.native.example.Toteco:/callback' : 'com.toteco:/callback' })
        return response
    }

}