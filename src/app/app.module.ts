import { BrowserModule } from '@angular/platform-browser'
import { NgModule } from '@angular/core'
import { HttpClientModule } from '@angular/common/http'

import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { NavigationComponent } from './components/navigation/navigation.component'
import { PhotoFormComponent } from './components/photo-form/photo-form.component'
import { PhotoPreviewComponent } from './components/photo-preview/photo-preview.component'
import { PhotoListComponent } from './components/photo-list/photo-list.component'
import { PhotoForm2Component } from './components/photo-form2/photo-form2.component';
import { UrlPhotoPipe } from './pipes/url-photo.pipe'

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    PhotoFormComponent,
    PhotoPreviewComponent,
    PhotoListComponent,
    PhotoForm2Component,
    UrlPhotoPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
