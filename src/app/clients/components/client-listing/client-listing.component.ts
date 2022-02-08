import {Component, OnInit} from '@angular/core';
import {ClientService} from '../../services/client.service';

@Component({
   selector: 'app-client-listing',
   templateUrl: './client-listing.component.html',
   styleUrls: ['./client-listing.component.scss']
})
export class ClientListingComponent implements OnInit {

   constructor(private clientService: ClientService) {
   }

   ngOnInit(): void {
      this.clientService.getAllClients().subscribe({
         next: (data) => {
            console.log(data);
         },
         error: (err) => {
            console.log(err);
         }
      })
   }

}
