import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PokemonApiService {

  constructor(private http: HttpClient) { }


  getPokemonList(limit: number = 10, offset: number = 0): Observable<any> {
    return this.http.get<any>(`${environment.BaseUrl}?limit=${limit}&offset=${offset}`);
  }

  // Obtener detalles de un Pokémon por su URL
  getPokemonDetails(url: string): Observable<any> {
    return this.http.get<any>(url);
  }

  getPokemonById(id: string): Observable<any> {
    return this.http.get<any>(`${environment.BaseUrl}${id}`);
  }
  
  getPokemonSpecies(id: string): Observable<any> {
    return this.http.get(`https://pokeapi.co/api/v2/pokemon-species/${id}/`);
  }
  



}
