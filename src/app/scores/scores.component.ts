import { Component, inject, OnInit } from '@angular/core';
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
export class ScoresComponent implements OnInit {

scoresData = inject(GameServiceService);
leaderboard = this.scoresData.scores
sortedScores: any[] = [];

  ngOnInit(): void {
      this.sortHighscores();
  }

  sortHighscores() {
    this.sortedScores = this.leaderboard.sort((a: any, b: any) => b.score - a.score);
  }



}
