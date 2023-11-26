import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from 'src/app/main/services/api.service';

@Component({
  selector: 'app-full-result',
  templateUrl: './full-result.component.html',
  styleUrl: './full-result.component.scss'
})
export class FullResultComponent implements OnInit {
  currentPage: number = 1;
  totalPages!: number ;
  searchTerm = '';
  data: any[] = [];
  isLoading = true;
  constructor(private apiService : ApiService) {

  }

  ngOnInit(): void {
      this.totalPages = this.apiService.getPaginationDetails();
      this.searchTerm = this.apiService.getSearchTerm();
      this.loadData();
  }

  loadData(event? : any) {
    console.log(event);
    this.currentPage = event == undefined ? 1 : event;
    this.apiService.searchMovies(this.searchTerm , this.currentPage).subscribe((res : any)=>{
      this.totalPages = res.total_pages;
      this.isLoading = false;
      this.data = res.results;
    })
  }

}
