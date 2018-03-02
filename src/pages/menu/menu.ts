import { Component } from '@angular/core';
import {AlertController, NavController, ToastController} from 'ionic-angular';
import { MenuApiProvider } from '../../providers/menu-api/menu-api';
import {OrderSubmitPage} from "../order-submit/order-submit";
import {LoginPage} from "../login/login";
import * as firebase from 'firebase/app';

/**
 * Generated class for the MenuPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
    selector: 'page-menu',
    templateUrl: 'menu.html',
})
export class MenuPage {

  private breakfastOpenTime: number = 8;
  private breakfastCloseTime: number = 10;

  private lunchOpenTime: number = 11;
  private lunchCloseTime: number = 20;

  private wednesday: number = 3;
  private friday: number = 5;


  private itsWednesday = false;
  private itsFriday = false;

  private breadType;
  private numberOfEggs;
  private styleOfEggs;
  private meat;
  private cheese;

  private foodOptions;

  hour = new Date().getHours();
  minutes = new Date().getMinutes();
  day = new Date().getDay();

  breakfastInfo: any;
  lunchInfo: any;
  breakfastTime: boolean;
  lunchTime: boolean;


  orderPrice = [];
  orderItems = [];
  date = new Date();

    omeletToppings = [
        {
            name: 'Peppers',
            checked: false
        },
        {
            name: 'Mushrooms',
            checked: false
        },
        {
            name: 'Onions',
            checked: false
        },
        {
            name: 'Tomatoes',
            checked: false
        },
        {
            name: 'Bacon',
            checked: false
        },
        {
            name: 'Ham',
            checked: false
        },
        {
            name: 'Sausage',
            checked: false
        },
        {
            name: 'Cheddar Cheese',
            checked: false
        },
    ];

  constructor(
    public navCtrl: NavController,
    public menuProvider: MenuApiProvider,
    public toastCtrl: ToastController,
    public alertCtrl: AlertController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MenuPage');

    this.date = new Date('February 21, 2018 8:01:00'); //23 = friday 21 = wednesday
    this.day = this.date.getDay();

    this.updateTime();
    this.menuChecker();
  }

  menuChecker(){

    this.hour = this.date.getHours();
    this.minutes = this.date.getMinutes();

    console.log('hour: ' + this.hour);
    console.log('minutes: ' + this.minutes);

    if (this.hour >= this.breakfastOpenTime && this.hour < this.breakfastCloseTime
      || (this.hour == this.breakfastCloseTime && this.minutes <= 30)) {

      this.getBreakfast();
      this.breakfastTime = true;
      this.lunchTime = false;
    }

    else if (this.hour >= this.lunchOpenTime && this.hour < this.lunchCloseTime
      || (this.hour == this.breakfastCloseTime && this.minutes >= 30)) {
      this.getLunchAndDinner();
      this.breakfastTime = false;
      this.lunchTime = true;
    }

    if(this.day === this.wednesday ){
      this.itsWednesday = true;
    }
    if(this.day === this.friday ){
      this.itsFriday = true;
    }


  }

  updateTime(){
    setInterval(() => {

      this.date = new Date();
      console.log('changed' + this.date);

      this.menuChecker();

    }, 60000);//60000 for a minute
  }

  getBreakfast() {
    this.menuProvider.getBreakfastMenuData().subscribe((breakfastMenu: any) => {
      this.breakfastInfo = breakfastMenu;

      console.log(this.breakfastInfo);
    });
  }

  getLunchAndDinner() {
    this.menuProvider.getLunchMenuData().subscribe((lunchMenu: any) => {
      this.lunchInfo = lunchMenu;

      console.log(this.lunchInfo);
    });
  }


  order(itemName, item) {

    this.orderItems.push(item);

    if(itemName === 'Breakfast Sandwich'){
        this.orderItems.push(`${this.breadType}, ${this.numberOfEggs}, ${this.styleOfEggs}, ${this.meat}, ${this.cheese}`);

        this.breadType = '' ;
        this.numberOfEggs = '';
        this.styleOfEggs = '' ;
        this.meat= '' ;
        this.cheese = '';
    }

    else if(itemName === 'Omelet'){
        for(let i = 0; i< this.omeletToppings.length; i++){
            if(this.omeletToppings[i].checked === true) {
                this.orderItems.push(this.omeletToppings[i].name);
            }
        }
    }

    else {
      if(this.foodOptions){
        this.orderItems.push(this.foodOptions);
        this.foodOptions = '';
      }
    }

    let toast = this.toastCtrl.create({
      message: `Your order of ${itemName} has been added`,
      duration: 1000,
      position: 'top'
    });

    console.log(this.orderItems);

    toast.present();
  }


  ordersubmitted(){
      firebase.auth().onAuthStateChanged((user) => {
          if (user || user !== null) {
              // User is signed in.
              console.log(user.displayName);
              this.navCtrl.setRoot(OrderSubmitPage, [{items: this.orderItems}, user.displayName])
          } else if (user === null){
              // User is signed out.
              let alert = this.alertCtrl.create({
                  title: 'Before You Submit...',
                  subTitle: 'You first need to login or register!!',
                  buttons: ['OK']
              });
              alert.present();

              this.navCtrl.push(LoginPage, [false, {items: this.orderItems}])
          }

      });
  }

  omeletItems(items){
      console.log('items: '+ items );
  }

}


// WEBPACK FOOTER //
// ./src/pages/menu/menu.ts
