import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { PokemonApiService } from '../services/pokemon-api.service';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [],
  exports: [
    RouterModule
  ] ,
  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule
  ],
  providers: [PokemonApiService],
})
export class SharedModule { }
