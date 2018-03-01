import { Component } from "@angular/core";
import {
  IonicPage,
  NavController,
  NavParams,
  ToastController
} from "ionic-angular";
import { AngularFireDatabase } from "angularfire2/database";
import { HomePage } from "../home/home";

/**
 * Generated class for the OrderSubmitPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-order-submit",
  templateUrl: "order-submit.html",
  styleUrls: ['/src/pages/order-submit/order-submit.css']
})
export class OrderSubmitPage {
  orderInformation;

  name;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public toastCtrl: ToastController,
    public db: AngularFireDatabase
  ) {
    this.orderInformation = this.navParams.data[0];
    console.log(this.orderInformation);
    this.name = this.navParams.data[1];
  }

  home() {
    this.navCtrl.push(HomePage, this.navParams[1]);
  }

  confirm() {
    // this.confirmOrder.push();

    let toast = this.toastCtrl.create({
      message: `Your order has been sent`,
      duration: 1000,
      position: "top"
    });

    toast.present();
  }

  delete(index) {
    this.orderInformation.items.splice(index, 1);
  }

  ionViewDidLoad() {
    console.log("ionViewDidLoad OrderSubmitPage");

    console.log(this.orderInformation);
    console.log("Name: " + this.name);
  }

  submitOrder() {
    console.log("pushing order");

    let itemsRef = this.db.list("orderInfo");
    itemsRef.push({ order: this.orderInformation, /*name: this.name*/ });

    let toast = this.toastCtrl.create({
      message: `Order Sent`,
      duration: 1000,
      position: "top"
    });

    toast.present();
  }
}
