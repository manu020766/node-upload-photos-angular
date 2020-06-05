import { Component, OnInit, OnDestroy } from '@angular/core'
import { PhotoService } from 'src/app/services/photo.service'
import { Photo } from 'src/app/interfaces/Photo'
import { Observable, Subscription } from 'rxjs'

@Component({
  selector: 'app-photo-list',
  templateUrl: './photo-list.component.html',
  styleUrls: ['./photo-list.component.css']
})
export class PhotoListComponent implements OnInit, OnDestroy {

  subBorrarPhoto:Subscription
  photos: Observable<Photo[]>
  constructor(private photoService:PhotoService) {}

  ngOnInit(): void {
    this.photos = this.photoService.loadPhotos()
  }

  BorrarPhoto(el) {
    let photoId = el.getAttribute('data-photo-id')
    this.subBorrarPhoto = this.photoService.deletePhoto(photoId)
      .subscribe(() => this.photos = this.photoService.loadPhotos())
    
    // let photoId = el.dataset.photoId
    // console.log("Photo Id: ", photoId)
  }

  ngOnDestroy() {
    if (this.subBorrarPhoto) this.subBorrarPhoto.unsubscribe()
  }

}
