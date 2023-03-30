import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { SearchResponse } from '../common/search-response';
import { ArrayList } from '../models/array-list';
import { EnquiryEntity } from '../models/enquiry-entity';
import { SearchRequest } from '../models/search-request';

@Injectable({
  providedIn: 'root'
})
export class EnquiryService {

  constructor(private httpClient: HttpClient) { }

  getEnquiries(searchRequest: SearchRequest): Observable<SearchResponse<EnquiryEntity>> {
    const url = `${environment.baseUrl}enquiry/search`
    return this.httpClient.post(url, searchRequest).pipe(
      map(json => this.toSearchResponse(json))
    )
  }

  toSearchResponse(json:any): SearchResponse<EnquiryEntity> {
    return new SearchResponse<EnquiryEntity>(json.data)
  }

  download(): Observable<Blob> {
    const url = `${environment.baseUrl}enquiry`
    return this.httpClient.get(url, {
      responseType: 'blob'
    });
  }
}
