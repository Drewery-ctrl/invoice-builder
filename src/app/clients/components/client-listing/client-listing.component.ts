import {Component, OnInit} from '@angular/core';
import {ClientService} from '../../services/client.service';
import {MatTableDataSource} from "@angular/material/table";
import {Client} from '../../models/client';

@Component({
   selector: 'app-client-listing',
   templateUrl: './client-listing.component.html',
   styleUrls: ['./client-listing.component.scss']
})
export class ClientListingComponent implements OnInit {
   displayedColumns = ['firstName', 'lastName', 'email', 'phone'];
   dataSource = new MatTableDataSource<Client>();

   constructor(private clientService: ClientService) {
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

}
