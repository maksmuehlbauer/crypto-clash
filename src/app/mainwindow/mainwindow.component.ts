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
  
  classesData = inject(GameServiceService);
  dropdownOpen = false;
  selectedClassIndex: number = 0;
  playerName: string = ''
  playerClass: string = 'ABN';

  setPlayerDetails() {
    this.classesData.playerDetails.playerName = this.playerName;
    this.classesData.playerDetails.playerClass = this.playerClass;
    this.classesData.playerDetails.selectedClassIndex = this.selectedClassIndex;
    console.log(this.classesData.playerDetails)
  }

  toggleDropdown() {
    this.dropdownOpen = !this.dropdownOpen;
  }

  selectClass(index: number) {
    this.selectedClassIndex = index;
    this.dropdownOpen = false;
    this.playerClass = this.classesData.classes[this.selectedClassIndex].tag;
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
