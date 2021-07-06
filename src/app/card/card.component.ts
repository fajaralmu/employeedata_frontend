import { Component, ContentChild, Input, OnInit, TemplateRef } from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {
  @Input() header: string = 'Header';   
  @Input() footer: string = 'Footer';
  constructor() { }

  ngOnInit(): void {
  }

}
