import { Component, inject, OnInit } from '@angular/core';
import { GameServiceService } from '../game-service.service';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-game-board',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './game-board.component.html',
  styleUrl: './game-board.component.scss'
})
export class GameBoardComponent implements OnInit {

  gameService = inject(GameServiceService);
  classIndex = this.gameService.playerDetails.selectedClassIndex;
  currentWalletCount:number = 0;
  startingDay:number = 0;
  finishDay:number = 30;
  dailyExchangeOffer:any[] = []
  dailyExchangeIndexes: any[] = []

  wallet = [
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
      count: 40
    },
  ];


  ngOnInit(): void {
    this.getRandomCurrencys();
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

  buyCurrency(i: number) {
    console.log('buy amount of ' + i)
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
