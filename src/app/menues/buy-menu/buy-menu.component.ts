import { Component, inject } from '@angular/core';
import { GameServiceService } from '../../game-service.service';

@Component({
  selector: 'app-buy-menu',
  standalone: true,
  imports: [],
  templateUrl: './buy-menu.component.html',
  styleUrl: './buy-menu.component.scss'
})
export class BuyMenuComponent {
  
  gameService = inject(GameServiceService)

}
