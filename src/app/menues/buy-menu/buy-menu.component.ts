import { Component, inject, Input, OnInit  } from '@angular/core';
import { GameServiceService } from '../../game-service.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

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
  }


  gameService = inject(GameServiceService)
  buyAmount: number = 0;


  ngOnInit(): void {
    this.buyAmount = this.checkMaxPurchase
  }
  
  closeMenu() {
    this.buyValues.toggleMenu = this.buyValues.toggleMenu; 
  }

  calculateCurrentWalletSpace() {
    return this.buyValues.currWalletSpace - this.buyValues.currWalletCount

  }

  acceptTransaction() {
    this.addToWallet();
    this.calculateCurrentMoney();
    window.close()
  }


  calculateCurrentMoney() {
    let totalCost = this.buyAmount * this.buyValues.selectedCoin.value
    this.buyValues.currMoney -= totalCost;
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
