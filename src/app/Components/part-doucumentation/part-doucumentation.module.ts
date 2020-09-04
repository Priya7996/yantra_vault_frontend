import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PartDoucumentationRoutingModule } from './part-doucumentation-routing.module';
import { PartDoucumentationComponent,Dialog,Delete} from './part-doucumentation.component';
import { SharedModule} from '../shared/shared.module';


@NgModule({
  declarations: [PartDoucumentationComponent,Dialog,Delete],
  imports: [
    CommonModule,SharedModule,
    PartDoucumentationRoutingModule
  ],
  entryComponents:[Dialog,Delete],
})
export class PartDoucumentationModule { }
