import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Photo } from 'src/app/interfaces/Photo';
import { PhotosStoreService } from 'src/app/photos-store.service';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-photo-preview',
  templateUrl: './photo-preview.component.html',
  styleUrls: ['./photo-preview.component.css']
})
export class PhotoPreviewComponent implements OnInit {

  photo: Photo

  constructor(private route:ActivatedRoute,
              private photoStoreService: PhotosStoreService) {}
              
  ngOnInit(): void {
    this.route.paramMap
      .pipe(take(1)) //Unsuscribe automatically
      .subscribe( params => {
      this.photo = this.photoStoreService.loadPhotoViewId(params.get('id'))
    })
  }

}
