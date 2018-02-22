import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import {LoginPage} from "../pages/login/login";
import {MenuPage} from '../pages/menu/menu';
import {HttpClientModule} from '@angular/common/http';
import {MenuApiProvider} from '../providers/menu-api/menu-api';

import { AngularFireAuthModule} from "angularFire2/auth";
import {AngularFireModule} from "angularfire2";
import * as firebase from 'firebase/app';
import { HttpModule } from '@angular/http';

let config = {
  apiKey: "AIzaSyCCsdWt5E2-79LatdNWu77rKi2Bpe2cWOw",
  authDomain: "mtechmenu.firebaseapp.com",
  databaseURL: "https://mtechmenu.firebaseio.com",
  projectId: "mtechmenu",
  storageBucket: "mtechmenu.appspot.com",
  messagingSenderId: "382312556211"
};
import {OrderSubmitPage} from "../pages/order-submit/order-submit";
import {AngularFireDatabase} from 'angularfire2/database';

firebase.initializeApp(config);

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LoginPage,
    MenuPage,
    OrderSubmitPage
  ],
  imports: [
    BrowserModule,
    AngularFireAuthModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(config),
    HttpClientModule,
      HttpModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LoginPage,
    MenuPage,
    OrderSubmitPage
  ],
  providers: [
    StatusBar,
      AngularFireDatabase,

    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    MenuApiProvider,
  ]
})
export class AppModule {}
