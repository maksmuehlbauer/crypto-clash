import { Component, inject, Input, OnInit, EventEmitter, Output  } from '@angular/core';
import { GameServiceService } from '../../game-service.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { sendingValues } from '../../clash.interface';

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
    toggleMenu: boolean;
    selectedCoin: any;
    currWallet: any;
  };

  @Output() transaction = new EventEmitter<sendingValues>();

  gameService = inject(GameServiceService)
  buyAmount: number = 0;



  ngOnInit(): void {
    this.buyAmount = this.checkMaxPurchase
  }

  checkBuyOrder():boolean {
    return this.buyAmount > 0 ? false : true;
  }

  acceptTransaction() {
    this.addToWallet();
    this.transaction.emit(this.sendUserAction(this.calculateCurrentMoney()))
  }

  AbortTransaction() {
    this.transaction.emit(this.sendUserAction(this.buyValues.currMoney))
  }

  sendUserAction(currentMoney: number) {
    const data: sendingValues = {
      toggleMenu: false,
      currMoney: currentMoney
    }
    return data
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
  get maxPurchase() {
    return Math.floor(this.buyValues.currMoney / this.buyValues.selectedCoin.value);
  }

  get checkMaxPurchase() {
    const maxMoney = this.maxPurchase 
    const walletSpace = this.calculateCurrentWalletSpace(); 
    return Math.min(maxMoney, walletSpace) // return the lower Value from both
  }




}
