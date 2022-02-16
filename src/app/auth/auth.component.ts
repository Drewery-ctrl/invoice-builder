import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from '@angular/router';
import {AuthService} from "../core/services/auth.service";
import {JwtService} from '../core/services/jwt.service';
import {MatSnackBar} from "@angular/material/snack-bar";
import {User} from '../core/models/user';

@Component({
   selector: 'app-auth',
   templateUrl: './auth.component.html',
   styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {
   isLoading = false;
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
         name: '',
         email: ['', Validators.required],
         password: ['', Validators.required]
      });
   }

   onSubmit() {
      if (this.title === 'Login') {
         this.isLoading = true;
         let {email, password} = this.authForm.value;
         const user: User = {email, password};
         this.authService.login(user).subscribe({
            next: async (data) => {
               console.log('Logged in', data);
               this._snackBar.open('Successfully Logged in', 'Success', {duration: 2000});
               this.jwtService.setToken(data.token);
               await this.router.navigate(['/dashboard', 'invoices']);
            },
            error: (err) => {
               this.errorHandler(err, 'Login Failed');
            },
            complete: () => {
               this.isLoading = false;
            }
         })
      } else {
         this.isLoading = true;
         this.authService.signup(this.authForm.value).subscribe({
            next: async (data) => {
               // this.jwtService.setToken(data);
               console.log(data);
               this._snackBar.open('Successfully Signed up', 'Success', {duration: 2000});
               await this.router.navigate(['/login']);
            },
            error: (err) => {
               this.errorHandler(err, 'Signup Failed');
            },
            complete: () => {
               this.isLoading = false;
            }
         })
      }
   }

   private errorHandler(error: any, displayMessage: string) {
      this.isLoading = false;
      console.log(error);
      this._snackBar.open(displayMessage, 'Error', {duration: 2000});
   }
}
