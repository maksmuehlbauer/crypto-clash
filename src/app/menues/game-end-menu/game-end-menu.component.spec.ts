import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GameEndMenuComponent } from './game-end-menu.component';

describe('GameEndMenuComponent', () => {
  let component: GameEndMenuComponent;
  let fixture: ComponentFixture<GameEndMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GameEndMenuComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GameEndMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
