import { Component } from '@angular/core';
import { BuyMenuComponent } from "./buy-menu/buy-menu.component";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-menues',
  standalone: true,
  imports: [BuyMenuComponent, CommonModule],
  templateUrl: './menues.component.html',
  styleUrl: './menues.component.scss'
})
export class MenuesComponent {



}
