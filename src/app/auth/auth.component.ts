import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../core/services/auth.service";

@Component({
   selector: 'app-auth',
   templateUrl: './auth.component.html',
   styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {
   authForm: FormGroup;

   constructor(private fb: FormBuilder, private authService: AuthService) {
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
      this.authService.login(this.authForm.value).subscribe({
         next: (data) => {
            console.log('Logged in', data);
         },
         error: (err) => {
            console.log(err);
         }
      })
   }
}
