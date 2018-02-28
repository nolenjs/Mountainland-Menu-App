import { Component } from '@angular/core';
import { NavController, ToastController } from 'ionic-angular';

import * as firebase from 'firebase/app';

import {MenuPage} from '../menu/menu';
import {LoginPage} from '../login/login';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  styles: [`
    ion-content{

      background-color: white;
    }
    .menuButtonBox{
      display: flex;
      flex-direction: row;
      justify-content: space-evenly;
      align-items: center;
      cursor: pointer;
      
    }
    
  `]
})
export class HomePage{
  //Login or logout button?
  login: boolean;

  constructor(public navCtrl: NavController, private toastCtrl: ToastController){
      console.log("ngOnInit");
      firebase.auth().onAuthStateChanged((user) => {
          user ? this.login = false : this.login = true;

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
          toast.present()
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


