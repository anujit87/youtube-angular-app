import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { YoutubeService } from '../youtube.service';

@Component({
  selector: 'app-video-details',
  templateUrl: './video-details.component.html',
  styleUrls: ['./video-details.component.css']
})
export class VideoDetailsComponent implements OnInit {
  video:{};
  html:string;
  source:string;
  relatedVideos:[{}];
  channelId;
  channelDetails:any;
  displayFull:boolean=false;

  constructor(private route:Router,private _route:ActivatedRoute,private youtubeService:YoutubeService) {
    route.routeReuseStrategy.shouldReuseRoute=()=>false
   }

  ngOnInit() {
    let videoId=this._route.snapshot.paramMap.get('id');
    this.getVideo(videoId);
    this.getRelatedVideos(videoId);
    this.source='//www.youtube.com/embed/'+videoId+'?autoplay=1&mute=1&enablejsapi=1';
    
  }
  displaycontent(){
    this.displayFull=!this.displayFull;
  }

  getVideo(videoId){
    this.youtubeService.getVideo(videoId).subscribe(
      (video:any)=>{
        if(video.status==200){
          this.video=video.body.items[0]
          this.html=video.body.items[0].player.embedHtml
          this.channelId=video.body.items[0].snippet.channelId;
          console.log(video.body.items[0])
        }
        
      },
      error=>{
        console.log(error)
      },()=>{
        this.getChannelDetails()
      }
    )
  }

  getRelatedVideos(videoId){
    this.youtubeService.getRelatedVideos(videoId).subscribe(
      (relatedList:any)=>{
        if(relatedList.status==200){
          this.relatedVideos= relatedList.body.items
          console.log(relatedList)
        }
      },
      error=>{
          console.log(error)
      }
    )
  }

  formatCount=(count)=>{
    if(count>999 && count<=999999){
      return Math.floor(count/1000).toString()+'K'
    }else if(count>999999){
      return Math.floor(count/1000000).toString()+'M'
    }
    
  }

  getChannelDetails=()=>{
    this.youtubeService.getChannelDetails(this.channelId).subscribe(
      (channel:any)=>{
        if(channel.status==200){
          this.channelDetails=channel.body.items[0];
          console.log(channel.body.items[0])
        }
      },
      error=>{
        console.log(error)
      }
    )
  }

  

}
