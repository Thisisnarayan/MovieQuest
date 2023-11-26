import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/main/services/api.service';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss'
})
export class DetailsComponent  implements OnInit {
  id!: string | null;
  data :any;
  constructor(private route: ActivatedRoute,
    private apiService : ApiService) {

  }
  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.id = params.get('id');
      this.movieDetails();
    });
  }

  movieDetails() {
    this.apiService.detailsMovies(this.id!).subscribe((res : any) => {
      console.log(res);
      this.data = res;
    })
  }


  getFullPosterPath(posterPath: string): string {
    return `https://image.tmdb.org/t/p/original${posterPath}`;
  }

}
