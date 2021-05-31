import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuComponent } from './menu/menu.component';
import { RouterModule } from '@angular/router';
import { TransacctionComponent } from './transacction/transacction.component';
import { CheckTransacctionComponent } from './check-transacction/check-transacction.component';
import { CheckBlocksComponent } from './check-blocks/check-blocks.component';
import { FormsModule } from '@angular/forms';
import { TokensComponent } from './tokens/tokens.component';
import { CurrencyCommaPipe } from './../Pipe/currency-comma.pipe';
import { ChartTransacctionsComponent } from './chart-transacctions/chart-transacctions.component';


@NgModule({
  declarations: [
    MenuComponent,
    TransacctionComponent,
    CheckTransacctionComponent,
    CheckBlocksComponent,
    TokensComponent,
    CurrencyCommaPipe,
    ChartTransacctionsComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule
  ],
  exports: [
    MenuComponent,
    TransacctionComponent,
    CheckTransacctionComponent,
    CheckBlocksComponent,
    CurrencyCommaPipe,
    ChartTransacctionsComponent
  ]
})
export class SharedModule { }
