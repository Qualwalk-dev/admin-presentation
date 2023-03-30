export class Course {
    course: string;
    description: string;
    originalPrice: number;
    discount: number;
    courseCategory: string;
    finalPrice: number;
    nextBatchDate: Date
    

    constructor(data:any) {
        this.course = data.course
        this.courseCategory = data.courseCategory;
        this.description = data.description;
        this.originalPrice = data.originalPrice
        this.discount = data.discount
        this.finalPrice = data.finalPrice
        this.nextBatchDate = data.nextBatchDate
    }

    static fromJson(json:any) {
        return new Course(json);
    }
}