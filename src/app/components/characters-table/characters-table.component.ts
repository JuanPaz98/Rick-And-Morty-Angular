import { Component } from '@angular/core';
import { CharacterCardComponent } from "../character-card/character-card.component";
import { Character } from '../../interfaces/character';
import { RicknmortyapiService } from '../../services/ricknmortyapi.service';

@Component({
  selector: 'CharactersTable',
  standalone: true,
  imports: [CharacterCardComponent],
  templateUrl: './characters-table.component.html',
  styleUrl: './characters-table.component.css'
})
export class CharactersTableComponent {
  hasNextPage: boolean = false;
  hasPreviousPage: boolean = false;
  characters: Character[] = [];
  public currentPage: number = 1;

  constructor(private api: RicknmortyapiService) { }

  ngOnInit(): void {
    this.fetchNextPage();
  }

  fetchNextPage(): void {
    this.api.getNextPage().subscribe(
     (res) => {
      this.characters = res.characters;
      this.api.nextUrl = res.info.next
      this.hasNextPage = !!res.info.next
      this.hasPreviousPage = !!res.info.prev
     }
    );
  }

  fetchPreviousPage(): void {
    this.api.getPreviousPage().subscribe(
      (res) => {
       this.characters = res.characters;
       this.api.previousUrl = res.info.prev
       this.hasPreviousPage = !!res.info.prev
      }
     );
  }

}
