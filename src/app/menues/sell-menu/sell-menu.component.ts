import { Component, inject, Input, OnInit, EventEmitter, Output  } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SellTransactionValues } from '../../clash.interface';

@Component({
  selector: 'app-sell-menu',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './sell-menu.component.html',
  styleUrl: './sell-menu.component.scss'
})
export class SellMenuComponent implements OnInit{

  @Input() sellValues!: {
    currMoney: number;
    currWallet: any;
    currCoinPrice: any;
    currWalletIndex: number;
  }

  @Output() sellTransaction = new EventEmitter<SellTransactionValues>(); //SellTransactionValues = interface

  sellAmount: number = 0;

  ngOnInit(): void {
    this.sellAmount = this.maxSellAmount
  }

  acceptTransaction() {
    if (this.checkSellCount()) {
      this.updateWalletCounts();
    } else {
      this.deleteIndexFromWallet();
    }
    this.sellTransaction.emit(this.receiveUserAction(this.calculateCurrentMoney()))
  }

  AbortTransaction() {
    this.sellTransaction.emit(this.receiveUserAction(this.sellValues.currMoney))
  }

  receiveUserAction(currentMoney: number) {
    const transactionData: SellTransactionValues = {
      toggleMenu: false,
      currMoney: currentMoney
    }
    return transactionData
  }

  deleteIndexFromWallet() {
    this.sellValues.currWallet.splice(this.sellValues.currWalletIndex, 1)
  }

  updateWalletCounts() {
    this.currWalletEntry.count -= this.sellAmount
  }

  checkSellCount() {
    return this.sellAmount < this.currWalletEntry.count
  }

  checkSellOrder() {

  }



  calculateCurrentMoney() {
    return this.sellValues.currMoney += this.maxProfit
  }

  get maxSellAmount(): number {
    return this.currWalletEntry.count
  }

  get maxProfit(): number {
    return this.sellAmount * this.sellValues.currCoinPrice.value;
  }

  get currWalletEntry() {
    return this.sellValues.currWallet[this.sellValues.currWalletIndex]
  }
}
