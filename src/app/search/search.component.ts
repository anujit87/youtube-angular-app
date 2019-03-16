import { Component, OnInit } from '@angular/core';
import { YoutubeService } from '../youtube.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  videoList;
  

  constructor(private youtubeService:YoutubeService,private _route:ActivatedRoute,private route:Router) {
    route.routeReuseStrategy.shouldReuseRoute=()=>false
   }

  ngOnInit() {

    let searchStr= this._route.snapshot.paramMap.get('keyword');
    console.log(searchStr);
    this.searchVideos(searchStr);
  }
  
  searchVideos(searchStr){
    this.youtubeService.searchVideos(searchStr).subscribe(
      (list:any)=>{
        console.log(list.body)
        this.videoList=list.body.items;
      },
      error=>{
        console.log(error)
      }
    )
  }

  
  

}
