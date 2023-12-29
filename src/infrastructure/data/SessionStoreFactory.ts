import AsyncStorage from "@react-native-async-storage/async-storage";
import { JwtRequest } from "../../client";
import { dateFormat } from "../../utils/datetimeFormatterHelper";

export interface SessionStore {
  getToken(): Promise<string | undefined | null>
  setToken(token: string | undefined): void
  getCredentials(): Promise<JwtRequest | undefined | null>
  setCredentials(credentials: JwtRequest | undefined | null): void
  getUser(): Promise<any | undefined | null>
  setUser(user: any | undefined): void
  getDate(): Promise<string | undefined | null>
  setDate(): void
  getRecoverPassword(): Promise<boolean | undefined | null>
  setRecoverPassword(recoverPassword: boolean): void
  isLoggedIn(): Promise<boolean>
}

export class SessionStoreFactory {

  public static getSessionStore() {
    return sessionAsyncStorage()
  }
}

export interface SessionStoreProps {
  user?: any,
  token?: string
}

const sessionAsyncStorage = (): SessionStore => {

  const sessionStore: SessionStore = {
    getToken: async () => {
      return await AsyncStorage.getItem("token");
    },
    setToken: (token: string) => {
      AsyncStorage.setItem("token", token);
    },

    getCredentials: async () => {
      const credentials = await AsyncStorage.getItem("credentials");
      if (credentials)
        return JSON.parse(credentials);
      return undefined;
    },
    setCredentials: (credentials: JwtRequest | undefined | null) => {
      credentials ? AsyncStorage.setItem("credentials", JSON.stringify(credentials)) : AsyncStorage.removeItem("credentials");
    },

    getUser: async () => {
      const user = await AsyncStorage.getItem("user");
      if (user)
        return JSON.parse(user);
      return undefined;
    },
    setUser: (user: any | undefined) => {
      user ? AsyncStorage.setItem("user", JSON.stringify(user)) : AsyncStorage.removeItem("user");
    },

    getDate: async () => {
      return await AsyncStorage.getItem("date");
    },
    setDate: () => {
      AsyncStorage.setItem("date", dateFormat(new Date()));
    },

    getRecoverPassword: async () => {
      const recoverPassword = await AsyncStorage.getItem("recover_password")
      if (recoverPassword)
        return JSON.parse(recoverPassword)
      return undefined
    },
    setRecoverPassword: (recoverPassword: boolean) => {
      AsyncStorage.setItem("recover_password", JSON.stringify(recoverPassword))
    },

    isLoggedIn: async () => {
      const logged = await AsyncStorage.getItem("token");
      const isUser = await AsyncStorage.getItem("user");
      return logged !== '' && isUser !== undefined && isUser !== null && logged !== null && logged.length > 1 && isUser.length > 1 ? true : false;
    }
  }

  return sessionStore
}