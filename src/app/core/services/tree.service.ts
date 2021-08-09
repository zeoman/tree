import {Injectable} from '@angular/core';
import {ITreeFormParams} from "../interfaces/tree-form-params.interface";
import {BehaviorSubject, Observable} from "rxjs";
import {ITreeNode} from "../interfaces/tree-node.interface";
import {MatSnackBar} from "@angular/material/snack-bar";
// import {LoaderService} from "./loader.service";


@Injectable({
  providedIn: 'root'
})
export class TreeService {

  private params: ITreeFormParams | undefined;
  private treeSubject = new BehaviorSubject<ITreeNode[]>([]);
  private isTreeExistingSubject: BehaviorSubject<boolean>;

  constructor(
    // private loaderService: LoaderService
    private snackBar: MatSnackBar
  ) {
    const existingTree = this.getTreeFromStorage()
    const isTreeExisting = !!existingTree && existingTree.length > 0;

    if (isTreeExisting) {
      this.treeSubject.next(existingTree);
    }
    this.isTreeExistingSubject = new BehaviorSubject<boolean>(isTreeExisting);
  }

  get treeDataObservable(): Observable<ITreeNode[]> {
    return this.treeSubject.asObservable();
  }

  get isTreeExists$(): Observable<boolean> {
    return this.isTreeExistingSubject.asObservable();
  }

  makeTreeData(data: ITreeFormParams): Promise<any> {
    this.params = data;
    // this.loaderService.activateLoader(this.params.rootNodesAmount);

    return new Promise(resolve => {
      this.generateTree()
      resolve('ok');
    });
  }

  private generateTree(): void {
    this.treeSubject.next([]);

    let id: number = 1;
    const nodes = []
    // @ts-ignore
    for (let i = 0; i <= this.params.rootNodesAmount; i++) {

      let node = {
        name: 'root-node_' + id++
      }
      let level = 1;
      this.makeChildren(node, level, id)
      nodes.push(node);

      // this.loaderService.generatedNodeAdded();
    }
    this.treeSubject.next(nodes);
    this.saveTreeToStorage(nodes);
    this.isTreeExistingSubject.next(true);
    // this.loaderService.loadingComplete();
  }

  private makeChildren(node: ITreeNode, level: number, id: number): void {
    if (!!!this.params?.childrenMin || !!!this.params.childrenMax) {
      return;
    }
    let children: ITreeNode[] = [];
    const amount = this.getRandomArbitrary(this.params?.childrenMin, this.params?.childrenMax);
    for (let i = 0; i < amount; i++) {
      let node = {
        name: 'node_' + id++
      }
      children.push(node);
    }
    node.children = children;
    if (level++ <= this.params.deepLevel) {
      children.forEach(node => this.makeChildren(node, level, id));
    }
  }

  deleteTree(): void {
    this.treeSubject.next([]);
    this.deleteTreeFromStorage();
    this.isTreeExistingSubject.next(false);
  }

  private saveTreeToStorage(nodes: ITreeNode[]): void {
    try {
      localStorage.setItem('tree', JSON.stringify(nodes));
    }
    catch (e) {
      this.snackBar.open("Local Storage is full. Tree has not been saved.", 'Ok', {panelClass: 'snackbar-error'});
      localStorage.removeItem('tree');
    }
  }

  private deleteTreeFromStorage(): void {
    localStorage.removeItem('tree');
  }

  private getTreeFromStorage(): ITreeNode[] {
    const tree = localStorage.getItem('tree')
    return !!tree ? JSON.parse(tree) : [];
  }

  private getRandomArbitrary(min: number, max: number): number {
    return Math.random() * (max - min) + min;
  }
}
