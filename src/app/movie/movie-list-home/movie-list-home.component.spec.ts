import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieListHomeComponent } from './movie-list-home.component';

describe('MovieListHomeComponent', () => {
  let component: MovieListHomeComponent;
  let fixture: ComponentFixture<MovieListHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MovieListHomeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MovieListHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
