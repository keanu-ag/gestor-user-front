import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { User } from './user';

import { catchError, map } from 'rxjs/operators';
import { TokenService } from './token.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';

const helper =  new JwtHelperService();

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private data =  new User
  private loggedId = new  BehaviorSubject<boolean>(false);
  private loggedOut = new  BehaviorSubject<boolean>(true);
  autURL = 'http://localhost:8080/api/v1/'

  constructor(private httpClien: HttpClient, private tokenServ:TokenService, private router: Router) { 
    this.checkToken
  }

  get isLogged(): Observable<boolean>{
    return this.loggedId.asObservable();
  }

  public getDataUser(): User{
    return this.data;
  }

  get isLoggedOut(): Observable<boolean>{
    return this.loggedId.asObservable();
  }

  login(usuario: User): Observable<any | void>{
    return this.httpClien.post<User>(this.autURL + 'login', usuario)
    .pipe(
      map((res:User)=>{
        console.log('Res->',res)
        this.saveToken(res.password);
        this.loggedId.next(true);
        this.loggedOut.next(false);
        this.data = res;
        this.router.navigate(['/principal']);
      }),
      catchError((err)=>this.handledError(err))
    );
  }

  public logout(): void {
    this.tokenServ.logout();
    this.loggedId.next(false);
    this.loggedOut.next(true);

    this.router.navigate(['/login']);
  }


  private checkToken(): void {
    const userToken = this.tokenServ.getToken();
    const isExpired = helper.isTokenExpired(userToken);
    console.log('isExpired ->', isExpired);

    isExpired ? this.logout() : this.loggedId.next(true);

    /*if(isExpired){
      this.logout();
    }else{
      this.loggedId.next(true);
    }*/
  }

  private saveToken(token: string): void {
    this.tokenServ.setToken(token);
  }

  private handledError(err): Observable<never>{
    let errorMessage = 'Ocurrió un error';
    if(err){
      errorMessage = "Error: code ${err.message}";
    }
    window.alert(errorMessage);
    return throwError(errorMessage)
  }
}
