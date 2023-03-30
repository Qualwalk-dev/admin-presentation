import { Component, OnInit } from '@angular/core';
import { LazyLoadEvent } from 'primeng/api/lazyloadevent';
import { finalize } from 'rxjs/operators';
import { EnquiryEntity } from 'src/app/models/enquiry-entity';
import { SearchRequest } from 'src/app/models/search-request';
import { EnquiryService } from 'src/app/services/enquiry.service';
import { saveAs } from 'file-saver';

@Component({
  selector: 'app-enquiry',
  templateUrl: './enquiry.component.html',
  styleUrls: ['./enquiry.component.scss']
})
export class EnquiryComponent implements OnInit {

  enquiries: EnquiryEntity[]

  totalRecords: number;

  loading: boolean;

  constructor(
    private enquiryService: EnquiryService
  ) { }

  ngOnInit(): void {
    let searchRequest: SearchRequest = {
      criteria: {
        sortBy:"CREATED_ON",
        sortDirection: "DESC",
        searchString: ""
      },
      pageNumber: 1,
      pageSize: 9
    }
    this.loadTableData(searchRequest)
    

  }

  loadTableData(searchRequest:SearchRequest) {
    this.loading = true;
    this.enquiryService.getEnquiries(searchRequest)
    .pipe(
      finalize(() => this.loading = false)
    )
    .subscribe(
      {
        next: (res) => {
          this.enquiries = res.records;
          this.totalRecords = res.totalRecordCount
        }
      }
    )
  }

  refreshData(event: LazyLoadEvent) {
    let searchRequest: SearchRequest = {
      criteria: {
        sortBy:"CREATED_ON",
        sortDirection: event.sortOrder === -1 ? "DESC" : "ASC",
        searchString: event.filters?.email.value ? event.filters?.email.value : ""
      },
      pageNumber: event.first === 0 ? 1 : ( (event.first ? event.first : 0) - (event.rows ? event.rows : 0) )+2,
      pageSize: event.rows ? event.rows -1 : 10
    }
    this.loadTableData(searchRequest);
  }

  downloadReport() {
    this.enquiryService.download().subscribe(blob => saveAs(blob))
  }

}
