import { Component, OnInit } from '@angular/core';
import { PhotoService } from 'src/app/services/photo.service';
import { Photo } from 'src/app/interfaces/Photo';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-photo-list',
  templateUrl: './photo-list.component.html',
  styleUrls: ['./photo-list.component.css']
})
export class PhotoListComponent implements OnInit {

  photos: Observable<Photo[]>
  constructor(private photoService:PhotoService) { }

  ngOnInit(): void {
    this.photos = this.photoService.loadPhotos()
  }

}
