import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class DataService {

    private messageSource = new BehaviorSubject<string>("default message");
    currentMessage = this.messageSource.asObservable();

    constructor() { }

    changeName(message: string) {
        console.log(message);
        this.messageSource.next(message)
    }

}