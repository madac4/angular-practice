import { Component, OnInit, inject } from '@angular/core';
import { LucideAngularModule } from 'lucide-angular';
import { AuthService } from '../../service/auth.service';
import { SkeletonComponent } from '../../components/skeleton/skeleton.component';
import { ChangeFormComponent } from '../../components/forms/change-form/change-form.component';
import { StatusService } from '../../service/status.service';
import { catchError, finalize, switchMap } from 'rxjs';
import { IFullUser } from '../../types/auth.types';
import { tobase64 } from '../../utils/utils';
import { UserService } from '../../service/user.service';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [LucideAngularModule, SkeletonComponent, ChangeFormComponent, NgClass],
  templateUrl: './profile.component.html',
})
export class ProfileComponent implements OnInit {
  private readonly status: StatusService = inject(StatusService);
  protected userService: UserService = inject(UserService);
  protected authService: AuthService = inject(AuthService);
  ngOnInit(): void {
    this.authService
      .me()
      .pipe(
        switchMap((response: IFullUser) => {
          this.authService.user.set(response);
          return '';
        }),
        catchError((error: any) => {
          return this.status.getError(error);
        }),
        finalize(() => {
          this.authService.isLoading.set(false);
        })
      )
      .subscribe();
  }

  async updateAvatar(event: any) {
    if (event.target.files[0].size > 5000000) {
      return this.status.warning('Imaginea este prea mare. Maxim 5MB.');
    }

    const image = (await tobase64(event.target.files[0])) as string;

    if (image) {
      return this.userService
        .updateAvatar(image, this.authService.user()!.id)
        .pipe(
          switchMap((response: IFullUser) => {
            this.status.success('Imaginea a fost schimbata cu success');
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
        .subscribe();
    }

    return this.status.error('Nu am putut incarca imaginea');
  }
}
