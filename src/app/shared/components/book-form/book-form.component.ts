import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { MessageService } from 'primeng/api';
import { BookService } from 'src/app/core/services/book.service';

import { Bookout } from '../../../core/models/bokout.model';
import { Bookin } from '../../../core/models/bookin.model';


@Component({
  selector: 'book-form',
  templateUrl: './book-form.component.html',
  styleUrls: ['./book-form.component.less']
})
export class BookFormComponent implements OnInit, OnChanges {
  @Input() bookToEdit!: Bookout;
  @Input() visible: boolean = false;
  @Input() addBook: boolean = false;
  @Output() onHide: EventEmitter<boolean> = new EventEmitter();
  @Output() updated: EventEmitter<Bookout> = new EventEmitter();
  @Output() added: EventEmitter<Bookout> = new EventEmitter();
 
  newBook:Bookout = this.getDeFaultBook();
  oldBook:Bookout = this.getDeFaultBook();

  hasOldBook:boolean = false;
  isDisabledButton:boolean = false;

  submitted: boolean = false;
  
  constructor(
    private bookService:BookService,
    private messageService: MessageService
  ) { }

  ngOnInit(): void {
    this.getOldBook()
  }
  
  hideDialog(){
    this.newBook = this.getOldBook();
    this.onHide.emit(true)
  }

  saveBook(){
    this.submitted = true;
    let book_ = this.setBookToSave()
    if(this.addBook){
      this.addABook(book_)
    }else{
      this.updateABook(book_)
    }
    
  }

  aboveYear(value:any){
    return value > 2022
  }

  addABook(book:Bookin){
    this.bookService.postBook(book).subscribe({
      next: (res:any) => {
        this.showSuccess(res,'add')
        this.added.emit(res)
      },
      error: (err:any) => {this.showError(err)}
    })
  }

  updateABook(book:Bookin){
    let id = this.newBook.id
    this.bookService.updateBook(id,book).subscribe({
      next: (res:any) =>{
        this.showSuccess(res,'upd')
      },
      error: (err) =>{
        this.showError(err)
      }
    })
  }

  showSuccess(res:any,type:string) {
    if(type=='add'){
      this.messageService.add({severity:'success', summary: 'Book added', detail: `The book ${res.name} has been added`});
    }
    if(type=='upd'){
      this.messageService.add({severity:'success', summary: 'Book updated', detail: `The book ${res.name} has been updated`});
    }
    this.updated.emit(res)
    this.onHide.emit(true)
  }
  
  showError(err:any){
    this.messageService.add({severity:'warn', summary: 'Oops', detail: `Generic failed`});
    this.onHide.emit(true)
  }

  setBookToSave(): Bookin{
    let authors = this.newBook.authors.toString().split(",")
    return {
      name: this.newBook.name,
      year: this.newBook.year,
      authors: authors,
      summary: this.newBook.summary
    }
  }

  getOldBook(){
    return JSON.parse(JSON.stringify(this.oldBook))
  }

  getDeFaultBook():Bookout{
    let _default:Bookout = {
      id: 0,
      name: "",
      year: undefined,
      authors: [],
      summary: ""
    };
    return JSON.parse(JSON.stringify(_default))
  }

  ngOnChanges(changes: SimpleChanges): void {
    if(changes['bookToEdit'] && changes['bookToEdit'].currentValue && !this.addBook){
      if(!this.hasOldBook){
        this.oldBook = Object.assign(this.oldBook,changes['bookToEdit'].currentValue)
      }
      this.newBook = Object.assign(this.newBook,changes['bookToEdit'].currentValue)
      this.hasOldBook = true
    }
  }

}
