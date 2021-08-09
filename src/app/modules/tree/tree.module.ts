import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TreeComponent } from './container/tree.component';
import {CoreModule} from "../../core/core.module";
import {MaterialModule} from "../../material/material.module";
import {RouterModule} from "@angular/router";
import {TreeRoutingModule} from "./tree-routing.module";
import {TreeViewerComponent} from "./components/tree-viewer/tree-viewer.component";
import {TreeGeneratorFormComponent} from "./components/tree-generator-form/tree-generator-form.component";



@NgModule({
  declarations: [
    TreeComponent,
    TreeViewerComponent,
    TreeGeneratorFormComponent
  ],
  imports: [
    CommonModule,
    CoreModule,
    MaterialModule,
    RouterModule,
    TreeRoutingModule
  ]
})
export class TreeModule { }
