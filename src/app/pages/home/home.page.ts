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

  pokemons: any[] = []; // Lista filtrada de Pokémon
  allPokemons: any[] = []; // Lista completa de Pokémon
  params = { name: '' }; // Parámetro de búsqueda
  offset = 0; // Control de paginación
  limit = 10; // Número de Pokémon por página

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
              this.allPokemons = [...this.allPokemons, ...pokemonDetails]; // Almacena todos los Pokémon
              this.pokemons = [...this.allPokemons]; // Muestra los Pokémon en la lista filtrada
              this.offset += this.limit; // Aumenta el offset para la siguiente carga

              if (event) event.target.complete(); // Finaliza el evento de scroll
            },
            error: (err) => console.error('Error al obtener detalles:', err)
          });
        } else if (event) {
          event.target.disabled = true; // Deshabilita el infinite-scroll si no hay más datos
        }
      },
      error: (error: any) => {
        console.error('Error en la petición:', error);
        if (event) event.target.complete(); // Finaliza el evento de scroll
      }
    });
  }


  searchPokemon() {
  const searchTerm = this.params.name?.trim().toLowerCase();

  if (!searchTerm) {
    this.resetPokemonList(); // Restablece la lista completa
    return;
  }

  // Si el usuario busca un nombre exacto, consultamos la API directamente
  this.pokemonApiService.getPokemonDetails(`https://pokeapi.co/api/v2/pokemon/${searchTerm}`)
    .subscribe({
      next: (pokemonDetails: any) => {
        this.pokemons = [pokemonDetails]; // Muestra solo el Pokémon encontrado
        console.log('Pokémon encontrado:', this.pokemons);
      },
      error: (error: any) => {
        console.error('Error al buscar Pokémon:', error);
        this.pokemons = []; // Si no se encuentra, limpiar la lista
      }
    });
}


  resetPokemonList() {
    this.pokemons = [...this.allPokemons]; // Restaura la lista completa
  }
  
  
  
}

  






