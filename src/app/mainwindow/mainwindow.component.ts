import { Component, inject } from '@angular/core';
import { GameServiceService } from '../game-service.service';
import { CommonModule } from '@angular/common';
import { FormsModule, NgModel, NgForm } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-mainwindow',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './mainwindow.component.html',
  styleUrl: './mainwindow.component.scss'
})
export class MainwindowComponent {

  constructor(private router: Router) {};
  
  gameService = inject(GameServiceService);
  dropdownOpen = false;
  selectedClassIndex: number = 0;
  playerName: string = ''
  playerClass: string = 'ABN';

  setPlayerDetails() {
    this.gameService.playerDetails.playerName = this.playerName;
    this.gameService.playerDetails.playerClass = this.playerClass;
    this.gameService.playerDetails.selectedClassIndex = this.selectedClassIndex;
  }

  toggleDropdown() {
    this.dropdownOpen = !this.dropdownOpen;
  }

  selectClass(index: number) {
    this.selectedClassIndex = index;
    this.dropdownOpen = false;
    this.playerClass = this.gameService.classes[this.selectedClassIndex].tag;
  }


  onSubmit(ngForm: NgForm, event: Event, selectedClassIndex: number) {
    if (ngForm.submitted && ngForm.form.valid) {
      this.router.navigate(['/game-board']);
      // console.log(this.playerName + ' ' + this.playerClass)
      this.setPlayerDetails();

    }
  }

  // a getter "get" refresh the variable at anytime they are called into the template
  get attributeAdvantage() {
    return this.gameService.classes[this.selectedClassIndex].attributes.attOne.description;
  }

  get attributeDisAdvantage() {
    return this.gameService.classes[this.selectedClassIndex].attributes.attTwo.description;
  }

  get factionStartingMoney() {
    return this.gameService.classes[this.selectedClassIndex].startMoney;
  }

  get factionItSecurityLevel() {
    return this.gameService.classes[this.selectedClassIndex].itSecurity;
  }

  get factionWalletSpace() {
    return this.gameService.classes[this.selectedClassIndex].walletspace;
  }



}
