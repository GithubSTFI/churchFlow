// src/app/features/auth/components/register/register.component.ts
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../../core/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  loading = false;
  error = '';
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {

    this.authService.logout();

    this.registerForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
    }, {
      validator: this.passwordMatchValidator
    });
  }

  ngOnInit(): void {
    
    this.authService.logout();
  }

  // Getter pour faciliter l'accès aux champs du formulaire
  get f() { return this.registerForm.controls; }

  passwordMatchValidator(group: FormGroup) {
    const password = group.get('password');
    const confirmPassword = group.get('confirmPassword');

    if (!password || !confirmPassword) {
      return null;
    }

    return password.value === confirmPassword.value ? null : { passwordMismatch: true };
  }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.registerForm.invalid) {
      return;
    }

    this.loading = true;
    this.error = '';

    const userData = {
      name: this.f['name'].value,
      email: this.f['email'].value,
      password: this.f['password'].value
    };

     this.authService.register(userData)
      .subscribe({
        next: (response) => {
          console.log('Registration response:', response);
          this.authService.logout();
          this.router.navigate(['/login'], { 
            queryParams: { 
              registered: 'true',
              email: this.registerForm.value.email 
            } 
          });
        },
        error: (error) => {
          console.error('Registration error:', error);
          this.error = error.message;
          this.loading = false;
        }
      });
  }

  
}