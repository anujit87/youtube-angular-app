import { Component } from '@angular/core';
import { YoutubeService } from './youtube.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'youtube-demo';
  searchStr;

  constructor(private youtubeService:YoutubeService,private route:Router){}

  search(event){
    if(event.keyCode===13){
      this.route.navigate(['/search',this.searchStr])
    }
  }
}
