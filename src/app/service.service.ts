import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from './user';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  constructor(private _http:HttpClient) {  }

  public loginUserFromRemote(user:User):Observable<any>{
    return this._http.post("http://localhost:8080/api/v1/login", user);
  }

  public registerNewUser(user:User):Observable<any>{
    return this._http.post<any>("http://localhost:8080/api/v1/register", user);
  }

  public changePwd(user:User):Observable<any>{
    return this._http.post("http://localhost:8080/api/v1/changePwd", user);
  }
}
