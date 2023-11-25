import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss'
})
export class SearchComponent {
  showDropdown: boolean = false;
  searchResults: string[] = []; // Array to hold search results

  onSearch(event: any) {
    const searchTerm = event.target.value;

    // Example: Perform a search (You can replace this with actual search logic)
    if (searchTerm.length > 0) {
      // Simulated search results (Replace this with your search logic)
      this.searchResults = [
        'Result 1 for ' + searchTerm,
        'Result 2 for ' + searchTerm,
        'Result 3 for ' + searchTerm
      ];

      this.showDropdown = true;
    } else {
      this.showDropdown = false;
      this.searchResults = [];
    }
  }
  
}
