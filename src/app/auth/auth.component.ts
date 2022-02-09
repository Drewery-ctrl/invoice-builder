import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from '@angular/router';
import {AuthService} from "../core/services/auth.service";
import {JwtService} from '../core/services/jwt.service';
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
   selector: 'app-auth',
   templateUrl: './auth.component.html',
   styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {
   title = '';
   authForm: FormGroup;

   constructor(
      private fb: FormBuilder,
      private authService: AuthService,
      private jwtService: JwtService,
      private router: Router,
      private _snackBar: MatSnackBar
   ) {
   }

   ngOnInit(): void {
      this.initForm();
      this.title = this.router.url.includes('login') ? 'Login' : 'Signup';
   }

   private initForm() {
      this.authForm = this.fb.group({
         email: ['', Validators.required],
         password: ['', Validators.required]
      });
   }

   onSubmit() {
      if (this.title === 'Login') {
         this.authService.login(this.authForm.value).subscribe({
            next: async (data) => {
               console.log('Logged in', data);
               this._snackBar.open('Successfully Logged in', 'Success', {duration: 2000});
               this.jwtService.setToken(data.token);
               await this.router.navigate(['/dashboard', 'invoices']);
            },
            error: (err) => {
               this.errorHandler(err, 'Login Failed');
            }
         })
      } else {
         this.authService.signup(this.authForm.value).subscribe({
            next: async (data) => {
               // this.jwtService.setToken(data);
               console.log(data);
               this._snackBar.open('Successfully Signed up', 'Success', {duration: 2000});
               await this.router.navigate(['/login']);
            },
            error: (err) => {
               this.errorHandler(err, 'Signup Failed');
            }
         })
      }
   }

   private errorHandler(error: any, displayMessage: string) {
      console.log(error);
      this._snackBar.open(displayMessage, 'Error', {duration: 2000});
   }
}
