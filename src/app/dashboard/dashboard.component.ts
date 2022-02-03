import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-invoices',
  template: `
    <p>
      <app-side-nav></app-side-nav>
    </p>
  `,
  styles: [
  ]
})
export class DashboardComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
