import { Component, EventEmitter, Output, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-info-menu',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './info-menu.component.html',
  styleUrl: './info-menu.component.scss'
})
export class InfoMenuComponent {
  @Input() coinNotExist: string = '';
  @Input() bullBearMarket: string = '';

  @Output() closeMenu = new EventEmitter<boolean>(); 


  AbortTransaction() {
    const menuState = false;
    this.closeMenu.emit(menuState)
  }
}
