import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientComponent } from './client/client.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { SupplierComponent } from './supplier/supplier.component';

const routes: Routes = [
   {path : 'home', component: HomeComponent},
   {path : 'supplier', component: SupplierComponent},
   {path: 'client', component: ClientComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
