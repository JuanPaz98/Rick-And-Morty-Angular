import { Component, Input } from '@angular/core';
import { Character } from '../../interfaces/character';

@Component({
  selector: 'CharacterCard',
  standalone: true,
  imports: [],
  templateUrl: './character-card.component.html',
  styleUrl: './character-card.component.css'
})
export class CharacterCardComponent {
  @Input() character!: Character;

  constructor() {
    this.character = {
      id: 0,
      name: '',
      status: '',
      species: '',
      image: ''
    }
  }
}
