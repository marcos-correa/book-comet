import { Component, Input, OnInit, EventEmitter, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { faBook } from '@fortawesome/free-solid-svg-icons';
import { switchMap } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter, map, tap } from 'rxjs/operators';
import { Bookout } from 'src/app/core/models/bokout.model';
import { BookService } from 'src/app/core/services/book.service';

@Component({
  selector: 'book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.less']
})
export class BookListComponent implements OnInit {
  @Input() admin:boolean = false;
  @Input() search:boolean = true;
  @Input() queryName:string = "";
  @Input() books:Bookout[] = [];
  @Input() loading:boolean = false;
  @Input() error:boolean = true;
  @Output() refresh_: EventEmitter<any> = new EventEmitter()

  searched: boolean = false;
  // loading: boolean = false;
  // error: boolean = false;
  // queryName:FormControl = new FormControl()//BS
  // books:Bookout[] = [];
  faBook = faBook as IconProp;//BS
  searchLength:number = 0//BS

  isAddBook:boolean = false;
  showSpecificMessage:boolean = false;

  constructor(
    private bookService:BookService,
  ) { 
    
  }
  
  ngOnInit(): void {
  }

  showAddBook(){
    this.isAddBook = true
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
          this.books = []
          this.loading = false
        }
      }, 3000);
    }
  }


  refresh(event:any){
    this.loading = true
    this.refresh_.emit(true)
  }
 
  
  hasBooks(books?:Array<any>){
    return this.books.length > 0 
  }

  setInitSearch(){
    if(!this.loading || this.books.length > 0){
      this.initSearch()    
    }
  }
  initSearch(){
    this.books = []
    this.loading = true;
  }



  
  

}
