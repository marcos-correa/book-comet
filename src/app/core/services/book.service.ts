import { Bookout } from './../models/bokout.model';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as _ from 'lodash';
import { Subject, switchMap } from 'rxjs';
import { catchError, first, tap, last } from 'rxjs/operators';

import { Bookin } from '../models/bookin.model';
import { DeleteResponse } from '../models/deleteResponse.model';
import { Msg } from '../models/msg.model';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  allBooks:Bookout[] = []
  private readonly prodApi = "https://fumt-api.herokuapp.com/book/"
  private filterString: Subject<string> = new Subject<string>();

  
  constructor(
    private httpClient:HttpClient
    ) { 

    }
  /**
   * @method getInitialResponse
   * @description A method to test the api
   */
  getInitialResponse(){
    return this.httpClient.get<Msg>(this.prodApi)
    .pipe(
      first()
    );
  }
  /**
   * @method getAllBooks 
   * @description 
   * IMPLEMENTATION OF THE FIRST GET SEARCH
   * - Search all books, no queryParams
   */
  getAllBooks(){
    let getBooks = this.httpClient.get<Bookout[]>('/api/v1/books/')
    return getBooks.pipe(
      last(),
      tap(value => this.allBooks = value)
    )
  }

  /**
   * @method getAllBooksByName 
   * @description 
   * IMPLEMENTATION OF THE SECOND GET SEARCH
   * - Search all books, with name queryParams
   */
  getAllBooksByName(value:string){
    let params = new HttpParams().set('name',value)
    let request = this.httpClient.get<Bookout[]>('/api/v1/books/',{params})
    return request.pipe(last())
  }

  /**
   * @method getBooksById 
   * @description 
   * IMPLEMENTATION OF THE THIRD GET SEARCH
   * - Search a book by its ID
   */
  getBooksById(id:number){
    return this.httpClient.get<Bookout>(`/api/v1/books/${id}`)
    .pipe(
      tap(res => {
        console.log(res)
        if (res === null) console.log("NULO")
      }),
      first()
    );
  }
  
  /**
   * @method postBook
   * @param  {Bookin} book
   * @description 
   * IMPLEMENTATION OF THE POST METHOD
   * - Insert a book according to the Swagger template
   */
  postBook(book:Bookin){
    return this.httpClient.post<Bookout>(`/api/v1/books/`,book)
    .pipe(
      first(),
      catchError( err =>{
        this.onError(err.data,"delete")
        return err
      })
    );
  }
  
  /**
   * @method updateBook
   * @param  {number} id
   * @param  {Bookin} book
   * @description 
   * IMPLEMENTATION OF THE PUT METHOD
   * Updates the information of the chosen book
   */
  updateBook(id:number,book:Bookin){
    return this.httpClient.put<Bookout>(`/api/v1/books/${id}`,book)
    .pipe(
      first(),
      catchError( err =>{
        this.onError(err.data,"update")
        return err
      })
    );
  }

  /**
   * @method deleteBook
   * @param  {number} id
   * @description 
   * DELETE METHOD IMPLEMENTATION
   * Updates the information of the chosen book
   * Delete the book selected by its ID
   */
  deleteBook(id:number){
    return this.httpClient.delete<DeleteResponse>(`/api/v1/books/${id}`)
    .pipe(
      first(),
      tap(res => console.log("Livro Deletado",res)),
      catchError( err =>{
        this.onError(err.data,'delete')
        return err
      })
    );
  }
  
  /**
   * @method onError
   * @param  {any} data
   * @param  {string} req
   * @description 
   * Thoughtful method for any purposes
   * Method designed for creating logs using the same service.
   */
  onError(data:any,req:string){
    let err = `${req}.${data.status}`
    // An example of using the lodash tool to obtain dynamic data
    let log = {req:req,message:_.get(data,data.message,"Default message"), err:err}
    console.log("log:",log)
  }
  
}
