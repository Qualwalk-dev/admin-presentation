export class SearchResponse<T> {
    records: T[];
    moreExists: boolean;
    totalRecordCount: number;
    recordCount: number;

    constructor(data:any) {
        this.records = data.records;
        this.moreExists = data.moreExists
        this.totalRecordCount = data.totalRecordCount
        this.recordCount = data.recordCount
    }

}