import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable, of} from "rxjs";
import {IUser} from "../interfaces/user.inteface";
import {map} from "rxjs/operators";
import {IResponse} from "../interfaces/response.interface";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  userSubject = new BehaviorSubject<IUser | null>(null)

  constructor() {
    const user = localStorage.getItem('activeUser');
    if (user === null) {
      return;
    }
    this.userSubject.next(JSON.parse(user) ?? null)
  }

  get userData$(): Observable<IUser | null> {
    return this.userSubject.asObservable();
  }

  set userData(user: IUser | null) {
    if (user !== null) {
      localStorage.setItem('activeUser', JSON.stringify(user));
    } else {
      localStorage.removeItem('activeUser');
    }
    this.userSubject.next(user);
  }

  modifyUser(user: IUser): Observable<IResponse<string>> {
    if (user !== null) {
      this.userData = user;
      return of({
        result: 'ok',
        data: 'Profile saved'
      })
    }
    return of({
      result: 'error',
      data: 'User is null'
    })
  }

  get username$(): Observable<string | null> {
    return this.userSubject.asObservable()
      .pipe(
        map(user => user?.login ?? null)
      )
  }
}
