import { Component, OnInit, inject, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../../service/auth.service';
import { LucideAngularModule } from 'lucide-angular';
import { UserService } from '../../../service/user.service';
import { catchError, finalize, switchMap } from 'rxjs';
import { IFullUser } from '../../../types/auth.types';
import { StatusService } from '../../../service/status.service';

@Component({
  selector: 'app-change-form',
  standalone: true,
  imports: [ReactiveFormsModule, LucideAngularModule],
  templateUrl: './change-form.component.html',
})
export class ChangeFormComponent implements OnInit {
  protected authService: AuthService = inject(AuthService);
  private readonly status: StatusService = inject(StatusService);
  protected userService: UserService = inject(UserService);
  showPassword = signal<boolean>(false);
  profileData!: FormGroup;

  ngOnInit(): void {
    this.profileData = new FormGroup({
      username: new FormControl(''),
      firstName: new FormControl(''),
      lastName: new FormControl(''),
      phone: new FormControl(''),
      email: new FormControl(''),
      password: new FormControl(''),
    });
  }

  updateProfile() {
    if (this.profileData.valid) {
      this.userService
        .updateProfile(this.profileData.value, this.authService.user()!.id)
        .pipe(
          switchMap((response: IFullUser) => {
            this.status.success('Datele contului au fost schimbate cu success');
            this.authService.user.set(response);
            return '';
          }),
          catchError((error: any) => {
            return this.status.getError(error);
          }),
          finalize(() => {
            this.userService.isLoading.set(false);
          })
        )
        .subscribe((res: any) => console.log(res));
    }
  }
}
