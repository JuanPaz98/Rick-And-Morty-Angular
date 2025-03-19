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
    return this.http.get<ApiResponse>(this.nextUrl ? this.nextUrl : ApiUrl).pipe(
      map((res) => this.updateUrls(res))
    )
  }

  getPreviousPage(): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(this.previousUrl ? this.previousUrl : ApiUrl).pipe(
      map((res) => this.updateUrls(res))
    )
  }

  private updateUrls(res: any): ApiResponse {
    this.nextUrl = res.info.next || '';
    this.previousUrl = res.info.prev || '';
    
    return {
      info: res.info,
      hasNextPage: !!res.info.next,
      hasPreviousPage: !!res.info.prev,
      characters: res.results
    };
  }
}

const ApiUrl: string = 'https://rickandmortyapi.com/api/character';
