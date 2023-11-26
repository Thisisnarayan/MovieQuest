import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-movie-pagination',
  templateUrl: './movie-pagination.component.html',
  styleUrl: './movie-pagination.component.scss'
})
export class MoviePaginationComponent {
  @Input() currentPage!: number;
  @Input() totalPages!: number;
  @Output() pageChange = new EventEmitter<number>();
  maxVisiblePages = 5;
  getVisiblePages(): number[] {
    const visiblePages: number[] = [];
    let start = 1;
    let end = this.totalPages;

    if (this.totalPages > this.maxVisiblePages) {
      const half = Math.floor(this.maxVisiblePages / 2);

      if (this.currentPage > half) {
        start = this.currentPage - half;
        end = this.currentPage + half;

        if (end > this.totalPages) {
          end = this.totalPages;
          start = end - this.maxVisiblePages + 1;
        }
      } else {
        end = this.maxVisiblePages;
      }
    }

    for (let i = start; i <= end; i++) {
      visiblePages.push(i);
    }

    return visiblePages;
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.pageChange.emit(this.currentPage - 1);
    }
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.pageChange.emit(this.currentPage + 1);
    }
  }

  goToPage(page: number): void {
    this.pageChange.emit(page);
  }
}
