export class Criteria {
    sortBy: string;
    sortDirection: string;
    searchString: string;

    constructor(data:any) {
        this.searchString = data.searchString
        this.sortBy = data.sortBy
        this.sortDirection = data.sortDirection
    }
}