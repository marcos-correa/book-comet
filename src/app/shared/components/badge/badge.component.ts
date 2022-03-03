import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'badge',
  templateUrl: './badge.component.html',
  styleUrls: ['./badge.component.less']
})
export class BadgeComponent implements OnInit {
  @Input() size:string = "sm";
  
  constructor() { }

  ngOnInit(): void {
  }

}
