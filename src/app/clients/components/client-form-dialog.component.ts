import {Component, Inject} from "@angular/core";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
   selector: 'client-dialog-form',
   template: `
      <h1 mat-dialog-title>Hi {{data.name}} client-form-dialog</h1>
      <div mat-dialog-content>
         <p>What's your favorite animal?</p>
         <mat-form-field appearance="fill">
            <mat-label>Favorite Animal</mat-label>
            <input matInput [(ngModel)]="data.animal">
         </mat-form-field>
      </div>
      <div mat-dialog-actions>
         <button mat-button (click)="onNoClick()">No Thanks</button>
         <button mat-button [mat-dialog-close]="data.animal">Ok</button>
      </div>
   `,
})
export class ClientFormDialog {
   constructor(
      public dialogRef: MatDialogRef<ClientFormDialog>,
      @Inject(MAT_DIALOG_DATA) public data: any,
   ) {}

   onNoClick(): void {
      this.dialogRef.close();
   }
}
