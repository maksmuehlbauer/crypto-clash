import { Component, inject, OnInit } from '@angular/core';
import { GameServiceService } from '../game-service.service';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { BuyMenuComponent } from '../menues/buy-menu/buy-menu.component';
import { BuyTransactionValues, SellTransactionValues, wallet } from '../clash.interface';
import { SellMenuComponent } from "../menues/sell-menu/sell-menu.component";
import { InfoMenuComponent } from "../menues/info-menu/info-menu.component";
import { GameEndMenuComponent } from "../menues/game-end-menu/game-end-menu.component";



@Component({
  selector: 'app-game-board',
  standalone: true,
  imports: [RouterModule, CommonModule, BuyMenuComponent, SellMenuComponent, InfoMenuComponent, GameEndMenuComponent],
  templateUrl: './game-board.component.html',
  styleUrl: './game-board.component.scss'
})
export class GameBoardComponent implements OnInit {
  gameService = inject(GameServiceService);

  startingDay:number = 0;
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
  coinNotExistMenu: boolean = false;
  toggleGameEndMenu: boolean = false;
  toggleBullBearMenu: boolean = false;
  bearOrBullMarket: string = '';
  eventCoin: any = {}
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
      name: 'TEST1',
      tag: 'ZZZ',
      buyAt: 61616161,
      count: 10
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
  sendProfitScore = {
    currMoney: this.currentMoney
  }
  sendExchangeEvent = {
    eventInfo: this.bearOrBullMarket,
    eventCoinObj: this.eventCoin
  }


  // qoute: string = this.gameService.quotes[1]

  ngOnInit(): void {
    this.handleExchangeOffer();
  }


  openSellOrder(i: number) {
    let selectedCoin = this.wallet[i]
    //array.some() --->  check the Array for "true" if no "true" found callback a single "false"
    const index = this.dailyExchangeOffer.findIndex( coinInExchange => 
      selectedCoin.tag === coinInExchange.tag 
    );
    if(index !== -1) {
      this.updateSellValues(index, i)
      this.toggleSellMenu = !this.toggleSellMenu
    } else {
      // coin not found on exchange
      this.coinNotExistMenu = !this.coinNotExistMenu
    }
  }

  updateSellValues(index: number, i: number) {
    return this.sendingSellValues = {
      currMoney: this.currentMoney,
      currWallet: this.wallet,
      currCoinPrice: this.dailyExchangeOffer[index],
      currWalletIndex: i
    }
  }


  nextDay() {
    this.startingDay++
    this.handleExchangeOffer();
    if (this.startingDay > this.finishDay ) {
      this.startingDay = 30;
      this.toggleGameEndMenu = !this.toggleGameEndMenu

    }
    this.updateFinalScore();
  }

  updateFinalScore() {
    return this.sendProfitScore = {
      currMoney: this.currentMoney
    }
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
    this.coinNotExistMenu = newState
    this.toggleBullBearMenu = newState
  }


  openBuyOrder(i: number) {
    this.toggleBuyMenu = !this.toggleBuyMenu;
    this.updateBuyValues(i);
  }

  
  updateBuyValues(i: number) {
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

  generateBullBearMarketPercentages() {
    const bullMultiplier = 10;
    const bearMultiplier = 0.01;
    const coinToss = 0.5;
    if (Math.random() < coinToss) {
      return bearMultiplier
      } else {
      return bullMultiplier
      }
    }


  handleBearBullEvent(randomValue: number, randomIndexes: any) {
    if (randomValue > 0.85) {
      const randomCoinIndex = Math.floor(Math.random() * randomIndexes.length)
      this.eventCoin = this.dailyExchangeOffer[randomCoinIndex]
      const newValue = this.eventCoin.value * this.generateBullBearMarketPercentages()
      this.bearOrBullMarket = this.eventCoin.value > newValue ? 'Bear' : 'Bull'
      this.dailyExchangeOffer[randomCoinIndex].value = newValue
      this.toggleBullBearMenu = !this.toggleBullBearMenu
      this.updateExchangeEvent();
    } 
  }  

  updateExchangeEvent() {
    return this.sendExchangeEvent = {
      eventInfo: this.bearOrBullMarket,
      eventCoinObj: this.eventCoin
    }
  }

  // implement on ngOninit
  handleExchangeOffer() {
    this.dailyExchangeOffer = [];
    const randomValue = Math.random()
    const randomIndexes = this.getRandomCurrencyIndexes() 
    for (let i = 0; i < this.dailyExchangeIndexes.length; i++) {
      const currencyIndex = this.dailyExchangeIndexes[i];
      this.dailyExchangeOffer.push({...this.gameService.currencys[currencyIndex]}) // (...{}) creates a copy of the original, Spread operator
      const defaultCurrencyValue = this.dailyExchangeOffer[i].value
      this.dailyExchangeOffer[i].value = Math.floor(defaultCurrencyValue * this.generateRandomPercentageValue())
    }
    this.handleBearBullEvent(randomValue, randomIndexes)
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
