import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
   selector: 'app-tool-bar',
   templateUrl: './tool-bar.component.html',
   styleUrls: ['./tool-bar.component.scss']
})
export class ToolBarComponent implements OnInit {
   @Output() toggleSideNav = new EventEmitter<void>()

   constructor() {
   }

   ngOnInit(): void {
   }

}
