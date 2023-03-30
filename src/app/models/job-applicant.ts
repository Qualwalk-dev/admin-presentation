import { Job } from "./jobs";

export class JobApplicant {
    description: string;
    designation: string;
    phoneNumber: string;
    email: string;
    id: number;

    constructor(data:any) {
        this.description = data.description;
        this.designation = data.designation;
        this.email = data.email;
        this.phoneNumber = data.phoneNumber
        this.id = data.id
    }

    static fromJson(json:any): JobApplicant {
        return new JobApplicant(json)
    }
}