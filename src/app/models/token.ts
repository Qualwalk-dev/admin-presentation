export class Token {
    access_token: string;
    refresh_token: string;
    expires_in: number;
    refresh_expires_in: number;
    token_type: string

    constructor(data: any) {
        this.access_token = data.access_token;
        this.refresh_token = data.refresh_token;
        this.expires_in = data.expires_in;
        this.refresh_expires_in = data.refresh_expires_in;
        this.token_type = data.token_type;
    }

    static fromJson(json:any): Token {
        return new Token(json);
    }
}