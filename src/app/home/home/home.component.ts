import { Component, OnInit } from '@angular/core';

import { DeleteResponse } from '../../core/models/deleteResponse.model';
import { Bookout } from './../../core/models/bokout.model';
import { BookService } from './../../core/services/book.service';

// import { MessageService } from 'primeng/api';
@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.less']
})
export class HomeComponent implements OnInit {
  numberDelete?:number;
  responseDelete?: DeleteResponse;
  logged: boolean = true;
  
      
  queryName:string = ''
  allBooks: Bookout[] = [];
  booksFiltered: Bookout[] = [];
  loading: boolean = false; 
  error: boolean = false;
  
  

  constructor(
    private bookService:BookService,
    // private messageService:MessageService
  ) { 
    

  }
  

  loggeded = true
  ngOnInit(): void {
    this.getAllBooks()
  }
  getAllBooks(){
    this.initSearch();
    this.bookService.getAllBooks()
    .subscribe({
      next: this.hasResults,
      error: this.hasError,
      complete: this.hasComplete
    })
  }

  initSearch(){
    this.allBooks = []
    this.setLoading(true);
  }
  onError(value:string){  
    alert(value)
  }

  hasResults = (res:any) =>{
    this.allBooks = res;
    this.setLoading(false);
  }

  hasError = (err:any) =>{
    this.setError(true);
    this.setLoading(false);
  }

  hasComplete = () =>{
    console.log('complete')
  }

  getBooksToShow(){
    let allBoksToShow = this.allBooks.length > 0 && this.queryName.length <= 1
  
    if(allBoksToShow){
      return this.allBooks
    }else{
      return this.booksFiltered || []
    }
  }
  setBooksFiltered(value: Bookout[]) {
    this.booksFiltered = value;
  }
  setQueryName(queryName:string){
    this.queryName = queryName
  }
  setLoading(value: boolean) {
    this.loading = value;
  }
  setError(value:boolean){
    this.error = value
  }
}
