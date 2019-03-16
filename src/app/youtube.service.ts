import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class YoutubeService {

  authKey='AIzaSyBgPp9Ad-WIRL1xSKQGry3QLqPGpP7xg1g';

  constructor(private _http:HttpClient) { }

  getTrendingList=()=>{
    
    const params=new HttpParams()
    .set('part','snippet,contentDetails,statistics,player')
    .set('chart','mostPopular')
    .set('regionCode','IN')
    .set('maxResults','12')
    .set('key',this.authKey)

    let url='https://www.googleapis.com/youtube/v3/videos';

    return this._http.get(url,{params,observe:'response'})
    

  }

  getVideo=(videoId)=>{
    const params=new HttpParams()
    .set('part','snippet,contentDetails,statistics,player')
    .set('id',videoId)
    .set('key',this.authKey)

    let url='https://www.googleapis.com/youtube/v3/videos';

    return this._http.get(url,{params,observe:'response'})
  }

  getRelatedVideos=(videoId)=>{
    const params=new HttpParams()
    .set('part','snippet')
    .set('type','video')
    .set('relatedToVideoId',videoId)
    .set('key',this.authKey)

    let url='https://www.googleapis.com/youtube/v3/search';

    return this._http.get(url,{params,observe:'response'})
  }

  getChannelDetails=(channelId)=>{
    const params=new HttpParams()
    .set('part','snippet')
    .set('id',channelId)
    .set('key',this.authKey)

    let url='https://www.googleapis.com/youtube/v3/channels';

    return this._http.get(url,{params,observe:'response'})
  }

  searchVideos=(searchStr)=>{
    const params=new HttpParams()
    .set('part','snippet')
    .set('type','video')
    .set('maxResults','10')
    .set('q',searchStr)
    .set('key',this.authKey)

    let url='https://www.googleapis.com/youtube/v3/search';

    return this._http.get(url,{params,observe:'response'})
  }
}
