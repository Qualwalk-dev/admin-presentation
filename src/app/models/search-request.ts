import { Criteria } from "./criteria";

export class SearchRequest {
    criteria: Criteria;
    pageSize: number;
    pageNumber: number

    constructor(data: any) {
        this.criteria = data.criteria
        this.pageNumber = data.pageNumber
        this.pageSize = data.pageSize
    }
}