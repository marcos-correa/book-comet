import { BookService } from './../../../core/services/book.service';
import { Bookout } from '../../../core/models/bokout.model';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { faBook } from '@fortawesome/free-solid-svg-icons';
import { IconProp, SizeProp } from '@fortawesome/fontawesome-svg-core';
import { ConfirmationService, MessageService } from 'primeng/api';


@Component({
  selector: 'card-book',
  templateUrl: './card-book.component.html',
  styleUrls: ['./card-book.component.less']
})
export class CardBookComponent implements OnInit {
  @Input() admin:boolean = false;
  @Input() skeleton:boolean = false;
  constructor(
    private confirmationService:ConfirmationService,
    private bookService:BookService,
    private messageService:MessageService
  ) { }

  faBook = faBook as IconProp;
  iconsize = "xl" as SizeProp;
  
  @Input() book!: Bookout;
  @Input() name: string = "";
  @Input() authors: string = "";
  @Input() summary: string = "";
  @Input() year?: number;
  @Output() refresh: EventEmitter<any> = new EventEmitter();

  isBookEdit:boolean = false;


  ngOnInit(): void {
  }

  deleteBook(){
    this.confirmationService.confirm({
      message:`Are you sure that you want to delete the book "${this.name}"?\n`,
      key:"delete-book",
      acceptButtonStyleClass:'p-button-rounded p-button-primary',
      rejectButtonStyleClass:'p-button-outlined p-button-primary p-button-rounded',
      accept:()=>{
        this.bookService.deleteBook(this.book?.id).subscribe({
          next: (res:any) => {
            this.messageService.add({severity:'success', summary: 'Success', detail: `The book was deleted`});
            this.refresh.emit(true)
          },
          error: () =>{
            this.refresh.emit(false)
          }
        })
      }
    })

  }
  
  showBookEdit(){
    this.isBookEdit = true;
  }

  hideBookEdit(){
    this.isBookEdit = false;
  }

  hasUpdatedBook(book:Bookout){
    this.hideBookEdit()
    this.refresh.emit(true)
  }

}
