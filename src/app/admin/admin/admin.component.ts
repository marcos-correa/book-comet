import { Bookout } from './../../core/models/bokout.model';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { faBook } from '@fortawesome/free-solid-svg-icons';
import { Bookin } from '../../core/models/bookin.model';
import { DeleteResponse } from '../../core/models/deleteResponse.model';
import { AccountService } from './../../core/services/account.service';
import { BookService } from './../../core/services/book.service';

@Component({
  selector: 'admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.less']
})
export class AdminComponent implements OnInit {
  isAddBook:boolean = false;
  
  allBooks: Bookout[] = [];
  booksFiltered: Bookout[] = [];
  queryName:string = ''
  loading: boolean = false; 
  error: boolean = false;
  
  faBook = faBook as IconProp;
  
  constructor(
    private bookService:BookService,
    private accountService:AccountService,
    private router:Router,
    private httpClient:HttpClient
  ) { }

  ngOnInit(): void {
    this.getAllBooks()
  }

  responses = () =>{
    return {
      next: this.hasResults,
      error: this.hasError,
      complete: this.hasComplete
    }
  }

  getAllBooks(){
    this.initSearch();
    this.bookService.getAllBooks()
    .subscribe(this.responses)
  }
  initSearch(){
    this.setAllBooks([])
    this.setLoading(true);
  }
  getBooksToShow(){
    let allBoksToShow = this.allBooks.length > 0
  
    if(allBoksToShow){
      return this.allBooks
    }else{
      return this.booksFiltered || []
    }
  }


  showAddBook(){
    this.isAddBook = true
  }

  //

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


  // SettersComponent

  setAllBooks(allBooks:Bookout[]){
    this.allBooks = allBooks
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


