import { Component} from '@angular/core';
import { NavController, ToastController } from 'ionic-angular';

import * as firebase from 'firebase/app';

import {MenuPage} from '../menu/menu';
import {LoginPage} from '../login/login';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  styles: []
})
export class HomePage{
  //Login or logout button?

  loggedIn: boolean = false;
  logButtonTxt: string;

  constructor(public navCtrl: NavController, private toastCtrl: ToastController){}

  ionViewDidLoad(){
      console.log("ionViewDidLoad");
      firebase.auth().onAuthStateChanged((user) => {
          console.log('user', user);
          this.loggedIn = !!user;
          this.logButtonTxt = this.loggedIn ? "VIEW OUR MENU OR LOGOUT" : "LOGIN OR GO TO OUR MENU";
      });
  }

  logOut(){
      firebase.auth().signOut().then(() => {
          // Sign-out successful.
          let toast = this.toastCtrl.create({
              message: "Signed Out",
              duration: 1800,
              position: 'top'
          });
          toast.present();
      }).catch((error) => {
          // An error happened.
          console.error(error);
          let toast = this.toastCtrl.create({
              message: error.message,
              duration: 1800,
              position: 'top'
          });
          toast.present();
      });
  }

  gotToMenu() {
    this.navCtrl.push(MenuPage);
  }

  gotToLogin() {
    this.navCtrl.push(LoginPage);
  }
}


