import { Component, Input, OnInit } from '@angular/core';
import { IonCard, IonAvatar } from '@ionic/angular/standalone';
import { InputComponent } from '../../component/input/input.component';
import { CommonModule, NgIf, NgFor } from '@angular/common';
import { SwiperComponentComponent } from '../swiper-component/swiper-component.component';


@Component({
  selector: 'app-card-pokemon',
  templateUrl: './card-pokemon.component.html',
  styleUrls: ['./card-pokemon.component.scss'],
  standalone: true,
  imports: [IonCard, IonAvatar, InputComponent, CommonModule, NgIf, NgFor, SwiperComponentComponent],
})
export class CardPokemonComponent  implements OnInit {
  

  
  constructor() { }

  ngOnInit() {
    console.log(this.types)
  }
  
  @Input() nombre: string = '';
  @Input() img: string[] = [];
  @Input() types: any[] = [];
  @Input() idp?: string;
  @Input() weight?: string;
  @Input() height?: string;
  @Input() ability?: any[];
  @Input() description?: string;
  @Input() param: number = 0;
}
