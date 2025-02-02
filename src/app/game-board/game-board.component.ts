import { Component, inject } from '@angular/core';
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
export class GameBoardComponent {

  gameService = inject(GameServiceService);
  classIndex = this.gameService.playerDetails.selectedClassIndex;
  currentWalletCount:number = 0;
  startingDay:number = 0;
  finishDay:number = 30;

  wallet = [
    {
      name: 'Bitcoin',
      tag: 'BTC',
      buyAt: 175000,
      count: 11
    },
    {
      name: 'Musk Coin',
      tag: 'MUSK',
      buyAt: 6200,
      count: 44
    },
  ]

    // a getter "get" refresh the variable at anytime they are called into the template
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
