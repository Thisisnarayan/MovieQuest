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
  movieDataUpcoming : any[] = [];
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
        concatMap((topRatedResults: any) => {
          this.movieDataTopRated = topRatedResults.results;
          return this.apiService.upcomingMovies();
        }),
        finalize(() => {
          
          this.isLoading = false;
        })
      )
      .subscribe(
        (upcomingResults: any) => {
          this.movieDataUpcoming = upcomingResults.results;
        },
        (error: any) => {
          console.error('Error fetching movie results:', error);
         
        }
      );
  }
}

  

