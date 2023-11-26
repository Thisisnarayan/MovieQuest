import { Component } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs';
import { ApiService } from 'src/app/main/services/api.service';
import { NgCircleProgressModule } from 'ng-circle-progress';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [CommonModule , NgOptimizedImage ,  NgCircleProgressModule ],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss'
})
export class SearchComponent {
  showDropdown: boolean = false;
  searchResults: any[] = []; // Array to hold search results
  isLoading = false;
  constructor(private apiService : ApiService) {

  }
  onSearch(event: any) {
    const searchTerm = event.target.value;
    this.isLoading = true;
    // Example: Perform a search (You can replace this with actual search logic)
    if (searchTerm.length > 0) {
      // Simulated search results (Replace this with your search logic)
      this.searchResults = [];
      this.apiService
      .searchMovies(searchTerm)
      .pipe(
        debounceTime(300),
        distinctUntilChanged(),
        switchMap((response : any) => {
          this.isLoading = false;
          return response.results; // Assuming the API response has a 'results' property for movies
        })
      )
      .subscribe(
        (results : any) => {
          this.searchResults.push(results);
        },
        (error : any) => {
          console.error('Error fetching search results:', error);
          this.isLoading = false;
        }
      );

      this.showDropdown = true;
    } else {
      this.isLoading = false;
      this.showDropdown = false;
      this.searchResults = [];
    }
  }
  
  getFullPosterPath(posterPath: string): string {
    return `https://image.tmdb.org/t/p/original${posterPath}`;
  }

  getColor(v : number){
    if(v > 80) {
      return '#22A06B';
    } else if(v < 80 && v > 60){
      return '#E56910';
    } else if(v < 60 && v > 30) {
      return '#7F5F01';
    } else {
      return '#AE2E24';
    }
    return '#216E4E';
  }
}
