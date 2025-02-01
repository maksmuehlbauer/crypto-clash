import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { GameServiceService } from '../game-service.service';
import { CommonModule } from '@angular/common';
// import { Scores } from '../clash.interface';

@Component({
  selector: 'app-scores',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './scores.component.html',
  styleUrl: './scores.component.scss'
})
export class ScoresComponent {

scoresData = inject(GameServiceService);



// scoresData: Scores = {
//   name: '',
//   class: '',
//   score: ''
// }

}
