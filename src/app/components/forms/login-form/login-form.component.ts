import { Component, OnInit, inject, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../service/auth.service';
import { LucideAngularModule } from 'lucide-angular';
import { FormErrorComponent } from '../form-error/form-error.component';
import { StatusService } from '../../../service/status.service';
import { IFullUser, ILoginUser } from '../../../types/auth.types';
import { catchError, finalize, of, switchMap, tap } from 'rxjs';

@Component({
  selector: 'app-login-form',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule, LucideAngularModule, FormErrorComponent],
  templateUrl: './login-form.component.html',
})
export class LoginFormComponent implements OnInit {
  protected authService: AuthService = inject(AuthService);
  private status: StatusService = inject(StatusService);
  private router: Router = inject(Router);
  showPassword = signal<boolean>(false);
  authData!: FormGroup;

  ngOnInit(): void {
    this.authData = new FormGroup({
      username: new FormControl(
        { value: '', disabled: this.authService.isLoading() },
        {
          validators: [Validators.required, Validators.minLength(6)],
        }
      ),
      password: new FormControl(
        { value: '', disabled: this.authService.isLoading() },
        {
          validators: [Validators.required, Validators.minLength(6)],
        }
      ),
    });
  }

  onSubmit() {
    if (this.authData.valid) {
      this.authService
        .login(this.authData.value.username, this.authData.value.password)
        .pipe(
          switchMap((response: ILoginUser) => {
            const role = response.gender === 'female' ? 'user' : 'admin';
            localStorage.setItem('token', response.token);
            localStorage.setItem('role', role);
            this.status.success(`${response.firstName} Te-ai logat cu success`);
            this.authService.loggedIn.set(true);
            this.authService.isAdmin.set(role === 'admin');
            this.router.navigate(['/home']);
            return this.authService.me();
          }),
          catchError((error) => {
            const message = error.error.message;
            this.status.error(message);
            return of(message);
          }),
          tap((response: IFullUser) => {
            this.authService.user.set(response);
          }),
          finalize(() => {
            this.authService.isLoading.set(false);
          })
        )
        .subscribe();
    }

    if (
      this.authData.controls['username'].value.length === 0 ||
      this.authData.controls['password'].value.length === 0
    ) {
      this.status.error('Completati toate campurile!');
    }
  }
}
