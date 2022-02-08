import {Component, OnInit} from '@angular/core';
import {ClientService} from '../../services/client.service';
import {MatTableDataSource} from "@angular/material/table";
import {Client} from '../../models/client';
import {MatDialog} from '@angular/material/dialog';
import {MatSnackBar} from '@angular/material/snack-bar';
import {filter, mergeMap} from 'rxjs/operators';
import {FormDialogComponent} from '../form-dialog/form-dialog.component';

@Component({
   selector: 'app-client-listing',
   templateUrl: './client-listing.component.html',
   styleUrls: ['./client-listing.component.scss']
})
export class ClientListingComponent implements OnInit {
   displayedColumns = ['firstName', 'lastName', 'email', 'phone', 'actions'];
   isLoadingResults = false;
   dataSource = new MatTableDataSource<Client>();
   animal: string;
   name: string;

   constructor(
      private clientService: ClientService,
      public dialog: MatDialog,
      private _snackBar: MatSnackBar) {
   }

   ngOnInit() {
      this.isLoadingResults = true;
      this.clientService.getAllClients().subscribe({
         next: (data) => {
            this.dataSource.data = data;
         },
         error: (err) => {
            this.errorHandler(err, 'Error while getting clients');
         },
         complete: () => {
            this.isLoadingResults = false;
         }
      })
   }

   applyFilter($event: KeyboardEvent) {
   }

   openDialog(clientId?: string): void {
      let options = {
         width: '600px',
         height: '500px',
         data: {}
      }

      if (clientId) {
         options.data = {clientId: clientId}
      }
      let dialogRef = this.dialog.open(FormDialogComponent, options);
      dialogRef.afterClosed().pipe(
         filter(clientParams => typeof clientParams !== 'undefined'),
         mergeMap(result => this.clientService.createClient(result))
      ).subscribe({
         next: (data) => {
            this.dataSource.data = [...this.dataSource.data, data.client];
            this._snackBar.open('Client created successfully', 'Success', {duration: 2000});
         },
         error: (err) => {
            this.errorHandler(err, 'Error creating client');
         }
      })
   }

   private errorHandler(error: any, displayMessage: string) {
      this.isLoadingResults = false;
      console.log(error);
      this._snackBar.open(displayMessage, 'Error', {duration: 2000});
   }

   editClientHandler(_id: any) {

   }

   deleteClientHandler(_id: any) {

   }
}
