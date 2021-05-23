import { Component, OnInit} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {  Router } from '@angular/router';

@Component({
  selector: 'app-movie-search',
  templateUrl: './movie-search.component.html',
  styleUrls: ['./movie-search.component.sass']
})
export class MovieSearchComponent implements OnInit {

  searchMovieForm!: FormGroup;

  constructor( private router: Router) { }

  ngOnInit(): void {
    this.searchMovieForm = new FormGroup({
      'title': new FormControl(null, Validators.required)
    })
  }

  onSearch() {
    this.router.navigate(['/movies/', this.searchMovieForm.value.title]);
  }

}
