import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';

import {Advert} from '../../../../common/models/advert.interface';
import {RouteNavigationService} from 'src/app/common/routing/route-navigation.service';
import {AdvertService} from 'src/app/common/services/advert.service';
import {ModalWindowService} from 'src/app/common/services/modal-window.service';
import {ProfileService} from 'src/app/common/services/profile.service';
import {CustomValidators} from 'src/app/common/validators/custom-validators';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-new-advert',
  templateUrl: './new-advert.component.html',
  styleUrls: ['./new-advert.component.scss']
})
export class NewAdvertComponent implements OnInit, OnDestroy {

  private subscription: Subscription = new Subscription();

  public form: FormGroup;

  constructor(private advertService: AdvertService,
              private modalWindowService: ModalWindowService,
              private routeNavigationService: RouteNavigationService,
              private profileService: ProfileService) {
  }

  ngOnInit() {
    this.createForm();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  private createForm(): void {
    this.form = new FormGroup({
      'title': new FormControl('', [CustomValidators.required, CustomValidators.length(15, null)]),
      'category': new FormControl('', [CustomValidators.required]),
      'description': new FormControl('', [CustomValidators.required, CustomValidators.length(100, null)]),
      'price': new FormControl('', [CustomValidators.required])
    });
  }

  public createAdvert(): void {
    if (this.form.invalid) {
      this.modalWindowService.openModalWindow(
        'Новое объявление',
        'Новое объявление не добавленно в систему! Все поля на форме обязательно должны быть заполнены.',
        [{label: 'хорошо', action: true}]
      );
      return;
    }
    const {title, category, description, price} = this.form.value;
    const advert: Advert = {title, category, description, price, user_id: this.profileService.userProfile.objectId};

    this.subscription = this.advertService.createAdvert(advert)
      .subscribe((createdAdvert) => {
        const dialogRef =   this.modalWindowService.openModalWindow(
          'Новое объявление',
          'Новое объявление успешно добавленно в систему!',
          [{label: 'хорошо', action: true}]
        );

        dialogRef.afterClosed()
          .subscribe(() => {
            this.advertService.createView(createdAdvert.objectId);
            this.routeNavigationService.toAdverts();
          });
      });
  }

  public checkedControlValidations(controlName: string): boolean {
    return this.form.controls[controlName].invalid && this.form.controls[controlName].touched;
  }
}
