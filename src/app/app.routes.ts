import { Routes } from '@angular/router';
import { MainwindowComponent } from './mainwindow/mainwindow.component';
import { ScoresComponent } from './scores/scores.component';

export const routes: Routes = [
    { path: '', component: MainwindowComponent },
    { path: 'scores', component: ScoresComponent }
];
