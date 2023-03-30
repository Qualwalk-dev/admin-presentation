import { Course } from "./course";

export class Combo {
    comboCode: string;
    comboDescription: string;
    nextBatchDate: string;
    price: number;
    courses: Course[]

    constructor(data:any) {
        this.comboCode = data.comboCode;
        this.comboDescription = data.comboDescription;
        this.nextBatchDate = data.nextBatchDate;
        this.price = data.price
        this.courses = data.courses

    }

    static fromJson(data:any): Combo {
        return new Combo(data)
    }
}