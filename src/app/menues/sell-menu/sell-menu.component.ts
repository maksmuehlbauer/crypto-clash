import { Component, inject, Input, OnInit, EventEmitter, Output  } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

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

  

  sellAmount: number = 0;

  ngOnInit(): void {
    this.sellAmount = this.maxSellAmount
  }

  AbortTransaction() {

  }

  checkSellOrder() {

  }

  acceptTransaction() {
    console.log(this.sellValues.currWallet)
    this.sellValues.currWallet.splice(this.sellValues.currWalletIndex, 1)
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
