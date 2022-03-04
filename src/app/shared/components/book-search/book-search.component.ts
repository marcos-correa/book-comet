import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { faBook } from '@fortawesome/free-solid-svg-icons';
import { Bookout } from 'src/app/core/models/bokout.model';
import { switchMap } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter, map, tap } from 'rxjs/operators';
import { BookService } from 'src/app/core/services/book.service';



@Component({
  selector: 'book-search',
  templateUrl: './book-search.component.html',
  styleUrls: ['./book-search.component.less']
})
export class BookSearchComponent implements OnInit {
  @Input() loading:boolean = false;
  faBook = faBook as IconProp;
  isAddBook:boolean = false;
  
  searchLength:number = 0//BS
  showSpecificMessage:boolean = false;
  
  @Output() books_:EventEmitter<Bookout[]> = new EventEmitter()
  @Output() query_: EventEmitter<string> = new EventEmitter()
  @Output() error_: EventEmitter<any> = new EventEmitter()
  @Output() loading_: EventEmitter<any> = new EventEmitter()
  @Output() refresh_: EventEmitter<any> = new EventEmitter()

  // loading: boolean = false;
  queryName:FormControl = new FormControl()//BS

  constructor(
    private bookService:BookService,
  ) { }

  ngOnInit(): void {
    this.queryName.valueChanges
    // filter(value => value.length != 1),
    .pipe(
        tap(value =>{this.loading_.emit(true)}),
        map(value => value.trim()),
        tap(value => this.searchLength = value.length),
        debounceTime(200),
        distinctUntilChanged(),
        tap(value =>{this.query_.emit(value)}),
        switchMap(this.getAllBooksByName)
      ).subscribe({
        next: this.hasResults,
        error: this.hasError
      });
  }

  getAllBooksByName = (value:any) =>{
    return this.bookService.getAllBooksByName(value)
  }

  hasResults = (res:any) =>{
    this.books_.emit(res)
    this.setLoading(false)
  }

  hasError = (err:any) =>{
    this.error_.emit(err)
    this.setLoading(false)
  }

  setLoading(value:boolean){
    this.loading_.emit(value);
  }

  refresh(event:any){
    this.refresh_.emit(true)
  }

}
