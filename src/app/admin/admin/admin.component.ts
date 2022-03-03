import { Bookout } from './../../core/models/bokout.model';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

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
    private accountService:AccountService,
    private router:Router,
    private httpClient:HttpClient
  ) { }

  ngOnInit(): void {
    this.allBooks = this.bookService.allBooks
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
  getBooksToShow(){
    let allBoksToShow = this.allBooks.length > 0
  
    if(allBoksToShow){
      return this.allBooks
    }else{
      return this.booksFiltered || []
    }
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


