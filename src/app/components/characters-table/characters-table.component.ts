import { Component } from '@angular/core';
import { CharacterCardComponent } from "../character-card/character-card.component";
import { Character } from '../../interfaces/character';
import { RicknmortyapiService } from '../../services/ricknmortyapi.service';
import { Info } from '../../interfaces/info';
import { FormsModule } from '@angular/forms';
import { debounceTime, Subject } from 'rxjs';

@Component({
  selector: 'CharactersTable',
  standalone: true,
  imports: [
    CharacterCardComponent,
    FormsModule
  ],
  templateUrl: './characters-table.component.html',
  styleUrl: './characters-table.component.css'
})
export class CharactersTableComponent {
  hasNextPage: boolean = false;
  hasPreviousPage: boolean = false;
  characters: Character[] = [];
  searchTerm: string = '';

  private searchSubject = new Subject<string>();

  constructor(private api: RicknmortyapiService) { }

  ngOnInit(): void {
    this.fetchNextPage();
    this.debounceSearch();
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

  public onSearchChange() {
    this.searchSubject.next(this.searchTerm);
  }

  private setPreviousAndNextUrls(info: Info) {
    this.hasNextPage = !!info.next
    this.hasPreviousPage = !!info.prev
  }

  private debounceSearch() {
    this.searchSubject.pipe(debounceTime(400)).subscribe((term) => {
      this.api.searchCharacter(this.searchTerm).subscribe({
        next: (res) => {
          this.characters = res.characters;
          this.setPreviousAndNextUrls(res.info);
        },
        error: (err) => {
          console.error(err);
          this.characters = [];
        }
      });
    });
  }

}
