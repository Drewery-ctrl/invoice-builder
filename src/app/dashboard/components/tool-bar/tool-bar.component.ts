import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Router} from '@angular/router';
import {JwtService} from 'src/app/core/services/jwt.service';

@Component({
   selector: 'app-tool-bar',
   templateUrl: './tool-bar.component.html',
   styleUrls: ['./tool-bar.component.scss']
})
export class ToolBarComponent implements OnInit {
   @Output() toggleSideNav = new EventEmitter<void>()

   constructor(private jwtService: JwtService, private router: Router) {
   }

   ngOnInit(): void {
   }

   async logout() {
      this.jwtService.destroyToken();
      await this.router.navigate(['/login']);
   }

}
