export class EnquiryEntity {
    email:string;
    firstname: string;
    lastname: string;
    learningModes: string;
    message: string;

    constructor(data:any) {
        this.email = data.email;
        this.firstname = data.firstname;
        this.lastname = data.lastname;
        this.learningModes = data.learningModes;
        this.message = data.message
    }
}