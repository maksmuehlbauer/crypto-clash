import { Component, inject } from '@angular/core';
import { GameServiceService } from '../game-service.service';
import { CommonModule } from '@angular/common';
import { FormsModule, NgModel } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-mainwindow',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './mainwindow.component.html',
  styleUrl: './mainwindow.component.scss'
})
export class MainwindowComponent {

  // Default Stats
  // startingMoney: number = 5000;
  // itSecurityLevel: number = 15;
  // hardwareWalletSpace: number = 100;  
  
  classesData = inject(GameServiceService);
  selectedClassIndex: number = 0;
  dropdownOpen = false;

  toggleDropdown() {
    this.dropdownOpen = !this.dropdownOpen;
  }

  selectClass(index: number) {
    this.selectedClassIndex = index;
    this.dropdownOpen = false;
  }



  // a getter "get" refresh the variable at anytime they are called into the template
  get attributeAdvantage() {
    return this.classesData.classes[this.selectedClassIndex].attributes.attOne.description;
  }

  get attributeDisAdvantage() {
    return this.classesData.classes[this.selectedClassIndex].attributes.attTwo.description;
  }

  get factionStartingMoney() {
    return this.classesData.classes[this.selectedClassIndex].startMoney;
  }

  get factionItSecurityLevel() {
    return this.classesData.classes[this.selectedClassIndex].itSecurity;
  }

  get factionWalletSpace() {
    return this.classesData.classes[this.selectedClassIndex].walletspace;
  }



}
