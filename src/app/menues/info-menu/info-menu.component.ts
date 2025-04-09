import { Component, EventEmitter, Output, Input, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GameServiceService } from '../../game-service.service';

@Component({
  selector: 'app-info-menu',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './info-menu.component.html',
  styleUrl: './info-menu.component.scss'
})
export class InfoMenuComponent implements OnInit {
  @Input() coinNotExist: string = '';
  @Input() bullBearMarket!: {
    eventInfo: string;
    eventCoinObj: any;
  }

  @Output() closeMenu = new EventEmitter<boolean>(); 

  gameService = inject(GameServiceService)
  randomComment: string = ''

  checkLowOrHighPrice() {
    const eventCoin = this.gameService.currencys.find((currency) => this.bullBearMarket.eventCoinObj.tag === currency.tag);
    if (!eventCoin) {
      throw new Error(`Coin mit Tag ${this.bullBearMarket.eventCoinObj.tag} nicht gefunden.`);
    }

    return eventCoin.value > this.bullBearMarket.eventCoinObj.value ? 'bear-market' : 'bull-market'
  }

  AbortTransaction() {
    const menuState = false;
    this.closeMenu.emit(menuState)
  }

  ngOnInit(): void {
    this.qouteRandomGenerator()
  }

  qouteRandomGenerator() {
    const i = Math.floor(Math.random() * this.gameService.quotes.length)
    this.randomComment = this.gameService.quotes[i]
  }


}
