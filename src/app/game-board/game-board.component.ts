import { Component, inject } from '@angular/core';
import { GameServiceService } from '../game-service.service';

@Component({
  selector: 'app-game-board',
  standalone: true,
  imports: [],
  templateUrl: './game-board.component.html',
  styleUrl: './game-board.component.scss'
})
export class GameBoardComponent {

  gameService = inject(GameServiceService)
  classIndex = this.gameService.playerDetails.selectedClassIndex


}
