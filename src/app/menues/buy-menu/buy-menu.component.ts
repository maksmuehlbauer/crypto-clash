import { Component, inject, Input, OnInit } from '@angular/core';
import { GameServiceService } from '../../game-service.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-buy-menu',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './buy-menu.component.html',
  styleUrl: './buy-menu.component.scss'
})
export class BuyMenuComponent implements OnInit {
  @Input() buyValues!: {
    currMoney: number;
    currWalletSpace: number;
    currWalletCount: number;
    selectedCoin: any;
  }

     
  ngOnInit(): void {
    console.table(this.buyValues)
  }
  
  gameService = inject(GameServiceService)

  closeMenu() {
    // this.toggleBuyMenu = false
  }

  get maxPurchase() {
    return Math.floor(this.buyValues.currMoney / this.buyValues.selectedCoin.value)
  }

  get totalCost() {
    return this.maxPurchase * this.buyValues.selectedCoin.value
  }

  get moneyLeft() {
    return this.buyValues.currMoney - this.totalCost
  }
}
