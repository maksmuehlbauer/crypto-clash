import { Routes } from '@angular/router';
import { MainwindowComponent } from './mainwindow/mainwindow.component';
import { ScoresComponent } from './scores/scores.component';
import { StorylineComponent } from './storyline/storyline.component';
import { RulesComponent } from './rules/rules.component';
import { GameBoardComponent } from './game-board/game-board.component';

export const routes: Routes = [
    { path: '', component: MainwindowComponent },
    { path: 'scores', component: ScoresComponent },
    { path: 'story', component: StorylineComponent },
    { path: 'rules', component: RulesComponent },
    { path: 'game-board', component: GameBoardComponent }
];


