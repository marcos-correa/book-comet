import { Component, OnInit, OnChanges } from '@angular/core';

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

  loggeded = true;
  isAddBook: boolean = false;

  constructor(
    private bookService: BookService
  ) // private messageService:MessageService
  {}
  showAddBook() {
    this.isAddBook = true;
  }

  ngOnInit(): void {
    this.getAllBooks();
  }
  getAllBooks() {
    this.initSearch();
    this.bookService.getAllBooks().subscribe({
      next: this.hasResults,
      error: this.hasError
    });
  }
  initSearch() {
    this.setAllBooks([]);
    this.setLoading(true);
  }

  onError(value: string) {
    alert(value);
  }

  hasResults = (res: any) => {
    this.setAllBooks(res);
    this.setLoading(false);
  };


  delay(delay:number) {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(true);
      }, delay);
    });
  }
  async setSpecificMessage(){
    this.needSpecifiMessage = false
    let need = await this.delay(2500)
    this.needSpecifiMessage = this.queryName.length == 1
  }

  hasError = (err: any) => {
    this.setError(true);
    this.setLoading(false);
  };

  getBooksToShow() {
    let allBoksToShow = this.allBooks.length > 0 && this.queryName.length <= 1;
    if (allBoksToShow) {
      return this.allBooks;
    } else {
      return this.booksFiltered || [];
    }
  }

  setBooksFiltered(value: Bookout[]) {
    this.booksFiltered = value;
  }
  setQueryName(queryName: string) {
    this.queryName = queryName;
    this.setSpecificMessage()
  }
  setLoading(value: boolean) {
    this.loading = value;
  }
  setError(value: boolean) {
    this.error = value;
  }
  setAllBooks(books:Bookout[]){
    this.allBooks = books
  }

}
