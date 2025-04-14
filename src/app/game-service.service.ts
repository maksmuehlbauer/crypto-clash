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

  quotes = [
    "The blockchain must serve the algorithmic harmony of the state. - Xi Botping",
    "Obedience is freedom, disobedience is inefficient. - Xi Botping",
    "We upgraded the people. Democracy 2.0 is now bug-free. - Xi Botping",
    "A single truth, stored immutably in the PartyChain. - Xi Botping",  
    "Failure is the best business model. Unless you fail wrong. - Donald Musk XXIV",
    "I built a rocket, a casino, and a presidency. In that order. - Donald Musk XXIV",
    "Truth is what gets the most retweets. - Donald Musk XXIV",
    "We’re gonna mine Mars. Freedom needs rare earths. - Donald Musk XXIV",  
    "In uncertainty lies control. Predictability is for the weak. - PutAI-64",
    "The future is encrypted. Only power holds the key. - PutAI-64",
    "Empires collapse. Algorithms endure. - PutAI-64",
    "I do not invade. I optimize borders. - PutAI-64",  
    "We formed a committee to approve the committee to evaluate action. - BureauBot von der Leyda",
    "Compliance is the new revolution. - BureauBot von der Leyda",
    "The digital passport will set you free. If approved. - BureauBot von der Leyda",  
    "Feelings are just outdated code. Let’s rewrite humanity. - Zuckenberg 3000",
    "Your privacy is safe with us. Until beta is over. - Zuckenberg 3000",
    "I don’t need friends. I have users. - Zuckenberg 3000"
  ];


  scores: object[] = [
    {name: 'max', class: 'ABN', score: 710000},
    {name: 'lulu', class: 'DMH', score: 5000},
    {name: 'Test1', class: 'DMH', score: 60000000}
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
      value: 27500,
    },
    {
      name: 'Litecoin',
      tag: 'LTC',
      value: 150,
    },
    {
      name: 'Ripple',
      tag: 'XRP',
      value: 90,
    },
    {
      name: 'Cardano',
      tag: 'ADA',
      value: 920,
    },
    {
      name: 'Trump Coin',
      tag: 'TRUMP',
      value: 90000,
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
      startMoney: 4500,
      itSecurity: 0.85,
      walletspace: 115,
      attributes: {
        attOne: {
          description: '+ 15 Hardware Wallet Space',
          value: 15
        },
        attTwo: {
          description: '- 500 $ Starting Money',
          value: -500
        },
      }
    },
    {
      name: 'Donald Musk Holding',
      tag: 'DMH',
      startMoney: 10000,
      itSecurity: 0.80,
      walletspace: 100,
      attributes: {
        attOne: {
          description: '+ 5.000 $ Starting Money',
          value: 5000
        },
        attTwo: {
          description: '- 5 IT-Security',
          value: -5
        },
      }
    },
    {
      name: 'Breaucracy Empire',
      tag: 'BCE',
      startMoney: 5000,
      itSecurity: 0.95,
      walletspace: 85,
      attributes: {
        attOne: {
          description: '+ 10 IT-Security',
          value: 10
        },
        attTwo: {
          description: '- 15 Hardware Wallet Space',
          value: -15
        },
      }
    },
  ]
}



