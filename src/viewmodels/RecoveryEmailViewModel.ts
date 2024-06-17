import { makeAutoObservable } from "mobx";
import { supabase } from "../App";

export class RecoveryEmailViewModel {
    email?: string

    constructor() {
        makeAutoObservable(this)
    }

    setEmail(email: string) {
        this.email = email
    }

    async sendRecovery() {
        const response = await supabase.auth.resetPasswordForEmail(this.email!)
        return response
    }

}