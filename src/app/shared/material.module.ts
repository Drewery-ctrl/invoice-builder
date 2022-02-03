import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatListModule} from "@angular/material/list";


@NgModule({
   declarations: [],
   imports: [
      CommonModule,
      MatButtonModule,
      MatSidenavModule,
      MatIconModule,
      MatToolbarModule,
      MatListModule,
   ],
   exports: [
      MatButtonModule,
      MatSidenavModule,
      MatIconModule,
      MatToolbarModule,
      MatListModule,
   ]
})
export class MaterialModule {
}
