import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from './components/material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CustomValidator } from './helpers/custom-form-validator.service';
@NgModule({
    imports: [
        CommonModule,
        MaterialModule,
    ],
    declarations: [],
    exports: [
        CommonModule,
        MaterialModule,
        FormsModule,
        ReactiveFormsModule,
    ],
    providers: [CustomValidator]
})
export class SharedModule { }
