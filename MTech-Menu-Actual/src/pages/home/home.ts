import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

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
export class HomePage {

  constructor(public navCtrl: NavController) {
  }

  gotToMenu() {
    this.navCtrl.push(MenuPage);
  }

  gotToLogin() {
    this.navCtrl.push(LoginPage);
  }
}


