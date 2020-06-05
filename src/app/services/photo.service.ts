import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'

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

// console.log('title', title)
// console.log('description', description)
// console.log('image', photo)

    return this.http.post(this.URI, fd)
  }
}
