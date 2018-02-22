import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams, ToastController} from 'ionic-angular';
import {AngularFireDatabase} from 'angularfire2/database';

/**
 * Generated class for the OrderSubmitPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
    selector: 'page-order-submit',
    templateUrl: 'order-submit.html',
    styles: [`
        ion-content {
            background-color: white;
        }

        ion-card {
            margin: auto;
            max-width: 400px;

        }

        ion-card-content {
            display: flex;
            flex-direction: row;
            justify-content: center;
            align-items: center;
        }

        .hover-delete {
            visibility: hidden;
        }

        .menu-item:hover .hover-delete {
            visibility: visible;
        }



    `]
})

export class OrderSubmitPage {
    orderInformation;

    name;

    constructor(public navCtrl: NavController,
                public navParams: NavParams,

<<<<<<< HEAD
                public toastCtrl: ToastController,
                public db: AngularFireDatabase) {
        this.orderInformation = this.navParams.data[0];
        this.name = this.navParams.data[2];
=======
              public toastCtrl: ToastController,
              public db: AngularFireDatabase) {
     this.orderInformation = this.navParams.data[0];
     this.name = this.navParams.data[2];
>>>>>>> 0449456f7f4fa6cadd9a4532556185f6f0aa85e8

    }

    confirm() {
        // this.confirmOrder.push();

        let toast = this.toastCtrl.create({
                message: `Your order has been sent`,
                duration: 1000,
                position: 'top'
            }
        );

        toast.present();
    }

    delete(index){
        (this.orderInformation.items).splice(index, 1);
    };

    ionViewDidLoad() {
        console.log('ionViewDidLoad OrderSubmitPage');

        console.log(this.orderInformation);
        console.log('Name: ' + this.name);
    }

    submitOrder() {

        console.log('pushing order');

<<<<<<< HEAD
        let itemsRef = this.db.list('orderInfo');
        itemsRef.push({ order: this.orderInformation, name: this.name });
=======
      let itemsRef = this.db.list('orderInfo');
      itemsRef.push({ order: this.orderInformation, name: this.name });
>>>>>>> 0449456f7f4fa6cadd9a4532556185f6f0aa85e8

        let toast = this.toastCtrl.create({
            message: `Order Sent`,
            duration: 1000,
            position: 'top'
        });

        toast.present();

    }


}