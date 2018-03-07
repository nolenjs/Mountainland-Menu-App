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
  styleUrls: ['/src/pages/order-submit/order-submit.scss']
})
export class OrderSubmitPage {
  orderInformation;
  orderOptions;
  orderPrice=[];
  name;
  total: number = 0;
  length;

 



  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public toastCtrl: ToastController,
    public db: AngularFireDatabase
  ) {
    this.orderInformation = this.navParams.data[0];
    this.orderOptions = this.navParams.data[1];
    console.log('this.navParams', this.navParams);
    this.name = this.navParams.data[1];
    this.orderPrice = this.navParams.data[2];
  }

  home() {
    this.navCtrl.setRoot(HomePage, this.navParams[1]);
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
    this.total -= this.orderPrice[index];
    this.orderInformation.splice(index, 1);
  }

  totalPrice() {
    for(let i=0; i<this.orderPrice.length; i++){
      console.log("Price: " + this.orderPrice[i]);
      this.total += this.orderPrice[i];
      console.log("Subtotal:" + this.total)
    }
    console.log("Total: " + this.total);
    // this.orderPrice
  
  }

  ionViewDidLoad() {
    console.log("ionViewDidLoad OrderSubmitPage");
    this.totalPrice();

    // console.log(this.orderInformation);
    console.log("Name: " + this.name);
    console.log("orderPrice");
    console.log(this.orderPrice);
  
    console.log(this.orderInformation);
  }

  submitOrder() {
    console.log("pushing order");

    let itemsRef = this.db.list("orderInfo");
    
    itemsRef.push({ order: this.orderInformation, name: this.name });

    let toast = this.toastCtrl.create({
      message: `Order Sent`,
      duration: 1000,
      position: "top"
    });

    toast.present();
  }
}
