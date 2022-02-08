import {Component, OnInit} from '@angular/core';
import {ClientService} from '../../services/client.service';
import {MatTableDataSource} from "@angular/material/table";
import {Client} from '../../models/client';
import {MatDialog} from '@angular/material/dialog';
import {FormDialogComponent} from '../form-dialog/form-dialog.component';

@Component({
   selector: 'app-client-listing',
   templateUrl: './client-listing.component.html',
   styleUrls: ['./client-listing.component.scss']
})
export class ClientListingComponent implements OnInit {
   displayedColumns = ['firstName', 'lastName', 'email', 'phone'];
   dataSource = new MatTableDataSource<Client>();
   animal: string;
   name: string;

   constructor(private clientService: ClientService, public dialog: MatDialog) {
   }

   ngOnInit(): void {
      this.clientService.getAllClients().subscribe({
         next: (data) => {
            this.dataSource.data = data.clients;
            console.log(data);
         },
         error: (err) => {
            console.log(err);
         }
      })
   }

   applyFilter($event: KeyboardEvent) {

   }

   createClientHandler() {

   }

   openDialog(): void {
      const dialogRef = this.dialog.open(FormDialogComponent, {
         width: '500px',
         height: '350px',
         data: {name: this.name, animal: this.animal},
      });

      dialogRef.afterClosed().subscribe(result => {
         console.log('The dialog was closed');
         this.animal = result;
      });
   }
}
