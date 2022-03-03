import { Bookin } from '../../../core/models/bookin.model';
import { BookService } from 'src/app/core/services/book.service';
import { Bookout } from '../../../core/models/bokout.model';
import { Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import * as _ from 'lodash';
import { JsonpClientBackend } from '@angular/common/http';


@Component({
  selector: 'book-form',
  templateUrl: './book-form.component.html',
  styleUrls: ['./book-form.component.less']
})
export class BookFormComponent implements OnInit, OnChanges,OnDestroy {
  @Input() bookToEdit!: Bookout;
  @Input() visible: boolean = false;
  @Input() addBook: boolean = false;
  @Output() onHide: EventEmitter<boolean> = new EventEmitter();
  @Output() updated: EventEmitter<Bookout> = new EventEmitter();
  @Output() added: EventEmitter<Bookout> = new EventEmitter();
 
  newBook:Bookout = this.getDeFaultBook();
  oldBook:Bookout = this.getDeFaultBook();

  hasOldBook=false;
  isDisabledButton:boolean = false;

  submitted: boolean = false;
  constructor(
    private confirmationService:ConfirmationService,
    private bookService:BookService,
    private messageService: MessageService
  ) { }
  

  ngOnInit(): void {

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
        this.added.emit(res)
      },
      error: (err:any) => {console.log(err)}
    })
  }

  updateABook(book:Bookin){
    let id = this.newBook.id
    this.bookService.updateBook(id,book).subscribe({
      next: (res:any) =>{
        // this.showSuccess(res.name)
        this.messageService.add({severity:'success', summary: 'Success', detail: `The book ${res.name} was updated`});

        this.updated.emit(res);
      },
      error: (err) =>{
        console.log(err)
        this.onHide.emit(true)
      }
    })
  }

  showSuccess(name:string) {
    this.messageService.add({severity:'success', summary: 'Book posted', detail: `The book ${name} has been updated`});
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
  ngOnDestroy(){

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
