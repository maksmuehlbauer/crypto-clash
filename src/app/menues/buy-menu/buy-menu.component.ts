import { Component, inject, Input, OnInit, EventEmitter, Output  } from '@angular/core';
import { GameServiceService } from '../../game-service.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BuyTransactionValues } from '../../clash.interface';

@Component({
  selector: 'app-buy-menu',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './buy-menu.component.html',
  styleUrl: './buy-menu.component.scss'
})
export class BuyMenuComponent implements OnInit {
  
  @Input() buyValues!: {
    currMoney: number;
    currWalletSpace: number;
    currWalletCount: number;
    selectedCoin: any;
    currWallet: any;
  };

  @Output() buyTransaction = new EventEmitter<BuyTransactionValues>(); //BuyTransactionValues = interface

  gameService = inject(GameServiceService)
  buyAmount: number = 0;

  ngOnInit(): void {
    this.buyAmount = this.calculateMaxPurchase
  }

  checkBuyOrder(): boolean {
    return this.buyAmount <= 0 || this.buyAmount > this.calculateMaxPurchase;
  }

  validateInput(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    let value = Number(inputElement.value);
    if (value > this.calculateMaxPurchase) {
      this.buyAmount = this.calculateMaxPurchase;
    } else {
      this.buyAmount = value;
    }
  }


  // checkBuyOrder():boolean {
  //   return this.buyAmount > 0 ? false : true;
  // }


  acceptTransaction() {
    this.addToWallet();
    this.buyTransaction.emit(this.receiveUserAction(this.calculateCurrentMoney()))
  }

  AbortTransaction() {
    this.buyTransaction.emit(this.receiveUserAction(this.buyValues.currMoney))
  }

  receiveUserAction(currentMoney: number) {
    const transactionData: BuyTransactionValues = {
      toggleMenu: false,
      currMoney: currentMoney
    }
    return transactionData
  }

  calculateCurrentMoney() {
    let totalCost = this.buyAmount * this.buyValues.selectedCoin.value
    return this.buyValues.currMoney -= totalCost;
  }

  calculateCurrentWalletSpace() {
    return this.buyValues.currWalletSpace - this.buyValues.currWalletCount
  }

  addToWallet() {
    this.buyValues.currWallet.push(
      {
        name: this.buyValues.selectedCoin.name,
        tag: this.buyValues.selectedCoin.tag,
        buyAt: this.buyValues.selectedCoin.value,
        count: this.buyAmount
    },)
  }

  // getter Funtions refreshes, only read
  get maxPurchase(): number {
    return Math.floor(this.buyValues.currMoney / this.buyValues.selectedCoin.value);
  }

  get calculateMaxPurchase(): number {
    const maxMoneyPurchase = this.maxPurchase 
    const maxWalletSpacePurchase = this.calculateCurrentWalletSpace(); 
    return Math.min(maxMoneyPurchase, maxWalletSpacePurchase) // return the lowest Value
  }
}
