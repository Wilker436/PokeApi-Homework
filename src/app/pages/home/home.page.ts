import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonGrid, IonRow, IonCol, IonInfiniteScrollContent, IonInfiniteScroll, IonSearchbar, IonBackButton, IonButtons } from '@ionic/angular/standalone';
import { PokemonApiService } from 'src/app/services/pokemon-api.service';
import { SharedModule } from 'src/app/shared/shared.module';
import { forkJoin,  Observable  } from 'rxjs';
import { CardPokemonComponent } from 'src/app/component/card-pokemon/card-pokemon.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: true,
  imports: [IonButtons, IonBackButton, IonSearchbar, IonInfiniteScroll, IonInfiniteScrollContent, IonCol, IonRow, IonGrid, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, SharedModule, CardPokemonComponent]
})
export class HomePage implements OnInit {

  pokemons: any[] = []; 
  allPokemons: any[] = [];
  params = { name: '' }; 
  offset = 0; 
  limit = 10; 
  constructor(
    private pokemonApiService: PokemonApiService
  ) { }

  ngOnInit() {

    this.getPokemons();
  }

  getPokemons(event?: any) {
    this.pokemonApiService.getPokemonList(this.limit, this.offset).subscribe({
      next: (res: any) => {
        if (res?.results?.length) {
          const requests: Observable<any>[] = res.results.map((pokemon: any) =>
            this.pokemonApiService.getPokemonDetails(pokemon.url)
          );

          forkJoin(requests).subscribe({
            next: (pokemonDetails: any[]) => {
              this.allPokemons = [...this.allPokemons, ...pokemonDetails]; 
              this.pokemons = [...this.allPokemons]; 
              this.offset += this.limit; 

              if (event) event.target.complete(); 
            },
            error: (err) => console.error('Error al obtener detalles:', err)
          });
        } else if (event) {
          event.target.disabled = true; 
        }
      },
      error: (error: any) => {
        console.error('Error en la petición:', error);
        if (event) event.target.complete(); 
      }
    });
  }


  searchPokemon() {
  const searchTerm = this.params.name?.trim().toLowerCase();

  if (!searchTerm) {
    this.resetPokemonList(); 
    return;
  }


  this.pokemonApiService.getPokemonDetails(`https://pokeapi.co/api/v2/pokemon/${searchTerm}`)
    .subscribe({
      next: (pokemonDetails: any) => {
        this.pokemons = [pokemonDetails]; 
        console.log('Pokémon encontrado:', this.pokemons);
      },
      error: (error: any) => {
        console.error('Error al buscar Pokémon:', error);
        this.pokemons = []; 
      }
    });
}


  resetPokemonList() {
    this.pokemons = [...this.allPokemons]; 
  }
  
  
  
}

  






