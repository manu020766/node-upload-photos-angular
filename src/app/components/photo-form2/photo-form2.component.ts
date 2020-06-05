import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser'

interface HtmlInputEvent extends Event {
  target: HTMLInputElement & EventTarget
}

@Component({
  selector: 'app-photo-form2',
  templateUrl: './photo-form2.component.html',
  styleUrls: ['./photo-form2.component.css']
})
export class PhotoForm2Component implements OnInit {

  file:File
  photoSelected:SafeResourceUrl

  constructor(private sanitizer: DomSanitizer) { }

  ngOnInit(): void {

  }

  onPhotoSelected(event: HtmlInputEvent):void {
    if (event.target.files && event.target.files[0]) {
      this.file = <File>event.target.files[0]

      // image preview
      this.photoSelected = this.sanitizer.bypassSecurityTrustResourceUrl(window.URL.createObjectURL(this.file));
    }
  }

}
