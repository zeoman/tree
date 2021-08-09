import {Injectable} from '@angular/core';
import {IUser} from "../interfaces/user.inteface";
import {BehaviorSubject, Observable, of} from "rxjs";
import {IResponse} from "../interfaces/response.interface";
import {UserService} from "./user.service";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isAuthorizedSubject: BehaviorSubject<boolean>;

  constructor(
    private userService: UserService
  ) {
    const user = localStorage.getItem('activeUser');
    this.isAuthorizedSubject = new BehaviorSubject<boolean>(user !== null);
  }

  register(user: IUser): Observable<IResponse<string>> {

    const usersInStorage = localStorage.getItem('users');

    let users;
    if (usersInStorage !== null) {
      users = JSON.parse(usersInStorage);
    }
    if (!Array.isArray(users)) {
      users = [user];
      localStorage.setItem('users', JSON.stringify(users))
    }

    if (!!this.findUser(user.login, users)) {
      return of({
        result: 'error',
        data: 'User exists'
      });
    }

    users.push(user);

    localStorage.setItem('users', JSON.stringify(users))

    this.userService.userData = user;

    this.isAuthorizedSubject.next(true);
    return of({
      result: 'ok',
      data: 'Success register'
    })
  }

  login(login: string, password: string): Observable<IResponse<string>> {
    const usersInStorage = localStorage.getItem('users');

    let users;
    if (usersInStorage !== null) {
      users = JSON.parse(usersInStorage);
    }
    if (!Array.isArray(users)) {
      return of({
        result: 'error',
        data: 'No users yet'
      });
    }

    const user = this.findUser(login, users);

    // Not safe. I know.
    if (!!!user) {
      return of({
        result: 'error',
        data: 'User not exist'
      });
    }

    if (user.password !== password) {
      return of({
        result: 'error',
        data: 'Invalid password'
      });
    }

    this.userService.userData = user;
    this.isAuthorizedSubject.next(true);

    return of({
      result: 'ok',
      data: 'Success login'
    })
  }

  findUser(login: string, users: IUser[]): IUser | null {
    return users.find(user => user.login === login) ?? null;
  }

  isAuthorized(): Observable<boolean> {
    return this.isAuthorizedSubject.asObservable();
  }

  logout(): Observable<IResponse<string>> {
    this.isAuthorizedSubject.next(false);
    this.userService.userData = null;
    return of({
      result: 'ok',
      data: 'Success logout'
    })
  }
}
