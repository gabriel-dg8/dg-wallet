import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DashBoardComponent } from './dash-board/dash-board.component';
import { RouterModule, Routes } from '@angular/router';
import { InfoAccountComponent } from './info-account/info-account.component';
import { SignAccountComponent } from './sign-account.component';
import { SendTransaccionComponent } from './send-transaccion/send-transaccion.component';
import { HttpClientModule } from '@angular/common/http';
import { SignInGuard } from '../Guard/sign-in.guard';
import { MyTransactionsComponent } from './my-transactions/my-transactions.component';
import { SharedModule } from '../shared-module/shared-module.module';
import { CheckTransacctionComponent } from '../shared-module/check-transacction/check-transacction.component';
import { CheckBlocksComponent } from '../shared-module/check-blocks/check-blocks.component';
import { TokensComponent } from '../shared-module/tokens/tokens.component';

const routes: Routes = [
  {
    path: '',
    component: SignAccountComponent,
    children: [
      { path: 'dashboard', component: DashBoardComponent, canActivate: [SignInGuard] },
      { path: 'send-transaccion', component: SendTransaccionComponent, canActivate: [SignInGuard] },
      { path: 'my-transaccions', component: MyTransactionsComponent, canActivate: [SignInGuard] },
      { path: 'block/:transaction', component: CheckTransacctionComponent, canActivate: [SignInGuard] },
      { path: 'blocks', component: CheckBlocksComponent, canActivate: [SignInGuard] },
      { path: 'tokens', component: TokensComponent, canActivate: [SignInGuard] }
    ]
  }
];

@NgModule({
  declarations: [
    DashBoardComponent,
    InfoAccountComponent,
    SignAccountComponent,
    SendTransaccionComponent,
    MyTransactionsComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forChild(routes),
    SharedModule
  ]
})
export class SignAccountModule { }
