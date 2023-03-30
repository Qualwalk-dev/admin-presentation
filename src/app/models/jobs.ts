export class Job {
    id: number;
    designation: string;
    location: string;
    minYears: number;
    maxYears: number;
    description: string;

    constructor(data:any) {
        this.designation = data.designation;
        this.location = data.location;
        this.minYears = data.minYears
        this.maxYears = data.maxYears;
        this.id = data.id
        this.description = data.description
    }

    static fromJson(json: any) {
        return new Job(json);
    }
}