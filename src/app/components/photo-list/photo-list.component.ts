import { Component } from '@angular/core'
import { Photo } from 'src/app/interfaces/Photo'
import { PhotosStoreService } from 'src/app/photos-store.service'

@Component({
  selector: 'app-photo-list',
  templateUrl: './photo-list.component.html',
  styleUrls: ['./photo-list.component.css']
})
export class PhotoListComponent {

  constructor(public photoStore: PhotosStoreService) {}

  BorrarPhoto(el) {
  let photoId = el.getAttribute('data-photo-id') 
  this.photoStore.deletePhoto(photoId)
  }

  photoTrack(index:number, photo:Photo) { 
    return photo ? photo._id : undefined
  }

}
