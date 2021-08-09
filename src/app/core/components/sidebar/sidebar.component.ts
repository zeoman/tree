import {Component, OnDestroy, OnInit} from '@angular/core';
import {NavigationEnd, Router} from "@angular/router";
import {TreeService} from "../../services";
import {Subscription} from "rxjs";
import {filter, map} from "rxjs/operators";

export interface ISidebarItem {
  name: string;
  link: string;
  enabled: boolean;
  disabledMessage: string;
}

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit, OnDestroy {

  items: ISidebarItem[] = [
    {
      name: 'Generate a tree',
      link: 'generate-tree',
      enabled: true,
      disabledMessage: 'test message'
    },
    {
      name: 'Display existing tree',
      link: 'tree-viewer',
      enabled: true,
      disabledMessage: 'Generate Tree Firstly'
    }
  ]

  activeIndex = -1;
  isTreeExistsSub: Subscription | undefined;

  constructor(
    private router: Router,
    private TreeService: TreeService,
  ) {
    router.events
      .pipe(
        filter((e): e is NavigationEnd => e instanceof NavigationEnd),
        map(e => e.url)
      )
      .subscribe(url => this.setActiveTab(url))
  }

  ngOnInit(): void {
    this.isTreeExistsSub = this.TreeService.isTreeExists$.subscribe(
      state => {
        this.setTreeViewerButtonState(state);
      }
    )
  }

  setActiveTab(path: string): void {
    const index = this.items.findIndex(item => path.endsWith(item.link));
    setTimeout(() => this.activeIndex = index);
  }

  setTreeViewerButtonState(state: boolean): void {
    const index = this.items.findIndex(item => item.link === 'tree-viewer');
    if (index > -1) {
      this.items[index].enabled = state;
    }
  }

  open(item: ISidebarItem): void {
    if (!item.enabled) {
      return;
    }
    this.router.navigate([item.link]);
  }

  ngOnDestroy(): void {
    this.isTreeExistsSub?.unsubscribe();
  }
}
