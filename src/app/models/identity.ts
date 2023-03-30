export class Identity {
    username: string;
    password: string;

    constructor(data:any) {
        this.username = data.username;
        this.password = data.password;
    }
}