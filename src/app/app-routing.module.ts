import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddMovieComponent } from './components/add-movie/add-movie.component';
import { BookTicketsComponent } from './components/book-tickets/book-tickets.component';
import { ForgetPasswordComponent } from './components/forget-password/forget-password.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { SearchMovieComponent } from './components/search-movie/search-movie.component';
import { ShowAllMoviesComponent } from './components/show-all-movies/show-all-movies.component';
import { AdminGuard } from './guards/admin.guard';
import { BackToLoginGuard } from './guards/back-to-login.guard';
import { LoginGuard } from './guards/login.guard';

const routes: Routes = [
  {
    path: '',
    component: ShowAllMoviesComponent,
    pathMatch: 'full',
  },
  {
    path: 'login',
    component: LoginComponent,
    pathMatch: 'full',
    canActivate: [BackToLoginGuard],
  },
  {
    path: 'forgetPassword',
    component: ForgetPasswordComponent,
    pathMatch: 'full',
    canActivate: [BackToLoginGuard],
  },
  {
    path: 'register',
    component: RegisterComponent,
    pathMatch: 'full',
    canActivate: [BackToLoginGuard],
  },
  {
    path: 'bookTicket/:movieName/:theatherName',
    component: BookTicketsComponent,
    pathMatch: 'full',
    canActivate: [LoginGuard],
  },
  {
    path: 'movie/add',
    component: AddMovieComponent,
    pathMatch: 'full',
    canActivate: [LoginGuard, AdminGuard],
  },
  {
    path: 'movies/search/:moviename',
    component: SearchMovieComponent,
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
