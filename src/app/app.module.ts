import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SubredditComponent } from './modules/subreddit/subreddit.component';
import { SearchResultsComponent } from './modules/search-results/search-results.component';
import { RegisterComponent } from './modules/register/register.component';
import { ProfileComponent } from './modules/profile/profile.component';
import { LoginComponent } from './modules/login/login.component';
import { HomeComponent } from './modules/home/home.component';
import { HttpClientModule } from '@angular/common/http';
import { InnerAppComponent } from './inner-app.component';
import { ReportsComponent } from './modules/reports/reports.component';
import { FormsModule } from '@angular/forms';
import { CommentsComponent } from './modules/comments/comments.component';

@NgModule({
  declarations: [
    AppComponent,
    InnerAppComponent,
    SubredditComponent,
    SearchResultsComponent,
    RegisterComponent,
    ProfileComponent,
    LoginComponent, 
    HomeComponent,
    ReportsComponent,
    CommentsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
