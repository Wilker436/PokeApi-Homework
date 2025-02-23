import { Component, OnInit, Input} from '@angular/core';
import { CommonModule, NgFor } from '@angular/common';
import { IonAvatar } from '@ionic/angular/standalone';

import Swiper from 'swiper';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';


@Component({
  selector: 'app-swiper-component',
  templateUrl: './swiper-component.component.html',
  styleUrls: ['./swiper-component.component.scss'],
  standalone: true,
  imports: [IonAvatar, CommonModule, NgFor],
})
export class SwiperComponentComponent  implements OnInit {

  ngAfterViewInit(): void {
    new Swiper('.swiper', {
      modules: [Navigation, Pagination],
      slidesPerView: 1,
      spaceBetween: 10,
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev'
      },
      pagination: {
        el: '.swiper-pagination',
        clickable: true
      },
      loop: true,
    });
  }

  constructor() { }

  ngOnInit() {}

  @Input() img: string[] = [];
}
