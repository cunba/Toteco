export class UserData {
    id: string
    username: string
    email: string
    name: string
    surname: string
    birth_date: number
    photo: string
    is_active: boolean
    money_spent: number
    publications_number: number

    constructor(
        id: string,
        username: string,
        email: string,
        name: string,
        surname: string,
        birth_date: number,
        photo: string,
        is_active: boolean,
        money_spent: number,
        publications_number: number
    ) {
        this.id = id
        this.username = username
        this.email = email
        this.name = name
        this.surname = surname
        this.birth_date = birth_date
        this.photo = photo
        this.is_active = is_active
        this.money_spent = money_spent
        this.publications_number = publications_number
    }
}