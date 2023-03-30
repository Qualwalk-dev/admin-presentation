import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PersistanceService {

  constructor() { }

  set(key: string, value: string) {
    localStorage.setItem(key, JSON.stringify(value))
  }

  get(key:string) {
    return localStorage.getItem(key)
  }

  remove(key:string) {
    localStorage.removeItem(key)
  }

}
