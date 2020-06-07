import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Photo } from './interfaces/Photo';
import { PhotoService } from './services/photo.service';

@Injectable({
  providedIn: 'root'
})
export class PhotosStoreService {

  private readonly _photos = new BehaviorSubject<Photo[]>([])
  readonly photos$ = this._photos.asObservable()

  private get photos():Photo[] {
    return this._photos.getValue()
  }
  private set photos(val:Photo[]) {
    this._photos.next(val)
  }

  async deletePhoto(id: string) {
    this.photos = this.photos.filter(photo => photo._id !== id)
    let photo = await this.photoService.deletePhoto(id).toPromise()
  }

  async loadPhotos() {
    this.photos = await this.photoService.loadPhotos().toPromise()
  }

  constructor(private photoService: PhotoService) { 
    this.loadPhotos()
  }
}
