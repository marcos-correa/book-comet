import { BOOKS } from './../../../core/mocks/books';
import { BookService } from 'src/app/core/services/book.service';
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
  @Input() errorData:any = ""
  
  constructor(
    private bookService:BookService
    ) { }
    
  mockBoocks = BOOKS
  addedMockBook = false

  ngOnInit(): void {
  }

  hasInternalError(){
    if(this.errorData.status == 50){
      return true
    }
    return false
  }

  addMockBook(){
    if(!this.addedMockBook){
      this.addedMockBook = true
      this.mockBoocks.forEach(book=>{
        setTimeout(() => {
          this.bookService.postBook(book).subscribe(res =>{
            console.log(res)
          })
        }, 3000);
      })
    }
  }
}
