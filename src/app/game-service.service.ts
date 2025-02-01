import { Injectable } from '@angular/core';
import { PlayerDetails } from './clash.interface';

@Injectable({
  providedIn: 'root'
})
export class GameServiceService {

  constructor() { }

  playerDetails: PlayerDetails = {
    playerName: '',
    playerClass: '',
    selectedClassIndex: 0
  }


  scores = [
    {name: 'max', class: 'ABN', score: 710000},
    {name: 'lulu', class: 'DMH', score: 50000}
  ]

  classes = [
    {
      name: 'Asia Bot Network',
      tag: 'ABN',
      startMoney: 3500,
      itSecurity: 85,
      walletspace: 115,
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
    {
      name: 'Donald Musk Holding',
      tag: 'DMH',
      startMoney: 7000,
      itSecurity: 75,
      walletspace: 100,
      attributes: {
        attOne: {
          description: '+ 2.000 $ Starting Money',
          value: 2000
        },
        attTwo: {
          description: '- 10 IT-Security',
          value: -10
        },
      }
    },
    {
      name: 'Breaucracy Empire',
      tag: 'BCE',
      startMoney: 5000,
      itSecurity: 95,
      walletspace: 90,
      attributes: {
        attOne: {
          description: '+ 10 IT-Security',
          value: 10
        },
        attTwo: {
          description: '- 10 Hardware Wallet Space',
          value: -10
        },
      }
    },
  ]





}
