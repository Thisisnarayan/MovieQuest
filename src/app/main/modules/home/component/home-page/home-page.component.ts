import { Component, OnInit } from '@angular/core';
import { concatMap, finalize } from 'rxjs';
import { ApiService } from 'src/app/main/services/api.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {
  isLoading = true;
  movieData : any[]= []
  movieDataTopRated : any[] = [];
  constructor(private apiService : ApiService){
    
  }

  ngOnInit(): void {
    this.fetchPopularAndNowPlayingMovies();
  }
 
  fetchPopularAndNowPlayingMovies(): void {
    this.apiService.popularMovies()
      .pipe(
        concatMap((popularResults: any) => {
          this.movieData = popularResults.results;
          return this.apiService.topRatedMovies();
        }),
        finalize(() => {
          
          this.isLoading = false;
        })
      )
      .subscribe(
        (nowPlayingResults: any) => {
          this.movieDataTopRated = nowPlayingResults.results;
        },
        (error: any) => {
          console.error('Error fetching movie results:', error);
         
        }
      );
  }
}

  

