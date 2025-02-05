export interface Scores {
    name: string;
    class: string;
    score: string;
}

export interface PlayerDetails {
    playerName: string;
    playerClass: string
    selectedClassIndex: number;
  }

export interface sendingValues {
    toggleMenu: boolean;
    currMoney: number;
}

export interface wallet {
    name: string;
    tag: string;
    buyAt: number;
    count: number;
}
