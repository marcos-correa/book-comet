import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'book-list-not-found',
  templateUrl: './book-list-not-found.component.html',
  styleUrls: ['./book-list-not-found.component.less']
})
export class BookListNotFoundComponent implements OnInit {
  @Input() admin:boolean = false
  @Input() notfound:boolean = false
  @Input() nobooks:boolean = false
  @Input() queryName:string = ""
  constructor() { }

  ngOnInit(): void {
  }

}
