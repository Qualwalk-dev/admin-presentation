import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { SearchResponse } from '../common/search-response';
import { SingleEntity } from '../common/single-entity';
import { ArrayList } from '../models/array-list';
import { Course } from '../models/course';
import { SearchRequest } from '../models/search-request';

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  constructor(private httpClient: HttpClient) { }

  searchCourse(searchRequest:SearchRequest): Observable<SearchResponse<Course>> {
    const url = `${environment.baseUrl}course/search`;
    return this.httpClient.post(url, searchRequest).pipe(
      map(json => this.toSearchResponse(json))
    )
  }

  addCourse(course:Course): Observable<SingleEntity<Course>> {
    const url = `${environment.baseUrl}course`;
    return this.httpClient.post(url, course).pipe(
      map(json => this.toSingleEntity(json))
    )
  }


  modifyCourse(course:Course): Observable<SingleEntity<Course>> {
    const url = `${environment.baseUrl}course`;
    return this.httpClient.put(url, course).pipe(
      map(json => this.toSingleEntity(json))
    )
  }

  toSearchResponse(json:any): SearchResponse<Course> {
    return new SearchResponse<Course>(json.data)
  }

  toSingleEntity(json:any): SingleEntity<Course> {
    return new SingleEntity(Course.fromJson(json.data))
  }
}
