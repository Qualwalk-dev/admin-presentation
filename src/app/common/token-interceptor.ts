import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, throwError } from "rxjs";
import { catchError, filter, switchMap, take } from "rxjs/operators";
import { LoginService } from "../services/login.service";

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
    isRefreshing: boolean = false;
    private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);

    constructor(private authService:LoginService) {

    }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (request.headers.get("skip")){
            request = request.clone({
                headers: request.headers.delete('skip')
            });
           return next.handle(request);
        }
        request = request.clone({  
            setHeaders: {  
              Authorization: `Bearer ${JSON.parse(this.authService.getJwtToken())}`  
            }  
          });    
        return next.handle(request).pipe(
            catchError(
                (error) => {
                    if (error instanceof HttpErrorResponse && error.status === 401) {
                        return this.handle401Error(request, next);
                    }else {
                        return throwError(error);
                    }
                }
            )
        );
    }

    private handle401Error(request: HttpRequest<any>, next: HttpHandler) {
        if (!this.isRefreshing) {
          this.isRefreshing = true;
          this.refreshTokenSubject.next(null);
    
          return this.authService.refreshToken().pipe(
            switchMap((token: any) => {
              this.isRefreshing = false;
              this.refreshTokenSubject.next(token.data['access_token']);
              return next.handle(this.addToken(request, token.data['access_token']));
            })
          );
        } else {
          return this.refreshTokenSubject.pipe(
            filter((token) => token != null),
            take(1),
            switchMap((jwt) => {
              return next.handle(this.addToken(request, jwt));
            })
          );
        }
    }

    private addToken(request: HttpRequest<any>, token: string) {
        return request.clone({
          setHeaders: {
            Authorization: `Bearer ${token}`,
          },
        });
    }
}