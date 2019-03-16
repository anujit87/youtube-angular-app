import { Component, OnInit } from '@angular/core';
import { YoutubeService } from '../youtube.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  trendingList:any;

  constructor(private youtubeService:YoutubeService,private route:Router) { }

  ngOnInit() {
    this.youtubeService.getTrendingList().subscribe(
      (list:any)=>{
        if(list.status===200){
          this.trendingList=list.body.items;
          console.log(this.trendingList)
        }
        
      },
      error=>{
        console.log(error)
      }
    )
  }

  formatViewCount=(count)=>{
    if(count>999 && count<=999999){
      return Math.floor(count/1000).toString()+'K'
    }else if(count>999999){
      return Math.floor(count/1000000).toString()+'M'
    }
    
  }

  durationFormat=(duration:string)=>{
    let time=duration.slice(2,duration.length).replace('M',':').replace('S','').replace('H',':');
    let timings=time.split(':');
    if(timings.length===3){
      if(parseInt(timings[1])<10){
        timings[1]="0"+timings[1]
      }if(parseInt(timings[2])<10){
        timings[2]="0"+timings[2]
      }
      
      return timings[0]+":"+timings[1]+":"+timings[2]
    }else if(timings.length==2){
      if(parseInt(timings[1])<10){
        timings[1]="0"+timings[1]
      }
      return timings[0]+":"+timings[1]
    }else if(timings.length==1){
      if(parseInt(timings[0])<10){
        timings[0]="0"+timings[0]
      }
      return "0:"+timings[0]
    }
  }

  formatDate(date){
    let published=new Date(date)
    let difference=Date.now()-published.getTime()
    let seconds=Math.floor(difference/1000);
    let minutes=Math.floor(seconds/60);
    let hours=Math.floor(minutes/60)
    let days=Math.floor(hours/24);
    let months=Math.floor(days/30);
    let years=Math.floor(months/12);
    if(years>0){
      if(years==1)
      return years+' year ago'
      return years+' years ago'
    }else if(months>0){
      if(months==1)
      return months+' month ago'
      return months+' months ago'
    }else if(days>0){
      if(days==1)
      return days+' day ago'
      return days+' days ago'
    }else if(hours>0){
      if(hours==1)
      return hours+' hour ago'
      return hours+' hours ago'
    }else if(minutes>0){
      if(minutes==1)
      return minutes+' minute ago'
      return minutes+' minutes ago'
    }else{
      return seconds+' seconds ago'
    }
    
  }

}
