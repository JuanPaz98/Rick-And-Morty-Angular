import { Component } from '@angular/core';
import { CharacterCardComponent } from "../character-card/character-card.component";
import { Character } from '../../interfaces/character';
import { RicknmortyapiService } from '../../services/ricknmortyapi.service';
import { Info } from '../../interfaces/info';

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

  constructor(private api: RicknmortyapiService) { }

  ngOnInit(): void {
    this.fetchNextPage();
  }

  fetchNextPage(): void {
    this.api.getNextPage().subscribe(
     (res) => {
      this.characters = res.characters;
      this.setPreviousAndNextUrls(res.info)
     }
    );
  }

  fetchPreviousPage(): void {
    this.api.getPreviousPage().subscribe(
      (res) => {
       this.characters = res.characters;
       this.setPreviousAndNextUrls(res.info)
      }
     );
  }

  private setPreviousAndNextUrls(info: Info) {
    this.hasNextPage = !!info.next
    this.hasPreviousPage = !!info.prev
  }

}
