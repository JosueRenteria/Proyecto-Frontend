import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { LoginComponent } from './auth/login/login.component';
import { EditComponent } from './pages/ventanas/admin/edit/edit.component';
import { CreateComponent } from './pages/ventanas/admin/create/create.component';
import { CreatehComponent } from './pages/ventanas/users/createh/createh.component';


const routes: Routes = [
  // Rutas del Path de nuestros diferentes componenetes
  { path: '', redirectTo: '/inicio', pathMatch: 'full' },
  { path: 'inicio', component: DashboardComponent },
  { path: 'inicio-sesion', component: LoginComponent },
  { path: 'edit-admin', component: EditComponent},
  { path: 'create-admin', component: CreateComponent},
  { path: 'create-user', component: CreatehComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
