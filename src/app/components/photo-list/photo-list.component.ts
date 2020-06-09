import { Component, OnDestroy } from '@angular/core'
import { Photo } from 'src/app/interfaces/Photo'
import { PhotosStoreService } from 'src/app/photos-store.service'
import { Subject } from 'rxjs'
import { filter, debounceTime, distinctUntilChanged } from 'rxjs/operators'

interface KeyboardEvent extends Event {
  target: HTMLInputElement & EventTarget
}

@Component({
  selector: 'app-photo-list',
  templateUrl: './photo-list.component.html',
  styleUrls: ['./photo-list.component.css']
})
export class PhotoListComponent implements OnDestroy {

  private _searchSubject: Subject<string> = new Subject()
  
  constructor(public photoStore: PhotosStoreService) {
    this._setSearchSubscription()
  }

  private _setSearchSubscription() {
    this._searchSubject.pipe(
      filter(text => text.length > 2 || text.length === 0),
      debounceTime(500),
      distinctUntilChanged()
    ).subscribe((searchValue: string) => {
      this.photoStore.loadPhotoByTitleDes(searchValue)
    })
  }

  public updateSearch(searchTextValue: string) {
    this._searchSubject.next( searchTextValue );
  }

  ngOnDestroy() {
    this._searchSubject.unsubscribe();
  }

  borrarPhoto(el) {
  let photoId = el.getAttribute('data-photo-id') 
  this.photoStore.deletePhoto(photoId)
  }

  editarPhoto(el) {
    // -- TODO  
  }
  viewPhoto(el) {
    // -- TODO  
  }

  photoTrack(index:number, photo:Photo) { 
    return photo ? photo._id : undefined
  }
}
