import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {ClientService} from '../../services/client.service';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
   selector: 'app-form-dialog',
   templateUrl: './form-dialog.component.html',
   styleUrls: ['./form-dialog.component.scss']
})
export class FormDialogComponent implements OnInit {
   routeId: string | null;
   clientForm: FormGroup;
   isEditMode = false;

   constructor(
      public dialogRef: MatDialogRef<FormDialogComponent>,
      @Inject(MAT_DIALOG_DATA) public data: any,
      private fb: FormBuilder,
      private router: Router,
      private clientService: ClientService,
      private _snackBar: MatSnackBar
   ) {
   }

   onNoClick(): void {
      this.dialogRef.close();
   }

   ngOnInit() {
      this.initClientForm();
      this.isEditMode = !!this.data.clientId;
      if (this.data && this.data.clientId) {
         this.displayClientOnForm(this.data.clientId);
      }
   }


   private displayClientOnForm(clientId: string) {
      this.clientService.getClientById(clientId).subscribe({
         next: ({client}) => {
            this.clientForm.patchValue(client);
         },
         error: (err) => {
            this.errorHandler(err, 'Error while patching client values to form');
         }
      });
   }

   private initClientForm() {
      this.clientForm = this.fb.group({
         firstName: ['', Validators.required],
         lastName: ['', Validators.required],
         email: ['', Validators.required],
         phone: ['', Validators.required]
      });
   }

   private errorHandler(error: any, displayMessage: string) {
      console.log(error);
      this._snackBar.open(displayMessage, 'Error', {duration: 2000});
   }
}
