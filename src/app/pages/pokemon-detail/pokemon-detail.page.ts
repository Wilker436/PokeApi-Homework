import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonGrid, IonRow, IonCol, IonButtons, IonBackButton } from '@ionic/angular/standalone';
import { ActivatedRoute } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { PokemonApiService } from 'src/app/services/pokemon-api.service';
import { CardPokemonComponent } from 'src/app/component/card-pokemon/card-pokemon.component';

@Component({
  selector: 'app-pokemon-detail',
  templateUrl: './pokemon-detail.page.html',
  styleUrls: ['./pokemon-detail.page.scss'],
  standalone: true,
  imports: [IonBackButton, IonButtons, IonCol, IonRow, IonGrid, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, SharedModule, CardPokemonComponent]
})
export class PokemonDetailPage implements OnInit {

  pokemonId: string = ''
  pokemon: any;
  img: string[] = [];


  constructor(
    private actRoute: ActivatedRoute,
    private pokemonApiService: PokemonApiService
  ) { 
    this.pokemonId = this.actRoute.snapshot.paramMap.get('id') as string
    console.log(this.pokemonId)
  }
  ngOnInit() {
    this.getPokemonDetails(this.pokemonId);
  }

  getPokemonDetails(id: string) {
    this.pokemonApiService.getPokemonById(id).subscribe((pokemon) => {
      this.pokemon = pokemon;

      const frontDefault = this.pokemon.sprites.front_default;

        // Obtener todas las imágenes válidas sin incluir front_default duplicada
        const otherImages = Object.values(this.pokemon.sprites)
          .filter((sprite) => typeof sprite === 'string' && sprite !== null && sprite !== frontDefault);

        // Combinar las imágenes, asegurando que front_default esté primero
        this.img = frontDefault ? [frontDefault, ...otherImages] : otherImages;
  
      // Obtener la descripción del Pokémon
      this.pokemonApiService.getPokemonSpecies(id).subscribe((species) => {
        const entry = species.flavor_text_entries.find(
          (entry: any) => entry.language.name === "es"
        );
        this.pokemon.description = entry ? entry.flavor_text : "Sin descripción.";
      });
    });
  }

  // En tu archivo TypeScript (por ejemplo, card-pokemon.component.ts)


  

}
