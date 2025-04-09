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
