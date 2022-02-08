import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
   selector: 'app-auth',
   templateUrl: './auth.component.html',
   styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {
   authForm: FormGroup;

   constructor(private fb: FormBuilder) {
   }

   ngOnInit(): void {
      this.initForm();
   }

   private initForm() {
      this.authForm = this.fb.group({
         email: ['', Validators.required],
         password: ['', Validators.required]
      });
   }

   onSubmit() {
      console.log('Submitted');
   }
}
