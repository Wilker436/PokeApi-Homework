import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonButton } from "@ionic/angular/standalone";
import { Input, Output, EventEmitter } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
  standalone: true,
  imports: [IonButton, CommonModule, FormsModule, RouterModule]
})

export class InputComponent  implements OnInit {

  @Input() text: string = 'Default Text';
  @Output() action = new EventEmitter<void>();
  @Input() routerLink!: string;

  constructor() { } 

  ngOnInit() {}

  onClick() {
    this.action.emit();
  }


}
