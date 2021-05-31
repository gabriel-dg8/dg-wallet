import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountComponent } from './account/account.component';
import { CheckBlocksComponent } from './shared-module/check-blocks/check-blocks.component';
import { CreateAccountComponent } from './create-account/create-account.component';
import { SignOutGuard } from './Guard/sign-out.guard';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { CheckTransacctionComponent } from './shared-module/check-transacction/check-transacction.component';

const routes: Routes = [
  { path: "", component: HomeComponent, pathMatch: "full" },
  //{ path: 'login', component: LoginComponent, canActivate: [SignOutGuard] },
  { path: 'blocks', component: CheckBlocksComponent, canActivate: [SignOutGuard] },
  { path: 'block/:transaction', component: CheckTransacctionComponent, canActivate: [SignOutGuard] },
  { path: 'account/:address', component: AccountComponent },
  //{ path: 'create/account', component: CreateAccountComponent, canActivate: [SignOutGuard] },
  {
    path: 'dg', loadChildren: () => import('./sign-account/sign-account.module').then(m => m.SignAccountModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
