import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  isOpenSubject = new BehaviorSubject<boolean>(true);

  get isOpen$(): Observable<boolean> {
    return this.isOpenSubject.asObservable();
  }

  close(): void {
    this.isOpenSubject.next(false)
  }

  open(): void {
    this.isOpenSubject.next(true)
  }

  toggle(): void {
    this.isOpenSubject.next( !this.isOpenSubject.getValue() );
  }
}
