import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-info-menu',
  standalone: true,
  imports: [],
  templateUrl: './info-menu.component.html',
  styleUrl: './info-menu.component.scss'
})
export class InfoMenuComponent {
  


  @Output() closeMenu = new EventEmitter<boolean>(); 


  AbortTransaction() {
    const menuState = false;
    this.closeMenu.emit(menuState)
  }
}
