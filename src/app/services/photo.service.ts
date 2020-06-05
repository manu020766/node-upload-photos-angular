import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Photo } from '../interfaces/Photo';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PhotoService {

  private URI = 'http://localhost:4000/api/photos'

  constructor(private http: HttpClient) { }

  createPhoto(title:string, description:string, photo:File) {
    let fd = new FormData()
    fd.append('title', title)
    fd.append('description', description)
    fd.append('image', photo)

    return this.http.post(this.URI, fd)
  }

  loadPhotos():Observable<Photo[]> {
    return this.http.get<Photo[]>(this.URI)
  }
  
}
