import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { YoutubeService } from './youtube.service';
import { VideoDetailsComponent } from './video-details/video-details.component';
import { NoSanitizePipe } from './no-sanitize.pipe';
import { SearchComponent } from './search/search.component';
import { FormsModule } from '@angular/forms'

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    VideoDetailsComponent,
    NoSanitizePipe,
    SearchComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    RouterModule.forRoot([
      { path:'home', component:HomeComponent, pathMatch:'full'},
      { path:'', redirectTo:'home', pathMatch:'full'},
      { path:'video/:id', component:VideoDetailsComponent},
      { path:'search/:keyword', component:SearchComponent},
      { path:'*', component:HomeComponent},
      { path:'**', component:HomeComponent}
    ])
  ],
  providers: [YoutubeService],
  bootstrap: [AppComponent]
})
export class AppModule { }
