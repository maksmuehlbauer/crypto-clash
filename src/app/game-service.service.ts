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

//   quotes = [
//     "We will make America great again. - Donald Trump",
//     "Amerika will never Forget your Trade, its a conclusion of national security - unknown",
//     "Innovation is the key to the future. - Elon Musk",
//     "Brexit means Brexit. - Boris Johnson",
//     "Bitcoin is the future of money. - Michael Saylor",
//     "Fake news is the enemy of the people. - Donald Trump",
//     "Failure is an option here. If things are not failing, you are not innovating enough. - Elon Musk",
//     "Let’s get Brexit done. - Boris Johnson",
//     "Bitcoin is a swarm of cyberhornets. - Michael Saylor",
//     "I love the poorly educated. - Donald Trump",
//     "Persistence is very important. You should not give up unless you are forced to give up. - Elon Musk"
// ]


  scores = [
    {name: 'max', class: 'ABN', score: 710000},
    {name: 'lulu', class: 'DMH', score: 50000}
  ]

  currencys = [
    {
      name: 'Bitcoin',
      tag: 'BTC',
      value: 245000,
    },
    {
      name: 'Ethereum',
      tag: 'ETH',
      value: 3500,
    },
    {
      name: 'Litecoin',
      tag: 'LTC',
      value: 150,
    },
    {
      name: 'Ripple',
      tag: 'XRP',
      value: 15,
    },
    {
      name: 'Cardano',
      tag: 'ADA',
      value: 920,
    },
    {
      name: 'Trump Coin',
      tag: 'TRUMP',
      value: 64000,
    },
    {
      name: 'Musk Coin',
      tag: 'MUSK',
      value: 15000,
    },
    {
      name: 'Shiba Inu',
      tag: 'SHIB',
      value: 14,
    },
    {
      name: 'Dogecoin',
      tag: 'DOGE',
      value: 23,
    },
    {
      name: 'Binance Coin',
      tag: 'BNB',
      value: 400,
    }
  ];

  classes = [
    {
      name: 'Asia Bot Network',
      tag: 'ABN',
      startMoney: 3500,
      itSecurity: 0.85,
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
      itSecurity: 0.75,
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
      itSecurity: 0.95,
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



