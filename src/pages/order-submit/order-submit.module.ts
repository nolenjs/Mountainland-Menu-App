import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { OrderSubmitPage } from './order-submit';

@NgModule({
  declarations: [
    OrderSubmitPage,
  ],
  imports: [
    IonicPageModule.forChild(OrderSubmitPage),
  ],
})
export class OrderSubmitPageModule {}
