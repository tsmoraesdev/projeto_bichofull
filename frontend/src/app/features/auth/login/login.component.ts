import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      senha: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.form.invalid) return;

    const payload = this.form.getRawValue() as { email: string; senha: string };

    this.authService.login(payload).subscribe({
      next: (res) => {
        this.authService.saveToken(res.token);
        this.router.navigate(['/inicio']);
      },
      error: (err) => {
        console.error(err);
        alert('Erro no login');
      }
    });
  }
}