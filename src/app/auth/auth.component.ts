import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from '@angular/router';
import {AuthService} from "../core/services/auth.service";
import {JwtService} from '../core/services/jwt.service';

@Component({
   selector: 'app-auth',
   templateUrl: './auth.component.html',
   styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {
   authForm: FormGroup;

   constructor(
      private fb: FormBuilder,
      private authService: AuthService,
      private jwtService: JwtService,
      private router: Router
   ) {
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
         next: async (data) => {
            console.log('Logged in', data);
            this.jwtService.setToken(data.token);
            await this.router.navigate(['/dashboard', 'invoices']);
         },
         error: (err) => {
            console.log(err);
         }
      })
   }
}
