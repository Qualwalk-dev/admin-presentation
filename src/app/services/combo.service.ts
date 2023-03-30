import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { SingleEntity } from '../common/single-entity';
import { ArrayList } from '../models/array-list';
import { Combo } from '../models/combo-entity';

@Injectable({
  providedIn: 'root'
})
export class ComboService {

  constructor(private httpClient: HttpClient) { }

  getAllcombos() : Observable<ArrayList<Combo>> {
    const url = `${environment.baseUrl}combos`
    return this.httpClient.get(url).pipe(
      map(json => this.toArrayList(json))
    )
  }

  createCombo(combo:Combo) : Observable<SingleEntity<Combo>> {
    const url = `${environment.baseUrl}combos`;
    return this.httpClient.post(url, combo).pipe(
      map(json => this.toSingleEntity(json))
    )
  }

  modifyCombo(combo:Combo) : Observable<SingleEntity<Combo>> {
    const url = `${environment.baseUrl}combos`;
    return this.httpClient.put(url, combo).pipe(
      map(json => this.toSingleEntity(json))
    )
  }

  addCourse(comboCode:string, course: string) : Observable<SingleEntity<Combo>> {
    const url = `${environment.baseUrl}combos/${comboCode}/course/${course}`;
    return this.httpClient.post(url, {}).pipe(
      map(json => this.toSingleEntity(json))
    )
  }

  deleteCourse(comboCode:string, course: string) : Observable<SingleEntity<Combo>> {
    const url = `${environment.baseUrl}combos/${comboCode}/course/${course}`;
    return this.httpClient.delete(url).pipe(
      map(json => this.toSingleEntity(json))
    )
  }

  toArrayList(json:any): ArrayList<Combo> {
    return new ArrayList<Combo>(json.data.map((i:any) => Combo.fromJson(i)));
  }

  toSingleEntity(json:any): SingleEntity<Combo> {
    return new SingleEntity<Combo>(new Combo(json.data));
  }
}
