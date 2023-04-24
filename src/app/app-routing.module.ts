import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './modules/login/login.component';
import { RegisterComponent } from './modules/register/register.component';
import { ProfileComponent } from './modules/profile/profile.component';
import { SearchResultsComponent } from './modules/search-results/search-results.component';
import { SubredditComponent } from './modules/subreddit/subreddit.component';
import { HomeComponent } from './modules/home/home.component';
import { InnerAppComponent } from './inner-app.component';
import { ReportsComponent } from './modules/reports/reports.component';

const routes: Routes = [
  { path: '', redirectTo: '/app/home', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  {
    path: 'app',
    component: InnerAppComponent,
    children: [
      { path: 'home', component: HomeComponent },
      { path: 'profile/:uid', component: ProfileComponent },
      { path: 'search/:query', component: SearchResultsComponent },
      { path: 'subreddit/:name', component: SubredditComponent },
      { path: 'reports', component: ReportsComponent }
    ]
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
