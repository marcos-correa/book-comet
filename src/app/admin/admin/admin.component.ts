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
  
  getAllBooks(){
    this.initSearch();
    this.bookService.getAllBooks()
    .subscribe({
      next: this.hasResults,
      error: this.hasError
    })
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

  hidedForm(){
    this.isAddBook = false
    this.getAllBooks()
  }

  //
  /**
   * @method hasResults
   * @param  {any} res
   * @description If has results, set allBooks results and stop loading value to dismiss the skeleton view
   */
  hasResults = (res:any) =>{
    this.setAllBooks(res);
    this.setLoading(false);
  }
  
  /**
   * @method hasError
   * @param  {any} err
   * @description If hasn't results, set error then will be show by card session and stop loading value to dismiss the skeleton view
   */
  hasError = (err:any) =>{
    this.setError(true);
    this.setLoading(false);
  }

  /**
   * @method showAddBook
   * @description Only set true to isAddBook that show the book-form component in add mode
   */
  showAddBook(){
    this.isAddBook = true
  }
  
  //--- SettersComponent
  /**
   * @method 
   * @param  {Bookout[]} allBooks
   */
  setAllBooks(allBooks:Bookout[]){
    this.allBooks = allBooks
  }

  /**
   * @method setBooksFiltered 
   * @param  {Bookout[]} value
   * @description An util method to set property of booksFiltered 
   */
  setBooksFiltered(value: Bookout[]) {
    this.booksFiltered = value;
  }

  /**
   * @method setQueryName 
   * @param  {string} queryName
   * @description An util method to set property of queryName 
   */
  setQueryName(queryName:string){
    this.queryName = queryName
  }

  /**
   * @method setLoading 
   * @param  {boolean} value
   * @description An util method to set property of loading 
   */
  setLoading(value: boolean) {
    this.loading = value;
  }

  /**
   * @method setError 
   * @param  {boolean} value
   * @description An util method to set property of error
   */
  setError(value:boolean){
    this.error = value
  } 
}


