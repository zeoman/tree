import { Component, OnInit } from '@angular/core';
import {Observable} from "rxjs";
import {NavigationEnd, Router} from "@angular/router";
import {filter, map} from "rxjs/operators";

import {SidebarService} from "../../../core/services";

@Component({
  selector: 'app-tree',
  templateUrl: './tree.component.html',
  styleUrls: ['./tree.component.scss']
})
export class TreeComponent implements OnInit {

  isSidebarOpen$: Observable<boolean> | undefined;
  isMainPage = false;

  constructor(
    private sidebarService: SidebarService,
    private router: Router
  ) {
    router.events
      .pipe(
        filter((e): e is NavigationEnd => e instanceof NavigationEnd),
        map(e => e.url)
      )
      .subscribe(url => this.isMainPage = url === '/')
  }

  ngOnInit(): void {
    this.isSidebarOpen$ = this.sidebarService.isOpen$;
  }

}
