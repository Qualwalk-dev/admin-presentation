import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { SingleEntity } from '../common/single-entity';
import { ArrayList } from '../models/array-list';
import { Combo } from '../models/combo-entity';
import { JobApplicant } from '../models/job-applicant';
import { Job } from '../models/jobs';

@Injectable({
  providedIn: 'root'
})
export class JobService {

  constructor(private httpClient: HttpClient) { }

  createJob(job:Job) : Observable<SingleEntity<Job>> {
    const url = `${environment.baseUrl}jobs`;
    return this.httpClient.post(url, job).pipe(
      map(json => this.toSingleEntity(json))
    )
  }

  getAllJobs() : Observable<ArrayList<Job>> {
    const url = `${environment.baseUrl}jobs`
    return this.httpClient.get(url).pipe(
      map(json => this.toArrayList(json))
    )
  }

  deleteJob(id:number) : Observable<SingleEntity<Job>> {
    const url = `${environment.baseUrl}jobs/${id}`;
    return this.httpClient.delete(url).pipe(
      map(json => this.toSingleEntity(json))
    )
  }

  getAllApplicants():Observable<ArrayList<JobApplicant>> {
    const url = `${environment.baseUrl}jobs/applicants`
    return this.httpClient.get(url).pipe(
      map(json => this.toJobApplicants(json))
    )
  }

  deleteJobApplicant(id:number) : Observable<any> {
    const url = `${environment.baseUrl}jobs/applicants/${id}`;
    return this.httpClient.delete(url);
  }

  toSingleEntity(json:any): SingleEntity<Job> {
    return new SingleEntity<Job>(new Job(json.data));
  }

  toArrayList(json:any): ArrayList<Job> {
    return new ArrayList<Job>(json.data.map((i:any) => Job.fromJson(i)));
  }

  toJobApplicants(json:any):ArrayList<JobApplicant> {
    return new ArrayList<JobApplicant>(json.data.map((i:any) => JobApplicant.fromJson(i)));
  }
}
