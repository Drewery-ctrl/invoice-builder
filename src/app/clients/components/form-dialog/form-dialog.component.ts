import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
   selector: 'app-form-dialog',
   templateUrl: './form-dialog.component.html',
   styleUrls: ['./form-dialog.component.scss']
})
export class FormDialogComponent implements OnInit {

   constructor(
      public dialogRef: MatDialogRef<FormDialogComponent>,
      @Inject(MAT_DIALOG_DATA) public data: any,
   ) {
   }

   onNoClick(): void {
      this.dialogRef.close();
   }

   ngOnInit(): void {
   }

}
