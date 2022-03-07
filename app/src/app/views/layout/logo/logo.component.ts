import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'logo',
  templateUrl: './logo.component.html',
  styleUrls: ['./logo.component.scss']
})
export class LogoComponent implements OnInit {
  @Input() theme: string = 'light';
  @Input() scale: number = 1;
  @Input() virtical: boolean = false;
  constructor() { }

  ngOnInit() {
  }

}
