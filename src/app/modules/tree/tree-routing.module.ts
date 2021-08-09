import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {TreeComponent} from "./container/tree.component";
import {TreeViewerComponent} from "./components/tree-viewer/tree-viewer.component";
import {TreeGeneratorFormComponent} from "./components/tree-generator-form/tree-generator-form.component";
import {TreeExistsGuard} from "../../core/guards/tree-exists.guard";

export const routes: Routes = [
  {
    path: '',
    component: TreeComponent,
    children: [
      {
        path: 'generate-tree',
        component: TreeGeneratorFormComponent
      },
      {
        path: 'tree-viewer',
        component: TreeViewerComponent,
        canActivate: [TreeExistsGuard]
      }
    ]
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TreeRoutingModule {
}
