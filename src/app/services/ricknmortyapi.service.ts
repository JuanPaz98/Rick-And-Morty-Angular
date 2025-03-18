import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ApiResponse } from '../interfaces/api-response';
import { Character } from '../interfaces/character';



@Injectable({
  providedIn: 'root'
})
export class RicknmortyapiService {
  
  nextUrl = '';
  previousUrl = '';

  constructor(private http: HttpClient) { }

  getNextPage(): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(this.nextUrl ? this.nextUrl : ApiUrl)
  }

  getPreviousPage(): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(this.previousUrl ? this.previousUrl : ApiUrl)
  }
}

const ApiUrl: string = 'https://rickandmortyapi.com/api/character';
