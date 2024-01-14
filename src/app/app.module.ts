import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './shared/header/header.component';
import { FooterComponent } from './shared/footer/footer.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { LoginComponent } from './auth/login/login.component';
import { NavComponent } from './shared/nav/nav.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { AdminComponent } from './pages/admin/admin.component';
import { UsersComponent } from './pages/users/users.component';
import { HomeComponent } from './shared/home/home.component';
import { EditComponent } from './pages/ventanas/admin/edit/edit.component';
import { CreateComponent } from './pages/ventanas/admin/create/create.component';
import { CreatehComponent } from './pages/ventanas/users/createh/createh.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    DashboardComponent,
    LoginComponent,
    NavComponent,
    AdminComponent,
    UsersComponent,
    HomeComponent,
    EditComponent,
    CreateComponent,
    CreatehComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    // Lo agregamos para el formulario.
    ReactiveFormsModule,
    RouterModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
