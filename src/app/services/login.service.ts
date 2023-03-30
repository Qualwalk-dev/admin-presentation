import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Identity } from '../models/identity';
import { Observable, of } from 'rxjs';
import { SingleEntity } from '../common/single-entity';
import { Token } from '../models/token';
import { environment } from 'src/environments/environment';
import { catchError, map, tap } from 'rxjs/operators';
import { PersistanceService } from './persistance.service';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private readonly JWT_TOKEN = "JWT_TOKEN";
  private readonly REFRESH_TOKEN = "REFRESH_TOKEN";
  private loggedUser: string;

  constructor(
    private httpClient: HttpClient, 
    private localStore: PersistanceService,
    private router:Router
  ) { }

  getToken(identity:Identity): Observable<boolean> {
    const url = `${environment.baseUrl}identity/token`
    return this.httpClient.post(url, identity, {headers:{skip:"true"}})
    .pipe(
      tap((token) => this.doLoginUser(identity.username, token)),
      map((res)=> {
        return true;
      }),
      catchError(() => {
        return of(false);
      })
    );
  }

  refreshToken() {
    const url = `${environment.baseUrl}identity/token/refresh`
    return this.httpClient
      .post<any>(url, {
        refreshToken: this.getRefreshToken(),
      })
      .pipe(
        tap((tokens) => {
          this.storeTokens(tokens);
        }),
        catchError((error) => {
          this.doLogoutUser();
          return of(false);
        })
      );
  }


  private doLoginUser(username: string, tokens:any) {
    this.loggedUser = username;
    this.storeTokens(tokens);
  }

  private storeTokens(tokens: any) {
    this.localStore.set(this.JWT_TOKEN, tokens.data["access_token"]);
    this.localStore.set(this.REFRESH_TOKEN, tokens.data["refresh_token"]);
  }

  logout() {
    this.loggedUser = null;
    this.doLogoutUser();
  }

  private doLogoutUser() {
    this.loggedUser = null;
    this.removeTokens();
    this.router.navigate(["/"]);
  }

  private removeTokens() {
    this.localStore.remove(this.JWT_TOKEN);
    this.localStore.remove(this.REFRESH_TOKEN);
  }

  getJwtToken(): string {
    return this.localStore.get(this.JWT_TOKEN);
  }

  private getRefreshToken():string {
    return this.localStore.get(this.REFRESH_TOKEN);
  }

  toSingleEntity(json:any): SingleEntity<Token> {
    return new SingleEntity(Token.fromJson(json))
  }

}
