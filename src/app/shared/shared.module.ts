import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DialogModule } from 'primeng/dialog';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { KeyFilterModule } from 'primeng/keyfilter';
import { MenubarModule } from 'primeng/menubar';
import { PasswordModule } from 'primeng/password';
import { TabMenuModule } from 'primeng/tabmenu';
import { ToastModule } from 'primeng/toast';

import { BadgeComponent } from './components/badge/badge.component';
import { BookFormComponent } from './components/book-form/book-form.component';
import { BookListComponent } from './components/book-list/book-list.component';
import { CardBookComponent } from './components/card-book/card-book.component';
import { CarouselComponent } from './components/carousel/carousel.component';
import { DialogsComponent } from './components/dialogs/dialogs.component';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SearchComponent } from './components/search/search.component';
import { BookSearchComponent } from './components/book-search/book-search.component';

@NgModule({
  declarations: [
    CardBookComponent,
    SearchComponent,
    BookListComponent,
    DialogsComponent,
    BookFormComponent,
    NavbarComponent,
    LoginFormComponent,
    CarouselComponent,
    BadgeComponent,
    BookSearchComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    CardModule,
    ButtonModule,
    FontAwesomeModule,
    ReactiveFormsModule,
    NgxSkeletonLoaderModule,
    ConfirmDialogModule,
    DialogModule,
    InputTextModule,
    InputTextareaModule,
    InputNumberModule, 
    RouterModule,
    TabMenuModule,
    MenubarModule,
    PasswordModule,
    KeyFilterModule,
    ToastModule
  ],
  exports:[
    CardBookComponent,
    ButtonModule,
    FontAwesomeModule,
    SearchComponent,
    BookListComponent,
    NgxSkeletonLoaderModule,
    ConfirmDialogModule,
    DialogsComponent,
    DialogModule,
    InputTextModule,
    InputTextareaModule,
    InputNumberModule,
    NavbarComponent,
    PasswordModule,
    LoginFormComponent,
    CarouselComponent,
    KeyFilterModule,
    BadgeComponent,
    ToastModule,
    BookSearchComponent,
  ],
  providers:[
    ConfirmationService,
    MessageService,
  ]
})
export class SharedModule { }
