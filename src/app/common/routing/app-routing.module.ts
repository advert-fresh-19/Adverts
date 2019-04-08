import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AuthGuard} from 'src/app/common/routing/auth.guard';
import {AdvertComponent} from 'src/app/components/system/adverts/list-adverts/advert.component';
import {DetailsAdvertComponent} from 'src/app/components/system/adverts/list-adverts/details-advert/details-advert.component';
import {MyAdvertsContainerComponent} from 'src/app/components/system/adverts/my-adverts/my-adverts-container.component';
import {NewAdvertComponent} from 'src/app/components/system/adverts/new-advert/new-advert.component';
import {LoginComponent} from 'src/app/components/system/authenticate/login/login.component';
import {RegistrationComponent} from 'src/app/components/system/authenticate/registration/registration.component';
import {ListUsersContainerComponent} from 'src/app/components/system/list-users/list-users-container.component';

const routes: Routes = [
  { path: '', redirectTo: '/adverts', pathMatch: 'full' },
  { path: 'adverts', component: AdvertComponent },
  { path: 'users', component: ListUsersContainerComponent },
  { path: 'new-advert', component: NewAdvertComponent, canActivate: [AuthGuard]},
  { path: 'my-adverts', component: MyAdvertsContainerComponent, canActivate: [AuthGuard]},
  { path: 'signin', component: LoginComponent },
  { path: 'signup', component: RegistrationComponent },
  { path: 'profile', component: RegistrationComponent , data: {mode: 'CHANGE_PROFILE'}, canActivate: [AuthGuard]},
  { path: 'advert/:id', component: DetailsAdvertComponent}
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule { }
