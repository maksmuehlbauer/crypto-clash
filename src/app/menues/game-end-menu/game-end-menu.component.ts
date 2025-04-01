import { Component, Input, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GameServiceService } from '../../game-service.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-game-end-menu',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './game-end-menu.component.html',
  styleUrl: './game-end-menu.component.scss'
})
export class GameEndMenuComponent {

  gameService = inject(GameServiceService)

    // playername = this.gameService.playerDetails.playerName
  playerName: string = this.gameService.playerDetails.playerName
  playerClassTag: string = this.gameService.playerDetails.playerClass
  playerClassName: string = ''

  

  @Input() playerScore!: {
    currMoney: number;
  }

  findPlayerClassName() {
    let selectedClass = this.gameService.classes.find( c => c.tag.includes(this.playerClassTag))
    if(selectedClass) {
      return this.playerClassName = selectedClass.name
    } else {
      return 'class Name not found'
    }
  }

  get finalProfit(): number {
    return this.playerScore.currMoney
  }

}
