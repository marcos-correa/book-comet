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

  getInitialResponse(){
    return this.httpClient.get<Msg>(this.prodApi)
    .pipe(
      first()
    );
  }

  getAllBooks(){
    let getBooks = this.httpClient.get<Bookout[]>('/api/v1/books/')
    return getBooks.pipe(
      last(),
      tap(value => this.allBooks = value)
    )
  }

  getAllBooksByName(value:string){
    let params = new HttpParams().set('name',value)
    let request = this.httpClient.get<Bookout[]>('/api/v1/books/',{params})
    return request.pipe(last())
  }

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

  messages = {
    "delete":{
      "404":{
        message: ""
      }
    }
  }

  
  onError(data:any,req:string){
    let path = `${req}.${data.status}`
    console.log("get",_.get(data,path,data.message))
    console.log("message:",data.message)
  }
  
}
