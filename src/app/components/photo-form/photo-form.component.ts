import { Component, OnInit } from '@angular/core'

interface HtmlInputEvent extends Event {
  target: HTMLInputElement & EventTarget
}

@Component({
  selector: 'app-photo-form',
  templateUrl: './photo-form.component.html',
  styleUrls: ['./photo-form.component.css']
})
export class PhotoFormComponent implements OnInit {

  file:File
  photoSelected: string | ArrayBuffer

  constructor() { }

  ngOnInit(): void {
  }

  onPhotoSelected(event: HtmlInputEvent):void {

    if (event.target.files && event.target.files[0]) {
      this.file = <File>event.target.files[0]

      // image preview
      const reader = new FileReader()
      reader.readAsDataURL(this.file)
      
      reader.onload = (ev: ProgressEvent<FileReader>) => this.photoSelected = reader.result
    }
  }
}
