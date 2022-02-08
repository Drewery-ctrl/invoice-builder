import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatListModule} from "@angular/material/list";
import {MatCardModule} from "@angular/material/card";
import {MatTableModule} from "@angular/material/table";
import {MatMenuModule} from "@angular/material/menu";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatNativeDateModule} from "@angular/material/core";
import {MatSnackBarModule} from "@angular/material/snack-bar";
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatSortModule} from '@angular/material/sort';

const exportedMaterialModules = [
   MatButtonModule,
   MatSidenavModule,
   MatIconModule,
   MatToolbarModule,
   MatListModule,
   MatTableModule,
   MatCardModule,
   MatMenuModule,
   MatFormFieldModule,
   MatInputModule,
   MatDatepickerModule,
   MatNativeDateModule,
   MatSnackBarModule,
   MatPaginatorModule,
   MatProgressSpinnerModule,
   MatSortModule,
];

@NgModule({
   declarations: [],
   imports: [
      CommonModule,
      ...exportedMaterialModules
   ],
   exports: [
      CommonModule,
      ...exportedMaterialModules
   ]
})
export class MaterialModule {
}