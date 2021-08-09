import { Component, OnInit } from '@angular/core';
import {Observable} from "rxjs";

import {LoaderService} from "../../services/loader.service";

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss']
})
export class LoaderComponent implements OnInit {

  isLoading$: Observable<boolean> | undefined;
  // progress$: Observable<number> | undefined;

  constructor(
    // private loaderService: LoaderService
  ) {
  }

  ngOnInit(): void {
    // this.isLoading$ = this.loaderService.isLoadingObservable
      // .pipe(
      //   tap(progress => this.isLoading = !(progress === 100 || progress === 0))
      // )
  }

}
