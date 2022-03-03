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
  @Input() admin:boolean = false;
  @Input() loading:boolean = false;
  faBook = faBook as IconProp;
  books:Bookout[] = [];
  isAddBook:boolean = false;
  
  error: boolean = false;
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
      .pipe(
        tap(value =>{this.setInitSearch(value)}),
        map(value => value.trim()),
        tap(value => this.searchLength = value.length),
        tap(value => this.specifiMessageSet()),
        filter(value => value.length != 1),
        debounceTime(200),
        distinctUntilChanged(),
        switchMap(this.getAllBooksByName)
      ).subscribe({
        next: this.hasResults,
        error: this.hasError
      });
  }

  hasBooks(books?:Array<any>){
    return this.books.length > 0 
  }

  showAddBook(){
    this.isAddBook = true
  }

  setInitSearch(value:string){
    this.query_.emit(value)
    if(!this.loading || this.books.length > 0){
      this.initSearch()    
    }
  }
  

  getAllBooksByName = (value:any) =>{
    return this.bookService.getAllBooksByName(value)
  }

  specifiMessageSet(){
    let rule_0 = this.searchLength == 0 && this.loading && this.books.length == 0;
    if(this.searchLength == 1){
      setTimeout(() => {
        if(this.searchLength == 1){
          this.showSpecificMessage = true;
        }else{
          this.showSpecificMessage = false;
        }
      }, 700);
    }
    if(rule_0){
      setTimeout(() => {
        if(rule_0){
          this.showSpecificMessage = false;
          this.setBooks([])
          this.setLoading(false)
        }
      }, 3000);
    }
  }

  initSearch(){
    this.setBooks([])
    this.setLoading(true)
  }

  setBooks(value:Bookout[]){
    this.books = value
    this.books_.emit(value)
  }

  hasResults = (res:any) =>{
    this.setBooks(res);
    this.setLoading(false)
  }

  hasError = (err:any) =>{
    this.error = true;
    this.setLoading(false)
  }

  setError(value:any){
    this.error = value
    this.error_.emit(value)
  }
  setLoading(value:boolean){
    this.loading = value;
    this.loading_.emit(value);
  }

  bookAdded($event:any){
    this.hideAddBook();
    this.refresh($event)
  }
  refresh(event:any){
    this.setLoading(true)
    this.refresh_.emit(true)
  }

  hideAddBook(){
    this.isAddBook = false
  }
}
