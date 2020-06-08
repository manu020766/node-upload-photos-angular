import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Photo } from '../interfaces/Photo'
import { Observable } from 'rxjs'

interface photoRes {
  message:string
  photo: {
    _id:string,
    title:string,
    description:string,
    imagePath:string
  }
}

@Injectable({
  providedIn: 'root'
})
export class PhotoService {

  private URI = 'http://localhost:4000/api/photos'

  constructor(private http: HttpClient) { }

  createPhoto(title:string, description:string, photo:File):Observable<photoRes> {
    let fd = new FormData()
    fd.append('title', title)
    fd.append('description', description)
    fd.append('image', photo)

    return this.http.post<photoRes>(this.URI, fd)
  }

  loadPhotos():Observable<Photo[]> {
    return this.http.get<Photo[]>(this.URI)
  }

  deletePhoto(photoId:string):Observable<Photo> {
    return this.http.delete<Photo>(`${this.URI}/${photoId}`)
  }

  loadPhotoByTitleDes(id:string):Observable<Photo[]> {
    return this.http.get<Photo[]>(`${this.URI}/${id}/buscar`)
  }

}
