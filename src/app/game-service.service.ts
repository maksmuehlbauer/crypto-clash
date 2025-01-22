import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GameServiceService {

  constructor() { }

  classes = {
    ABN: {
      name: 'Asia Bot Network',
      attributes: {
        attOne: {
          description: '+ 15 Hardware Wallet Space',
          value: 15
        },
        attTwo: {
          description: '- 1.500 $ Starting Money',
          value: -1500
        },
      }
    },
  }
}
