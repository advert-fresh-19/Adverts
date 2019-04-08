import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatDialogModule} from '@angular/material';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NgxPaginationModule} from 'ngx-pagination';

import {AppComponent} from 'src/app/app.component';
import {AppRoutingModule} from 'src/app/common/routing/app-routing.module';
import {RouteNavigationService} from 'src/app/common/routing/route-navigation.service';
import {AdvertService} from 'src/app/common/services/advert.service';
import {LoaderInterceptorService} from 'src/app/common/services/loader-interceptor.service';
import {LoaderService} from 'src/app/common/services/loader.service';
import {ModalWindowService} from 'src/app/common/services/modal-window.service';
import {ProfileService} from 'src/app/common/services/profile.service';
import {UserService} from 'src/app/common/services/user.service';
import {CAdvartComponent} from 'src/app/common/ui-components/advart/advart.component';
import {InputRestricterDirective} from 'src/app/common/ui-components/directives/input-restrict.directive';
import {HeaderComponent} from 'src/app/components/header/header.component';
import {AdvertComponent} from 'src/app/components/system/adverts/list-adverts/advert.component';
import {MyAdvertsContainerComponent} from 'src/app/components/system/adverts/my-adverts/my-adverts-container.component';
import {NewAdvertComponent} from 'src/app/components/system/adverts/new-advert/new-advert.component';
import {LoginComponent} from 'src/app/components/system/authenticate/login/login.component';
import {RegistrationComponent} from 'src/app/components/system/authenticate/registration/registration.component';
import {LoaderComponent} from './common/ui-components/loader/loader.component';
import {ModalWindowComponent} from './common/ui-components/modal-window/modal-window.component';
import {MainMenuComponent} from './components/header/main-menu/main-menu.component';
import {ProfileMenuComponent} from './components/header/profile-menu/profile-menu.component';
import {DetailsAdvertComponent} from './components/system/adverts/list-adverts/details-advert/details-advert.component';
import {MyAdvertsComponent} from './components/system/adverts/my-adverts/my-adverts.component';
import {BreadcrumbPaginationComponent} from 'src/app/common/ui-components/breadcrumb-pagination/breadcrumb-pagination.component';
import { ListUsersComponent } from './components/system/list-users/list-users.component';
import {ListUsersContainerComponent} from 'src/app/components/system/list-users/list-users-container.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginComponent,
    RegistrationComponent,
    AdvertComponent,
    CAdvartComponent,
    NewAdvertComponent,
    ProfileMenuComponent,
    MainMenuComponent,
    MyAdvertsComponent,
    MyAdvertsContainerComponent,
    ModalWindowComponent,
    DetailsAdvertComponent,
    LoaderComponent,
    InputRestricterDirective,
    BreadcrumbPaginationComponent,
    ListUsersComponent,
    ListUsersContainerComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxPaginationModule,
    MatDialogModule,
  ],
  entryComponents: [
    ModalWindowComponent,
  ],
  providers: [UserService, RouteNavigationService, ProfileService, AdvertService, ModalWindowService, LoaderService,   {
    provide: HTTP_INTERCEPTORS,
    useClass: LoaderInterceptorService,
    multi: true
  }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
