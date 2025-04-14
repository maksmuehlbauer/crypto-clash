import { Component, inject, OnInit } from '@angular/core';
import { GameServiceService } from '../game-service.service';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { BuyMenuComponent } from '../menues/buy-menu/buy-menu.component';
import { BuyTransactionValues, SellTransactionValues, wallet } from '../clash.interface';
import { SellMenuComponent } from "../menues/sell-menu/sell-menu.component";
import { InfoMenuComponent } from "../menues/info-menu/info-menu.component";
import { GameEndMenuComponent } from "../menues/game-end-menu/game-end-menu.component";
import { hackEvent } from '../clash.interface';



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
  currentMoney: number = 1300000000; //this.startMoney
  currentWalletSpace:number = this.walletSpace;
  currentWalletCount: number = 0;
  currentItSecurity: number = this.itSecurity;
  toggleBuyMenu: boolean = false;
  toggleSellMenu: boolean = false;
  coinNotExistMenu: boolean = false;
  toggleGameEndMenu: boolean = false;
  toggleBullBearMenu: boolean = false;
  toggleHackEventMenu: boolean = false;
  bearOrBullMarket: string = '';
  eventCoin: any = {}
  selectedBuyIndex: number = 0;
  stolenCoins: number = 0;
  stolenMoney: number = 0;
  stolenCoinTag: string = 'none';
  dayPlayerIsHackable: number = 10;
  wallet: wallet[] = [
    // {
    //   name: 'Bitcoin',
    //   tag: 'BTC',
    //   buyAt: 175000,
    //   count: 50
    // },
    // {
    //   name: 'Musk Coin',
    //   tag: 'MUSK',
    //   buyAt: 6200,
    //   count: 50
    // },
    // {
    //   name: 'TEST1',
    //   tag: 'ZZZ',
    //   buyAt: 61616161,
    //   count: 10
    // },
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
  sendHackEvent: hackEvent = {
    lostCoins: this.stolenCoins,
    lostMoney: this.stolenMoney,
    lostCoinTag: this.stolenCoinTag
  }



  ngOnInit(): void {
    this.handleExchangeOffer();
  }


  openSellOrder(i: number) {
    let selectedCoin = this.wallet[i]
    const index = this.dailyExchangeOffer.findIndex( coinInExchange => 
      selectedCoin.tag === coinInExchange.tag 
    );
    if(index !== -1) {
      this.updateSellValues(index, i)
      this.toggleSellMenu = !this.toggleSellMenu
    } else {
      this.openInfoMenu()
    }
  }


  openInfoMenu() {
    this.coinNotExistMenu = !this.coinNotExistMenu
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
    if (this.calculateWalletSecurity()) {
      this.toggleHackEventMenu = !this.toggleHackEventMenu
      this.walletHackEvent();
    }
    this.updateFinalScore();
  }

  calculateWalletSecurity() {
    return Math.random() > this.itSecurity && this.startingDay >= this.dayPlayerIsHackable
  }


  walletHackEvent() {
    const pickPocketPercent = Math.random() * (0.9 - 0.7) +0.7;
    const randomWalletIndex = Math.floor(Math.random() * this.wallet.length)
    if (this.wallet.length > 0) {
      const coinCount = this.wallet[randomWalletIndex].count
      this.stolenCoinTag = this.wallet[randomWalletIndex].tag
      this.stolenCoins = Math.floor(coinCount * pickPocketPercent)
      this.wallet[randomWalletIndex].count -= this.stolenCoins
    } else if (this.wallet.length === 0) {
      this.stolenCoinTag = 'none'
      this.stolenCoins = 0;
      this.stolenMoney = this.currentMoney - (this.currentMoney * pickPocketPercent)
      this.currentMoney = this.currentMoney * pickPocketPercent
    }
    this.updateHackValues()
  }


  updateHackValues() {
    return this.sendHackEvent = {
      lostCoins: this.stolenCoins,
      lostMoney: this.stolenMoney,
      lostCoinTag: this.stolenCoinTag
    }
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
    this.toggleHackEventMenu = newState
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
    const min = 0.6;
    const max = 1.4;
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
    const evenTrigger = 0.6;
    if (Math.random() < evenTrigger) {
      return bearMultiplier
      } else {
      return bullMultiplier
      }
    }


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


  handleBearBullEvent(randomValue: number, randomIndexes: any) {
    if (randomValue > 0.80) {
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
