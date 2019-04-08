import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute} from '@angular/router';
import {Observable, of, Subscription, timer} from 'rxjs';
import {map, switchMap} from 'rxjs/internal/operators';

import {User} from '../../../../common/models/user.interface';
import {RouteNavigationService} from 'src/app/common/routing/route-navigation.service';
import {ModalWindowService} from 'src/app/common/services/modal-window.service';
import {ProfileService} from 'src/app/common/services/profile.service';
import {UserService} from 'src/app/common/services/user.service';
import {CustomValidators} from 'src/app/common/validators/custom-validators';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit, OnDestroy {

  public static readonly CHANGE_PROFILE_MODE: string = 'CHANGE_PROFILE';

  private showValidationsFields = false;
  private subscription: Subscription = new Subscription();

  public form: FormGroup;
  public isChangeProfile: boolean;

  constructor(private userService: UserService,
              private mws: ModalWindowService,
              private profileService: ProfileService,
              private routeNavigationService: RouteNavigationService,
              private route: ActivatedRoute) {
    this.isChangeProfile = route.snapshot.data['mode'] === RegistrationComponent.CHANGE_PROFILE_MODE;
  }

  ngOnInit() {
    if (this.isChangeProfile) {
      const user: User = this.profileService.userProfile;
      this.createProfileForm(user);
    } else {
      this.createSignUpForm();
    }
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  private createSignUpForm(): void {
    this.form = new FormGroup({
      'login': new FormControl('', [CustomValidators.required, CustomValidators.length(20, 4)], this.forbiddenLogin.bind(this)),
      'firstName': new FormControl('', [CustomValidators.required, CustomValidators.length(20, 2)]),
      'lastName': new FormControl('', [CustomValidators.required, CustomValidators.length(20, 2)]),
      'email': new FormControl('', [CustomValidators.required, CustomValidators.length(30, 3), Validators.email], this.forbiddenEmail.bind(this)),
      'phone': new FormControl('', [CustomValidators.required, CustomValidators.phoneValidator]),
      'password': new FormControl('', [CustomValidators.required, CustomValidators.length(null, 6)]),
      'confirmPassword': new FormControl('', [CustomValidators.required, CustomValidators.compareValidator('password')]),
    });
  }

  private createProfileForm(user: User): void {
    this.form = new FormGroup({
      'login': new FormControl(user.login, [CustomValidators.required, CustomValidators.length(20, 4)]),
      'firstName': new FormControl(user.firstname, [CustomValidators.required, CustomValidators.length(20, 2)]),
      'lastName': new FormControl(user.lastname, [CustomValidators.required, CustomValidators.length(20, 2)]),
      'email': new FormControl(user.email, [CustomValidators.required, CustomValidators.length(30, 3), Validators.email]),
      'phone': new FormControl(user.phone, [CustomValidators.required]),
      'password': new FormControl(user.password, [CustomValidators.required, CustomValidators.length(null, 6)]),
      'confirmPassword': new FormControl(user.password, [CustomValidators.required, CustomValidators.compareValidator('password')]),
    });
  }

  public action(): void {
    const titleForm = this.isChangeProfile ? 'Форма изменения личных данных' : 'Форма регистрации';
    if (this.form.invalid) {
      this.showValidationsFields = true;
      this.mws.openModalWindow(
        titleForm,
        'Пожалуйста корректно заполните данными все поля для регистрации в данной системе!',
        [{label: 'Ок'}]);
      return;
    } else {
      const user: User = {...this.form.value};
      if (this.isChangeProfile) {
       this.subscription = this.userService.changeUserData(this.profileService.userProfile.objectId, user)
          .subscribe((changedUserData) => {
            this.profileService.userProfile = changedUserData;
            const dialogRef = this.mws.openModalWindow(
              titleForm,
              'Учётная запись в данной системе  успешно изменена!',
              [{label: 'Ok'}]);
            dialogRef.afterClosed()
              .subscribe(() => {
                this.routeNavigationService.toAdverts();
              });
          });
      } else {
        this.subscription = this.userService.createNewUser(user).subscribe(() => {
          const dialogRef = this.mws.openModalWindow(
            titleForm,
            'Учётная запись успешно зарегистрированна в данной системе!',
            [{label: 'Ok'}]);
          dialogRef.afterClosed()
            .subscribe(() => {
              this.routeNavigationService.toSignIn();
            });
        });
      }
    }
  }

  public checkedControlValidations(controlName: string): boolean {
    const control = this.form.get(controlName);
    return control.invalid && control.touched ||
      this.showValidationsFields && control.invalid;
  }

  // TODO: requires optimization
  forbiddenEmail(control: FormControl): Observable<any> {
    return timer(1000).pipe(
      switchMap(() => {
        if (!control.value) {
          return of(null);
        }
        return this.userService.getUserByEmail(control.value)
          .pipe(map((user: User) => {
            return user ? {forbiddenEmail: true} : null;
          }));
      })
    );
  }

  // TODO: requires optimization
  forbiddenLogin(control: FormControl): Observable<any> {
    return timer(1000).pipe(
      switchMap(() => {
        if (!control.value) {
          return of(null);
        }
        return this.userService.getUserByLogin(control.value).pipe(
          map((user: User) => ( user ? {forbiddenLogin: true} : null))
        );
      })
    );
  }
}
