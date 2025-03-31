import { Component, inject, OnInit } from '@angular/core';
import { GameServiceService } from '../game-service.service';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { BuyMenuComponent } from '../menues/buy-menu/buy-menu.component';
import { BuyTransactionValues, SellTransactionValues, wallet } from '../clash.interface';
import { SellMenuComponent } from "../menues/sell-menu/sell-menu.component";
import { InfoMenuComponent } from "../menues/info-menu/info-menu.component";


@Component({
  selector: 'app-game-board',
  standalone: true,
  imports: [RouterModule, CommonModule, BuyMenuComponent, SellMenuComponent, InfoMenuComponent],
  templateUrl: './game-board.component.html',
  styleUrl: './game-board.component.scss'
})
export class GameBoardComponent implements OnInit {
  gameService = inject(GameServiceService);

  startingDay:number = 28;
  finishDay:number = 30;
  dailyExchangeOffer:any[] = [];
  dailyExchangeIndexes: any[] = [];
  classIndex = this.gameService.playerDetails.selectedClassIndex;
  currentMoney: number = this.startMoney;
  currentWalletSpace:number = this.walletSpace;
  currentWalletCount: number = 0;
  currentItSecurity: number = this.itSecurity;
  toggleBuyMenu: boolean = false;
  toggleSellMenu: boolean = false;
  toggleInfoMenu: boolean = false;
  selectedBuyIndex: number = 0;
  wallet: wallet[] = [
    {
      name: 'Bitcoin',
      tag: 'BTC',
      buyAt: 175000,
      count: 10
    },
    {
      name: 'Musk Coin',
      tag: 'MUSK',
      buyAt: 6200,
      count: 10
    },
    {
      name: 'TEST',
      tag: 'TEST',
      buyAt: 1,
      count: 1
    },
  ];
  sendingBuyValues = {
    currMoney: this.currentMoney,
    currWalletSpace: this.currentWalletSpace,
    currWalletCount: this.currentWalletCount,
    selectedCoin: this.dailyExchangeOffer[this.selectedBuyIndex],
    currWallet: this.wallet
  };
  sendingSellValues = {
    currMoney: this.currentMoney,
    currWallet: this.wallet,
    currCoinPrice: this.dailyExchangeOffer[0],
    currWalletIndex: 0
  }
  qoute: string = this.gameService.quotes[1]

  openSellOrder(i: number) {
    let selectedCoin = this.wallet[i]
    //array.some() --->  check the Array for "true" if no "true" found callback a single "false"
    const index = this.dailyExchangeOffer.findIndex( coinInExchange => 
      selectedCoin.tag === coinInExchange.tag 
    );
    if(index !== -1) {
      this.sendingSellValues = {
        currMoney: this.currentMoney,
        currWallet: this.wallet,
        currCoinPrice: this.dailyExchangeOffer[index],
        currWalletIndex: i
      }
      this.toggleSellMenu = !this.toggleSellMenu
    } else {
      // coin not found on exchange
      this.openInfoMenu()
    }
  }

  openInfoMenu() {
    this.toggleInfoMenu = !this.toggleInfoMenu
  }

  ngOnInit(): void {
    this.getRandomCurrencys();
    // this.changeQuotes()
  }

  nextDay() {
    this.startingDay++
    this.getRandomCurrencys()
    if (this.startingDay > this.finishDay ) {
      alert('game Complete')
      this.startingDay = 30;
    }
  }

  changeQuotes() {
    let currentQuote = 0;
    setInterval(() => {
      currentQuote = (currentQuote + 1) % this.gameService.quotes.length;
      this.qoute = this.gameService.quotes[currentQuote];
    }, 1000 );

  }
  
  receiveBuyTransaction(data: BuyTransactionValues) {
    const receiveBuyOrder = data;
    this.toggleBuyMenu = receiveBuyOrder.toggleMenu;
    this.currentMoney = receiveBuyOrder.currMoney;
  }

  receiveSellTransaction(data: SellTransactionValues) {
    const receiveSellOrder = data;
    this.toggleSellMenu = receiveSellOrder.toggleMenu;
    this.currentMoney = receiveSellOrder.currMoney
  }

  receiveInfoMsg(newState: boolean) {
    this.toggleInfoMenu = newState
  }


  openBuyOrder(i: number) {
    this.toggleBuyMenu = !this.toggleBuyMenu;
    this.updateInputValues(i);
  }

  
  updateInputValues(i: number) {
    return this.sendingBuyValues = {
      currMoney: this.currentMoney,
      currWalletSpace: this.currentWalletSpace,
      currWalletCount: this.currentWalletCount,
      selectedCoin: this.dailyExchangeOffer[i],
      currWallet: this.wallet
    }
    
  }

  generateRandomIndexValue() {
    const min = 5;
    const max = this.gameService.currencys.length;
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }


  generateRandomPercentageValue() {
    const min = 0.75;
    const max = 1.25;
    return Math.random() * (max - min) + min;
  }


  getRandomCurrencyIndexes() {
    const numberOfMaxValues = this.generateRandomIndexValue();
    this.dailyExchangeIndexes = []

    while (this.dailyExchangeIndexes.length < numberOfMaxValues) {
      const randomIndex = Math.floor(Math.random() * this.gameService.currencys.length)
      if (!this.dailyExchangeIndexes.includes(randomIndex)) {
        this.dailyExchangeIndexes.push(randomIndex)
      }
    }
    return this.dailyExchangeIndexes.sort();
  };


  getRandomCurrencys() {
    this.dailyExchangeOffer = [];
    const randomIndexes = this.getRandomCurrencyIndexes() 
    for (let i = 0; i < this.dailyExchangeIndexes.length; i++) {
      const currencyIndex = this.dailyExchangeIndexes[i];
      this.dailyExchangeOffer.push(this.gameService.currencys[currencyIndex])
      const defaultCurrencyValue = this.dailyExchangeOffer[i].value
      this.dailyExchangeOffer[i].value = Math.floor(defaultCurrencyValue * this.generateRandomPercentageValue())
    }
  };

    // a getter "get" refresh the variable at anytime they are called into the template
    get calculateWalletSpace() {
      this.currentWalletCount = 0;
      this.wallet.forEach(walletPos => {
        this.currentWalletCount += walletPos.count
      });
      return this.currentWalletCount
    }
  
    get walletSpace() {
      return this.gameService.classes[this.classIndex].walletspace;
    }
  
    get startMoney() {
      return this.gameService.classes[this.classIndex].startMoney;
    }
  
    get classTag() {
      return this.gameService.classes[this.classIndex].tag;
    }
  
    get itSecurity() {
      return this.gameService.classes[this.classIndex].itSecurity;
    }
}
