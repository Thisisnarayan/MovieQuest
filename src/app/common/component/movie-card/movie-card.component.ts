import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { NgCircleProgressModule } from 'ng-circle-progress';

@Component({
  selector: 'app-movie-card',
  standalone: true,
  imports: [CommonModule , NgCircleProgressModule],
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss']
})
export class MovieCardComponent {
  @Input() loading: boolean = true; // Input for loading state
  @Input() data: any; // Input for movie data

  constructor(private router: Router) {

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
  detailPage(id:string) {
    this.router.navigateByUrl(`/details/${id}`)
  }
}
