import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {MatTree, MatTreeFlatDataSource, MatTreeFlattener} from "@angular/material/tree";
import {FlatTreeControl} from "@angular/cdk/tree";
import {IFlatNode} from "../../../../core/interfaces/flat-node.interface";
import {ITreeNode} from "../../../../core/interfaces/tree-node.interface";
import {TreeService} from "../../../../core/services";
import {Subscription} from "rxjs";
import {Router} from "@angular/router";

@Component({
  selector: 'app-tree-viewer',
  templateUrl: './tree-viewer.component.html',
  styleUrls: ['./tree-viewer.component.scss']
})
export class TreeViewerComponent implements OnInit, OnDestroy {

  @ViewChild('tree') tree: MatTree<any> | undefined;
  treeDataSub: Subscription | undefined;

  private _transformer = (node: ITreeNode, level: number) => {
    return {
      expandable: !!node.children?.length,
      name: node.name,
      level,
      children: node.children
    };
  }

  treeControl = new FlatTreeControl<IFlatNode>(
    node => node.level, node => node.expandable);

  treeFlattener = new MatTreeFlattener(
    this._transformer, node => node.level, node => node.expandable, node => node.children);

  // @ts-ignore
  dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);

  constructor(
    private treeService: TreeService,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.treeDataSub = this.treeService.treeDataObservable
      .subscribe(rootNodes => this.dataSource.data = rootNodes);
  }

  hasChild = (_: number, node: IFlatNode) => node.expandable;

  deleteTree(): void {
    this.router.navigate(['generate-tree']);
    this.treeService.deleteTree();
  }

  ngOnDestroy(): void {
    this.treeDataSub?.unsubscribe();
  }
}
