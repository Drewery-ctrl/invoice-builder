import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
   selector: 'app-form-dialog',
   templateUrl: './form-dialog.component.html',
   styleUrls: ['./form-dialog.component.scss']
})
export class FormDialogComponent implements OnInit {
   clientForm: FormGroup;

   constructor(
      public dialogRef: MatDialogRef<FormDialogComponent>,
      @Inject(MAT_DIALOG_DATA) public data: any,
      private fb: FormBuilder,
   ) {
   }

   onNoClick(): void {
      this.dialogRef.close();
   }

   ngOnInit() {
      this.initClientForm();
   }


   private initClientForm() {
      this.clientForm = this.fb.group({
         firstName: ['', [Validators.required, Validators.maxLength(15)]],
         lastName: ['', [Validators.required, Validators.maxLength(15)]],
         email: ['', [Validators.required, Validators.email]],
         phone: ['', [Validators.required, Validators.minLength(10)]],
      });
   }
}
