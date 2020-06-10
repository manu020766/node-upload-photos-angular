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
  photosContador

  private get photos():Photo[] {
    return this._photos.getValue()
  }
  private set photos(val:Photo[]) {
    this._photos.next(val)
    this.photosContador = this.photos.length
  }

  async createPhoto(title:string, description:string, photoFile:File) {
    let photoSave = await this.photoService.createPhoto(title, description, photoFile).toPromise()
  
    let photoNew = {
      _id: photoSave.photo._id,
      title: photoSave.photo.title,
      description: photoSave.photo.description,
      imagePath: photoSave.photo.imagePath
    }
    this.photos = [ ...this.photos, photoNew ]

    console.log('PHOTOS: ', this.photos)
  }

  async updatePhoto(photoId:string, title:string, description:string, photoFile:File) {
    let photoSave = await this.photoService.updatePhoto(photoId, title, description, photoFile).toPromise()
  
    let photoUpdateIndex = this.photos.findIndex(p => p._id === photoId)

    this.photos[photoUpdateIndex].title = photoSave.photo?.title
    this.photos[photoUpdateIndex].description = photoSave.photo?.description
    this.photos[photoUpdateIndex].imagePath = photoSave.photo?.imagePath

    this.photos = [ ...this.photos ]
  }

  async deletePhoto(id: string) {
    this.photos = this.photos.filter(photo => photo._id !== id)
    await this.photoService.deletePhoto(id).toPromise()
  }

  async loadPhotos() {
    this.photos = await this.photoService.loadPhotos().toPromise()
  }

  loadPhotoViewId(id: string) {
    return this.photos.find(photo => photo._id === id)
  }

  async loadPhotoByTitleDes(id:string) {
    console.log(id)
    if (!id) {
      this.loadPhotos()
      return
    }
    this.photos = this.photos.filter(p => p.title.includes(id) || p.description.includes(id))
    this.photos = await this.photoService.loadPhotoByTitleDes(id).toPromise()
  }

  constructor(private photoService: PhotoService) { 
    this.loadPhotos()
  }
}
