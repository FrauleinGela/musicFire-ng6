import {
    MatButtonModule,
    MatCheckboxModule,
    MatDividerModule,
    MatSortModule,
    MatTableModule
} from '@angular/material';
const materialModules = [
    MatButtonModule,
    MatCheckboxModule,
    MatDividerModule,
    MatSortModule,
    MatTableModule
];
import { NgModule } from '@angular/core';
@NgModule({
    imports: [...materialModules],
    exports: [...materialModules]
})
export class MaterialModule { }
