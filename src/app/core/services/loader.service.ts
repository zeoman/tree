import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {
  private isLoadingSubject = new BehaviorSubject(false);
  private progressInPercentsSubject = new BehaviorSubject(0);
  // private generatedNodesSub: Observer<number> | undefined;
  private rootNodesAmount = 0;
  private generatedRootNodesCounter = 0;

  constructor() {
  }

  activateLoader(rootNodesAmount: number): void {
    this.rootNodesAmount = rootNodesAmount;
    this.isLoadingSubject.next(true);
  }

  generatedNodeAdded() {
    const progress = Math.floor((++this.generatedRootNodesCounter / this.rootNodesAmount) * 100);
    this.progressInPercentsSubject.next(progress);
    if (this.generatedRootNodesCounter === this.rootNodesAmount) {
      this.generatedRootNodesCounter = 0;
      this.isLoadingSubject.next(false);
    }
  }

  getProgressObservable(): Observable<number> {
    return this.progressInPercentsSubject.asObservable();
  }

  get isLoadingObservable(): Observable<boolean> {
    return this.isLoadingSubject.asObservable();
  }

  loadingComplete(): void {
    this.isLoadingSubject.next(false);
  }
}
