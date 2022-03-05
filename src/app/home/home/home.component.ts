import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';

import { DeleteResponse } from '../../core/models/deleteResponse.model';
import { Bookout } from './../../core/models/bokout.model';
import { BookService } from './../../core/services/book.service';

// import { MessageService } from 'primeng/api';
@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.less'],
})
export class HomeComponent implements OnInit {
  numberDelete?: number;
  responseDelete?: DeleteResponse;
  logged: boolean = true;
  needSpecifiMessage:boolean = false;

  queryName: string = '';
  allBooks: Bookout[] = [];
  booksFiltered: Bookout[] = [];
  loading: boolean = false;
  error: boolean = false;
  errorData: any = "";

  loggeded = true;
  isAddBook: boolean = false;

  constructor(
    private bookService: BookService,
    private messageService:MessageService
  ){}
  showAddBook() {
    this.isAddBook = true;
  }

  ngOnInit(): void {
    this.getAllBooks();
  }

  /**
   * @method getAllBooks
   * @description 
   * A simple Observable search and default layout start
   */
  getAllBooks() {
    this.initSearch();
    this.bookService.getAllBooks().subscribe({
      next: this.hasResults,
      error: this.hasError
    });
  }

  /**
   * @method initSearch
   * @description 
   * Each new search, whether for all books or for books searched, sets these variables to default. 
   * This generates the skeleton effect in the booklist component
   */
  initSearch() {
    this.setAllBooks([]);
    this.setLoading(true);
    this.setError(false)
  }
  /**
   * @method onError
   * @param  {string} err
   * @description 
   * Ero visualization pattern using a Toast service
   */
  onError(err: any) {
    this.setError(true)
    this.setErrorData(err)
    if(err.status && err.status == 500){
      this.messageService.add({severity:'error', summary: 'Oops', detail: `An error ocurred: ${err.statusText}`});
    }else{
      this.messageService.add({severity:'error', summary: 'Oops', detail: `An error ocurred`});
    }
  }

  hasResults = (res: any) => {
    this.setAllBooks(res);
    this.setLoading(false);
  };

  /**
   * @method delay
   * @param  {number} delay
   * @description
   * A util method to delayed any thing
   */
  delay(delay:number) {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(true);
      }, delay);
    });
  }
  
  /**
   * @method setSpecificMessage
   * @description
   * There is a service error in single character searches.
   * If the user searches for only one character, all results are displayed.
   * I handled this error on the front and showed a warning message to let the user know 
   * that their search must be for more than one character.
   */
  async setSpecificMessage(){
    this.needSpecifiMessage = false
    let need = await this.delay(2500)
    this.needSpecifiMessage = this.queryName.length == 1
  }

  /**
   * @method hasError
   * @param  {any} err
   * @description If hasn't results, set error then will be show by card session and stop loading value to dismiss the skeleton view
   */
  hasError = (err: any) => {
    this.setError(true);
    this.setLoading(false);
  };

  /**
   * @method getBooksToShow
   * @description 
   * The main rule to show a search result or a main result that show allBooks
   * If none returns, it sends an empty ARRAY, which is interpreted by the search component as no result.  
   */
  getBooksToShow() {
    let allBoksToShow = this.allBooks.length > 0 && this.queryName.length <= 1;
    if (allBoksToShow) {
      return this.allBooks;
    } else {
      return this.booksFiltered || [];
    }
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
  setQueryName(queryName: string) {
    this.queryName = queryName;
    this.setSpecificMessage()
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
  setError(value: boolean) {
    this.error = value;
  }

  setErrorData(err:any){
    this.errorData = err
  }

  /**
  * @method setAllBooks 
  * @param  {boolean} value
  * @description An util method to set property of ALLBOOKS
  */
  setAllBooks(books:Bookout[]){
    this.setError(false)
    this.allBooks = books
  }

  

}
