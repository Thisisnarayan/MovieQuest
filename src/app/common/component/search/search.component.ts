import { Component } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs';
import { ApiService } from 'src/app/main/services/api.service';
import { NgCircleProgressModule } from 'ng-circle-progress';
import { Router } from '@angular/router';

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
  searchTerm  = '';
  totalPages = null;
  constructor(private apiService : ApiService,
    private router: Router) {

  }
  onSearch(event: any) {
    this.searchTerm = event.target.value;
    this.isLoading = true;
    // Example: Perform a search (You can replace this with actual search logic)
    if (this.searchTerm!.length > 0) {
      // Simulated search results (Replace this with your search logic)
      this.searchResults = [];
      this.apiService.setSearchTerm(this.searchTerm);
      this.apiService
      .searchMovies(this.searchTerm , 1)
      .pipe(
        debounceTime(300),
        distinctUntilChanged(),
        switchMap((response : any) => {
          this.isLoading = false;
          this.totalPages = response.total_pages;
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

  getColor(v: number): string {
    if (v >= 80) {
      return '#22A06B'; 
    } else if (v >= 70) {
      return '#4CAF50'; 
    } else if (v >= 60) {
      return '#8BC34A'; 
    } else if (v >= 50) {
      return '#CDDC39'; 
    } else if (v >= 40) {
      return '#FFEB3B'; 
    } else if (v >= 30) {
      return '#FFC107'; 
    } else if (v >= 20) {
      return '#FF9800';
    } else if (v >= 10) {
      return '#FF5722'; 
    } else {
      return '#F44336'; 
    }
  }

  navigateToListPagination() {
    this.apiService.setPaginationDetails( this.totalPages!)
    this.router.navigateByUrl('/search-full');
  }

  detailPage(id:string) {
    this.showDropdown = false;
    this.router.navigateByUrl(`/details/${id}`)
  }
}
