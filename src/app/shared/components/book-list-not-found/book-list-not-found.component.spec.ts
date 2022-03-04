import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookListNotFoundComponent } from './book-list-not-found.component';

describe('BookListNotFoundComponent', () => {
  let component: BookListNotFoundComponent;
  let fixture: ComponentFixture<BookListNotFoundComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BookListNotFoundComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BookListNotFoundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
